import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass', '../styles.sass'],
})
export class AppComponent {
  constructor(
    private router: Router,
    @Inject(DOCUMENT) public document: Document
  ) {}

  buttonNavigate(route: string) {
    this.router.navigateByUrl(route);
  }

  title = 'krondor';
}
