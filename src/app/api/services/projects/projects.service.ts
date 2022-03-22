import { Injectable } from '@angular/core';
import {Project, Tag, defaultProject, defaultTag} from '../../../entities/projects';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, of, tap} from "rxjs";
import * as moment from "moment";
import * as _ from "underscore";

const deployedHostname: string = 'www.krondor.org';

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


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type'
    })
  };

  constructor(private http: HttpClient) {}

  getProjectsAndTags(): Observable<[Project[], Tag[]]> {
    let projectsUrl = window.location.hostname === deployedHostname ?
      this.deployedProjectsUrl : this.developmentProjectsUrl;
    return this.http.get<Project[]>(projectsUrl, this.httpOptions)
      .pipe(
        tap(_ => console.log("Fetched projects!")),
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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log("Error occurred during", operation,": ", error)
      return of(result as T);
    };
  }

  extractProjectsAndTags(resp: dbResponse): [Project[], Tag[]] {
    let projects = _.map(resp.projects,(data: any, key: string) => {
      let start_date = moment(data.startDate, "MMDDYYYY").toDate();
      let end_date = data.endDate === '' ? undefined : moment(data.endDate, "MMDDYYYY").toDate()
      return {
        id: key,
        startDate: start_date,
        endDate: end_date,
        title: data.title,
        description: data.description,
        platform: data.platform,
        tags: data.tags
      }
    })
    let tags = _.map(resp.tags, (data: any, key: string) => {
      // let rbg_tokens = data.color.split(',');
      // let rbg_vals: [number, number, number] = [0, 0, 0]
      //
      // //Ugly but type safe!
      // rbg_vals[0] = parseInt(rbg_tokens[0]);
      // rbg_vals[1] = parseInt(rbg_tokens[1]);
      // rbg_vals[2] = parseInt(rbg_tokens[1]);

      return {
        id: key,
        name: data.name,
        color: data.color
      }
    })
    return [projects, tags]
  }
}
