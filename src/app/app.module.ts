//Angular Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {CommonModule} from "@angular/common";

//App Modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Angular Materials
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTableModule } from "@angular/material/table";

//Markdown Module
import { LMarkdownEditorModule } from 'ngx-markdown-editor';

//App Components
import { FrontPageComponent } from './pages/front-page/front-page.component';
import { ProjectsPageComponent } from "./pages/projects-page/projects-page.component";
import { PhotosPageComponent } from './pages/photos-page/photos-page.component';
import {AboutPageComponent} from "./pages/about-page/about-page.component";
import { ProjectEditorComponent } from './pages/project-editor/project-editor.component';
import {ErrorPageComponent} from "./pages/error-page/error-page.component";

@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent,
    ProjectsPageComponent,
    PhotosPageComponent,
    AboutPageComponent,
    ProjectEditorComponent,
    ErrorPageComponent
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
    MatSidenavModule,
    MatMenuModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatDividerModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    LMarkdownEditorModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
//@ts-ignore
export class AppModule { }
