import {Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {DOCUMENT} from "@angular/common";
import {AuthService} from "@auth0/auth0-angular";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass', '../styles.sass']
})
export class AppComponent {
  constructor(private router: Router, @Inject(DOCUMENT) public document: Document, public auth: AuthService) {}

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

  buttonNavigate(route: string) {
    this.router.navigateByUrl(route);
  };

  title = 'krondor';
}
