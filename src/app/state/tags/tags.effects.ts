import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {EMPTY, of, tap} from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import {TagsService} from "../../api/services/tags/tags.service";
import {defaultTag} from "../../entities/projects";

@Injectable()
export class TagsEffects {

  loadTags$ = createEffect(() => this.actions$.pipe(
      ofType('[Tags API] Load Tags'),
      mergeMap(() => this.tagsService.getTags()
        .pipe(
          tap((t) => console.log("Tags Loading: ", t)),
          map(tags => ({ type: '[Tags API] Load Tags Success', tags: tags })),
          //@todo: Implement Error Logic
          catchError(() => of({ type: '[Tags API] Load Tags Error', tags: [defaultTag] }))
        ))
    )
  );

  constructor(
    private actions$: Actions,
    private tagsService: TagsService
  ) {}
}
