import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';


import { MenuModule } from './entities/menu/menu.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FrontPageComponent } from './pages/front-page/front-page.component';
import {CommonModule} from "@angular/common";
import {ProjectsPageComponent} from "./pages/projects-page/projects-page.component";

@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent,
    ProjectsPageComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
