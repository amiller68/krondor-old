import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {of, tap} from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import {ProjectsService} from "../../api/services/projects/projects.service";
import {defaultProject} from "../../entities/projects";

@Injectable()
export class ProjectEffects {

  loadProjects$ = createEffect(() => this.actions$.pipe(
    ofType('[Projects API] Load Projects'),
    mergeMap(() => this.projectsService.getProjects()
      .pipe(
        tap((p) => console.log("Projects Loading: ", p)),
        map(projects => ({ type: '[Projects API] Load Projects Success', projects: projects })),
        //@todo: Implement Error Logic
        catchError(() => of({ type: '[Projects API] Load Projects Error', projects: [defaultProject] }))
      )
    ))
  );

  //@todo: Implement proper Error state handling
  onLoadProjectsSuccess$ = createEffect(() => this.actions$.pipe(
    ofType('[Projects API] Load Projects Success'),
    tap(()=> console.log("Projects loaded!")),
    map((_) => ({ type: '[Projects Page] Update Loading Status', loading_status: true }))
  ));

  addProject$ = createEffect(() => this.actions$.pipe(
    ofType('[Projects API] Add Project'),
    mergeMap(action => this.projectsService.addProject((action as any).project)
      .pipe(
        tap((p) => console.log("Added Project: ", p)),
        map(project => ({ type: '[Projects API] Add Project Success', project: project })),
        //@todo: Implement Error Logic
        catchError(() => of({ type: '[Projects API] Add Project Error' }))
      )
    )
  ));

  updateProject$ = createEffect(() => this.actions$.pipe(
    ofType('[Projects API] Update Project'),
    mergeMap(action => this.projectsService.updateProject((action as any).project)
      .pipe(
        tap((p) => console.log("Updated Project: ", p)),
        map(project => ({ type: '[Projects API] Update Project Success', project: project })),
        //@todo: Implement Error Logic
        catchError(() => of({ type: '[Projects API] Update Project Error' }))
      )
    )
  ));

  deleteProject$ = createEffect(() => this.actions$.pipe(
    ofType('[Projects API] Delete Project'),
    mergeMap(action => this.projectsService.deleteProject((action as any).id)
      .pipe(
        tap((p) => console.log("Deleted Project: ", p)),
        map(project => ({ type: '[Projects API] Delete Project Success', id: project })),
        //@todo: Implement Error Logic
        catchError(() => of({ type: '[Projects API] Delete Project Error' }))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private projectsService: ProjectsService
  ) {}
}
