import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {
  constructor(private router: Router) {}

  buttonNavigate = function (route: string) {
    // @ts-ignore
    this.router.navigateByUrl(route);
  };

  ngOnInit(): void {
  }

}