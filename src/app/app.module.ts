//Angular Modules
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

//App Modules
import {AppRoutingModule} from './app-routing.module';
import {AppComponent, AuthButtonComponent} from './app.component';

//Angular Materials
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
//Auth for APIs
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatCardModule} from "@angular/material/card";
import {MatDialogModule} from "@angular/material/dialog";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from "@angular/material/select";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatTableModule} from "@angular/material/table";

//Markdown Module
import {LMarkdownEditorModule} from 'ngx-markdown-editor';

//App Components
import {FrontPageComponent} from './pages/front-page/front-page.component';
import {ProjectsPageComponent} from "./pages/projects-page/projects-page.component";
import {PhotosPageComponent} from './pages/photos-page/photos-page.component';
import {AboutPageComponent} from "./pages/about-page/about-page.component";
import {ProjectEditorComponent} from './pages/project-editor/project-editor.component';
import {ErrorPageComponent} from "./pages/error-page/error-page.component";
import {LoginPageComponent} from './pages/login-page/login-page.component';

//Auth module
import {AuthHttpInterceptor, AuthModule} from "@auth0/auth0-angular";

import {environment as env} from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from "@ngrx/effects";

import {projectsApiReducer, projectsPageReducer} from "./state/projects/projects.reducer"
import {tagsReducer} from "./state/tags/tags.reducer";
import {ProjectEffects} from "./state/projects/projects.effects";
import {TagsEffects} from "./state/tags/tags.effects";
import {authReducer} from "./state/auth/auth.reducer";
import {AuthEffects} from "./state/auth/auth.effects";

@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent,
    ProjectsPageComponent,
    PhotosPageComponent,
    AboutPageComponent,
    ProjectEditorComponent,
    ErrorPageComponent,
    LoginPageComponent,
    AuthButtonComponent
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
    MatTableModule,

    AuthModule.forRoot({
      ...env.auth,
      scope: 'write:projects',
      httpInterceptor: {
        allowedList: [
          {
            uri: env.apiEndpoint + '*',
            allowAnonymous: true
          }
        ]
      },
    }),

    StoreModule.forRoot(
      {
        projectsPage: projectsPageReducer,
        projectsApi: projectsApiReducer,
        tags: tagsReducer,
        authState: authReducer
      },
      {}
    ),
    EffectsModule.forRoot([ProjectEffects, TagsEffects, AuthEffects])
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHttpInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
//@ts-ignore
export class AppModule { }
