import { Injectable } from '@angular/core';
import {Project, Tag, defaultProject, defaultTag} from '../../../entities/projects';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, of, tap} from "rxjs";
import * as moment from "moment";
import * as _ from "underscore";
import * as uuid from 'uuid';

const deployedHostname: string = 'www.krondor.org';

export type serverProject = Omit<Project, 'id'>;

export interface serverProjectEntry {
  [id: string]: serverProject
}

export function projectToServerProjectEntry(project: Project) {
  let ret: serverProjectEntry = {}
  ret[project.id] = {
    startDate: project.startDate,
    endDate: project.endDate,
    title: project.title,
    description: project.description,
    platform: project.platform,
    tags: project.tags
  } as serverProject
  return ret;
}

//@todo: type this more strongly
export type dbResponse = {
  projects: any,
  tags: any
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  //@todo: Upgrade to HTTPS
  private deployedProjectsUrl = 'http://www.krondor.org/api/projects';  // URL to deployed web api
  private developmentProjectsUrl = 'http://localhost:3000/api/projects';  // URL to development web api
  private projectsUrl = window.location.hostname === deployedHostname ?
    this.deployedProjectsUrl : this.developmentProjectsUrl;


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type'
    })
  };

  constructor(private http: HttpClient) {}

  getProjectsAndTags(): Observable<[Project[], Tag[]]> {
    return this.http.get<Project[]>(this.projectsUrl, this.httpOptions)
      .pipe(
        map((resp): [Project[], Tag[]] =>
          //@ts-ignore
          this.extractProjectsAndTags(resp)
        ),
        catchError(
          this.handleError<[Project[], Tag[]]>(
            'getProjectsAndTags',
            [[defaultProject],[defaultTag]]
          )
        )
      );
  }

  addProject(project: Project): Observable<Project> {
    //Before we submit a new project, need to format it properly
    let data: any = {...project};
    let id = uuid.v4();
    data.id  = id;
    data.startDate = moment(project.startDate).format('MMDDYYYY');
    if (project.endDate !== undefined) {
      data.endDate = moment(project.endDate).format('MMDDYYYY');
    }
    else {
      data.endDate = '';
    }
    return this.http.post<Project>(this.projectsUrl, data, this.httpOptions)
      .pipe(
        tap(_ => console.log("Added a project!")),
        map((resp: any): Project => {
          return resp.data;
        }),
        catchError(this.handleError<Project>('addProject', project))
      );
  }

  deleteProject(id: string): Observable<unknown> {
    const url = `${this.projectsUrl}/${id}`;
    return this.http.delete(url, this.httpOptions)
      .pipe(
        catchError(this.handleError('deleteProject'))
      );
  }

  updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(this.projectsUrl, project, this.httpOptions)
      .pipe(
        map((resp: any): Project => {
          return resp.data;
        }),
        catchError(this.handleError('updateProject', project))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log("Error occurred during", operation,": ", error)
      return of(result as T);
    };
  }

  extractProjectsAndTags(resp: dbResponse): [Project[], Tag[]] {
    let projects = _.map(Object.entries(resp.projects),([id, data]) => {
      return this.extractProject(id, data)
    })
    let tags = _.map(Object.entries(resp.tags), ([id, data]) => {
      return this.extractTag(id, data);
    })
    return [projects, tags]
  }

  extractProject(id: string, data: any): Project {
    let start_date = moment(data.startDate, "MMDDYYYY").toDate();
    let end_date = data.endDate === '' ? undefined : moment(data.endDate, "MMDDYYYY").toDate()
    return {
      id: id,
      startDate: start_date,
      endDate: end_date,
      title: data.title,
      description: data.description,
      platform: data.platform,
      tags: data.tags
    }
  }

  extractTag(id: string, data: any): Tag {
    return {
      id: id,
      name: data.name,
      color: data.color
    }
  }
}
