import { Injectable } from '@angular/core';
import { Project, defaultProject } from '../../../entities/projects';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, of, tap} from "rxjs";
import * as moment from "moment";
import * as _ from "underscore";

const deployedHostname: string = 'www.krondor.org';

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

  getProjects(): Observable<Project[]> {
    let projectsUrl = window.location.hostname === deployedHostname ?
      this.deployedProjectsUrl : this.developmentProjectsUrl;
    return this.http.get<Project[]>(projectsUrl, this.httpOptions)
      .pipe(
        tap(_ => console.log("Fetched experiments!")),
        map((resp: Project[]) =>
          this.extractProjects(resp)
        ),
        catchError(this.handleError<Project[]>('getProjects', [])));
    //return of(this.extractProjects(experimentsObj))
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log("Error occurred fetching experiments: ", error)
      return of(result as T);
    };
  }

  extractProjects(obj: Object): Project[] {
    return _.map(obj, function (data: any, key: string) {
      let id = key;
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
    })
  }
}
