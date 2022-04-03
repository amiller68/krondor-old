import { Injectable, Injector } from '@angular/core';
import {catchError, map, Observable, of} from "rxjs";
import {environment as env} from "../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "@auth0/auth0-angular";

export interface privilegeResponse {
  privileges: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AppAuthService{

  private authUrl = env.apiEndpoint + "auth"

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type'
    })
  };

  constructor(
    private http: HttpClient,
  )
  {}

  getApiWritePrivileges(): Observable<boolean> {
    return this.http.get(this.authUrl + '/write_privileges', this.httpOptions)
      .pipe(
        map((resp): boolean => {
          return (resp as privilegeResponse).privileges;
        }),
        catchError(this.handleError('getApiWritePrivileges', false))
      )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log("Error occurred during", operation, ": ", error)
      return of(result as T);
    };
  }
}
