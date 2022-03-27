import {Component, Inject, isDevMode} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "@auth0/auth0-angular";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass', '../styles.sass']
})
export class AppComponent {
  constructor(private router: Router,
              public auth: AuthService) {}

  buttonNavigate(route: string) {
    this.router.navigateByUrl(route);
  };

  title = 'krondor';
}

@Component({
  selector: 'app-auth-button',
  template: `
  <div *ngIf="!devMode">
    <ng-container *ngIf="auth.isAuthenticated$ | async; else loggedOut">
      <button mat-icon-button class='toolbar-button' (click)="auth.logout({ returnTo: document.location.origin })"
        matTooltip="Logout">
        <mat-icon>logout</mat-icon>
      </button>
    </ng-container>

    <ng-template #loggedOut>
      <button mat-icon-button class='toolbar-button' (click)="auth.loginWithRedirect()"
      matTooltip="Login">
      <mat-icon>login</mat-icon>
      </button>
    </ng-template>
  </div>
  `,
  styleUrls: ['./app.component.sass', '../styles.sass']
})
export class AuthButtonComponent {
  devMode = isDevMode()
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {}
}
