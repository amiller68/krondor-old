import {Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {DOCUMENT} from "@angular/common";
import {AuthService} from "@auth0/auth0-angular";
import {Store} from "@ngrx/store";
import {selectLoggedIn} from "./state/auth/auth.selector";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass', '../styles.sass']
})
export class AppComponent {
  constructor(private router: Router, public auth: AuthService) {}

  buttonNavigate(route: string) {
    this.router.navigateByUrl(route);
  };

  title = 'krondor';
}

@Component({
  selector: 'app-auth-button',
  template: `
  <ng-container *ngIf="auth.isAuthenticated$ | async; else loggedOut">
    <button mat-icon-button class='toolbar-button' (click)="logout()"
      matTooltip="Logout">
      <mat-icon>logout</mat-icon>
    </button>
  </ng-container>

  <ng-template #loggedOut>
    <button mat-icon-button class='toolbar-button' (click)="login()"
    matTooltip="Login">
    <mat-icon>login</mat-icon>
    </button>
  </ng-template>
  `,
  styleUrls: ['./app.component.sass', '../styles.sass']
})
export class AuthButtonComponent {
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {}
  //loggedIn$ = this.store.select(selectLoggedIn);

  //@Todo: integrate Auth0 State with my state
  login() {
    this.auth.loginWithRedirect();
    // this.store.dispatch({type: '[Auth API] Login'});
  }
  logout() {
    this.auth.logout();
    // this.store.dispatch({type: '[Auth API] Logout', redirect: { returnTo: document.location.origin }});
  }
}
