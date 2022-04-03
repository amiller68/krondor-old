import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, tap} from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import {AppAuthService} from "../../api/services/auth/auth.service";
import { AuthService } from "@auth0/auth0-angular";

@Injectable()
export class AuthEffects {

  login$ = createEffect(() => this.actions$.pipe(
    ofType('[Auth API] Login'),
    mergeMap(() => this.auth0Service.loginWithRedirect()
      .pipe(
        tap((_) => console.log("Successful Login")),
        map((_) => ({ type: '[Auth API] Login Success'})),
        //@todo: Implement Error Logic
        catchError(() => of({ type: '[Auth API] Login Error'}))
      )
    ))
  );

  logout$ = createEffect(() => this.actions$.pipe(
    ofType('[Auth API] Logout'),
    mergeMap((action) => of(this.auth0Service.logout((action as any).redirect))
      .pipe(
        tap((_) => console.log("Successful Logout")),
        map(() => ({ type: '[Auth API] Logout Success'})),
        //@todo: Implement Error Logic
        catchError(() => of({ type: '[Auth API] Logout Error'}))
      )
    )
  ));

  checkPrivilege$ = createEffect(() => this.actions$.pipe(
    ofType('[Auth API] Check Write Privilege'),
    mergeMap(() => this.appAuthService.getApiWritePrivileges()
      .pipe(
        tap((privilege) => console.log("Can Write to API: ", privilege)),
        map((privilege) => ({ type: '[Auth API] Update Write Privilege', privilege: true})),
      )
    ))
  );

  constructor(
    private actions$: Actions,
    private appAuthService: AppAuthService,
    public auth0Service: AuthService
  ) {}
}
