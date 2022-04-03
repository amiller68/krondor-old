import { Injectable } from '@angular/core';
import {Tag, defaultTag} from '../../../entities/projects';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import * as _ from "underscore";
//Keeping this for when I start adding tags
import * as uuid from 'uuid';
import { environment as env } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private tagsUrl = env.apiEndpoint + "tags"

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type'
    })
  };

  constructor(private http: HttpClient) {}

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.tagsUrl, this.httpOptions)
      .pipe(
        map((resp): Tag[]=>
          this.extractTags(resp)
        ),
        catchError(
          this.handleError<Tag[]>(
            'getProjectsAndTags',
            [defaultTag]
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

  extractTags(respObj: any): Tag[] {
    return  _.map(Object.entries(respObj), ([id, data]) => {
      return this.extractTag(id, data);
    })
  }

  extractTag(id: string, data: any): Tag {
    return {
      id: id,
      name: data.name,
      color: data.color
    }
  }
}
