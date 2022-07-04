import {Component, isDevMode, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectsService } from "../../api/services/projects/projects.service";
import { TagsService } from "../../api/services/tags/tags.service";
import { Project, Tag, defaultProject } from "../../entities/projects";
import * as _ from 'underscore';
import {TooltipPosition} from "@angular/material/tooltip";
import { ProjectEditorComponent } from "../project-editor/project-editor.component";
import { MdEditorOption } from "ngx-markdown-editor";
import { AuthService } from "@auth0/auth0-angular";
import {Observable, of} from "rxjs";
import {Store} from '@ngrx/store';
import {selectFocusedProjects, selectProjectsLoaded} from "../../state/projects/projects.selector";
import {selectTags} from "../../state/tags/tags.selector";
import {mergeMap} from "rxjs/operators";

export interface ProjectPanel {
  project: Project,
  opened: boolean
}

export interface ProjectDialogData {
  project: Readonly<Project>,
  tags: ReadonlyArray<Tag>,
  action: string
}

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: [
    './projects-page.component.sass',
    '../../app.component.sass'
  ]
})

export class ProjectsPageComponent implements OnInit {
  tags$: Observable<readonly Tag[]> = this.store.select(selectTags);

  //Pipe the projects and tags through the interface we need for out Frontend
  projectPanels$: Observable<ProjectPanel[]> = this.store.select(selectFocusedProjects).pipe(
    mergeMap( (projects) => of(
      _.map(projects, (p): ProjectPanel => {
        return {
          project: p,
          opened: false
        }
      })
    ))
  )

  pageLoaded$: Observable<boolean> = this.store.select(selectProjectsLoaded);

  focusedPanel: ProjectPanel | undefined = undefined;

  // If NODE_ENV is set to 'development', then allowed to edit
  isAdmin = isDevMode();

  //Makes the HTML happy
  defaultProjectCopy: Project = defaultProject;

  //@todo: determine this dynamically in order to make sure its displayed correctly
  positionOptions: TooltipPosition[] = ['before'];
  tagToolTipPosition = this.positionOptions[0];

  public options: MdEditorOption = {
    showPreviewPanel: true,
    showBorder: false,
    enablePreviewContentClick: true,
  };

  constructor(
    private projectService: ProjectsService,
    private tagsService: TagsService,
    private dialog: MatDialog,
    private store: Store
  ) {
    this.store.dispatch({type: '[Auth API] Check Write Privilege'})
  }

  ngOnInit(): void {
    this.store.dispatch({ type: '[Projects API] Load Projects' });
    this.store.dispatch({ type: '[Tags API] Load Tags' });
  }

  //Opens the dialog panel for creating a new project
  //obj is any to make it malleable
  openProjectEditor(projectData: ProjectDialogData) {
    const dialogRef = this.dialog.open(ProjectEditorComponent, {
      disableClose: true,
      data: projectData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog result: ", result);
      if(result.event == 'Add'){
        this.addProject(result.data);
      }
      else if(result.event == 'Edit'){
        this.updateProject(result.data);
      }
      else if(result.event == 'Delete'){
        this.deleteProject(result.data._id);
      }
      else if(result.event !== 'Cancel'){
        console.log("[ERROR] Unhandled action from dialog")
      }
    });
  }

  getTagColor(tagId: string) {
    let tag = _.findWhere(this.getTags(), {_id: tagId});
    if (tag) {
      return "rgb(" + tag.color + ")";
    }
    // console.log("[ERROR] Tag does not exist: id = ", tagId)
    return "rgb(0, 0, 0)"
  }

  //@todo: Make this work with out ToolTips!
  getTagName(tagId: string) {
    let tag = _.findWhere(this.getTags(), {_id: tagId});
    if (tag) {
      return tag.name;
    }
    // console.log("[ERROR] Tag does not exist: id = ", tagId)
    return 'No Name'
  }


  private addProject(data: Project) {
    this.store.dispatch({type: "[Projects API] Add Project", project: data})
  }

  private updateProject(data: Project) {
    this.store.dispatch({type: "[Projects API] Update Project", project: data})
  }

  private deleteProject(data: string) {
    this.store.dispatch({type: "[Projects API] Delete Project", id: data})
  }

  updateTags(id: string) {
    this.store.dispatch({type: "[Projects Page] Update Selected Tags", tag_id: id })
  }

  getTags() {
    let tags: ReadonlyArray<Tag> = [];
    this.tags$.subscribe(ts => tags = ts)
    return tags
  }

  setOpened(p: ProjectPanel) {
    // p.opened = true;
    // this.focusedPanel = p;
    return p.opened;
  }
}
