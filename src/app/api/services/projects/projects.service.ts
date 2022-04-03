import { Injectable } from '@angular/core';
import {Project, Tag, defaultProject, defaultTag} from '../../../entities/projects';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, of, tap} from "rxjs";
import * as moment from "moment";
import * as _ from "underscore";
import * as uuid from 'uuid';
import { environment as env } from '../../../../environments/environment'

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

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projectsUrl = env.apiEndpoint + "projects"

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type'
    })
  };

  constructor(private http: HttpClient) {
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl, this.httpOptions)
      .pipe(
        map((resp): Project[] =>
          //@ts-ignore
          this.extractProjects(resp)
        ),
        catchError(
          this.handleError<Project[]>(
            'getProjectsAndTags',
            [defaultProject]
          )
        )
      );
  }

  addProject(project: Project): Observable<Project> {
    //Before we submit a new project, need to format it properly
    let data: any = {...project};
    data.id = uuid.v4();
    data.startDate = moment(project.startDate).format('MMDDYYYY');
    if (project.endDate !== undefined) {
      data.endDate = moment(project.endDate).format('MMDDYYYY');
    } else {
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

  deleteProject(id: string): Observable<string> {
    const url = `${this.projectsUrl}/${id}`;
    return this.http.delete(url, this.httpOptions)
      .pipe(
        map((): string => id),
        catchError(this.handleError<string>('deleteProject', ''))
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
      console.log("Error occurred during", operation, ": ", error)
      return of(result as T);
    };
  }

  extractProjects(respObj: any): Project[] {
    return _.map(Object.entries(respObj), ([id, data]) => {
      return this.extractProject(id, data)
    })
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
}
