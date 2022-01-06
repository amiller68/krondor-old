import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FrontPageComponent } from './pages/front-page/front-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { WritingPageComponent } from './pages/writing-page/writing-page.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';


const routes: Routes = [
  { path: '', component: FrontPageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'projects', component: ProjectsPageComponent },
  { path: 'writing', component: WritingPageComponent },
  // Wild card route
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
