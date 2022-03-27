import {Component, OnInit, isDevMode } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectsService } from "../../api/services/projects/projects.service";
import { Project, Tag, defaultProject } from "../../entities/projects";
import * as _ from 'underscore';
import {TooltipPosition} from "@angular/material/tooltip";
import { ProjectEditorComponent } from "../project-editor/project-editor.component";
import { MdEditorOption, UploadResult } from "ngx-markdown-editor";

export interface ProjectPanel {
  project: Project,
  opened: boolean
}

export interface TagOption {
  tag: Tag,
  selected: boolean
}

export interface ProjectDialogData {
  project: Project,
  tags: Tag[],
  action: string
}

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: [
    './projects-page.component.sass',
  ]
})

export class ProjectsPageComponent implements OnInit {
  projectPanels: ProjectPanel[] = [];
  filteredProjectPanels: ProjectPanel[] = [];
  tagOptions: TagOption[] = [];
  authenticated: boolean = true;

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
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getProjects()
  }

  getProjects(): void {
    console.log("Fetching projects:")
    this.projectService.getProjectsAndTags()
      .subscribe((data) => {
        // Error Check
        if (data.length > 0) {
          //Extract Project Panels
          this.projectPanels = _.map(data[0], (p): ProjectPanel => {
            return {
              project: p,
              opened: false
            }
          })
          this.filteredProjectPanels = this.projectPanels;
          //Extract Tags available
          this.tagOptions = _.map(data[1], (t): TagOption => {
            return {
              tag: t,
              selected: false
            }
          })
          // console.log("Extracted ProjectPanels: ", this.projectPanels);
          // console.log("Extracted Tags: ", this.tagOptions);
        }
      })
  }

  //Helper functions for extracting data from tag selection interface

  //Get Tags from a list of tag options
  getTags(tagOptions?: TagOption[]): Tag[] {
    if(tagOptions !== undefined) {
      return _.map(tagOptions, (t) => t.tag);
    }
    else {
      return _.map(this.tagOptions, (t) => t.tag);
    }
  }

  //Get ids from a list of tags
  getTagIds(tags: Tag[]): string[] {
    return _.map(tags, (t) => t.id);
  }

  //Get the IDs of all selected tags
  getSelectedTagIds(): string[] {
    let selectedTagOptions = _.filter(this.tagOptions, (t) => t.selected);
    return this.getTagIds(this.getTags(selectedTagOptions));
  }

  //Updates filtered projects
  projectFilter(): void {
    let selectedTags: string[] = this.getSelectedTagIds();
    if (selectedTags.length === 0) {
      this.filteredProjectPanels = this.projectPanels;
      return;
    }
    console.log("Tag selection change");
    console.log("Selected Tags: ", selectedTags);
    this.filteredProjectPanels = _.filter(this.projectPanels, (p) => {
      console.log("Testing tags: ", p.project.tags);
      let intersection = _.intersection(p.project.tags, selectedTags);
      console.log("Intersection: ", intersection)
      return intersection.length > 0;
    })
  }

  //Opens the dialog panel for creating a new project
  //obj is any to make it malleable
  openProjectEditor(projectData: ProjectDialogData) {
    let data = projectData;
    const dialogRef = this.dialog.open(ProjectEditorComponent, {
      disableClose: true,
      data: data
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
        this.deleteProject(result.data.id);
      }
      else if(result.event !== 'Cancel'){
        console.log("[ERROR] Unhandled action from dialog")
      }
    });
  }

  getTagColor(tagId: string) {
    //Error Check
    if (this.tagOptions !== []) {
      let tags = this.getTags(this.tagOptions);
      let tag = _.findWhere(tags, {id: tagId});
      if (tag) {
        return "rgb(" + tag.color + ")";
      }
      console.log("[ERROR] Tag does not exist: id = ", tagId)
    }
    console.log("[ERROR] No tags to get colors from!");
    return "rgb(0, 0, 0)"
  }

  //@todo: Make this work with out ToolTips!
  getTagName(tagId: string) {
    //Error Check
    if (this.tagOptions !== []) {
      let tags = this.getTags(this.tagOptions)
      let tag = _.findWhere(tags, {id: tagId});
      if (tag) {
        return tag.name;
      }
      console.log("[ERROR] Tag does not exist: id = ", tagId)
    }
    console.log("[ERROR] No tags to get names from!");
    return "No Name"
  }

  addProject(data: Project) {
    console.log("Added project: ", data)
    this.projectService.addProject(data)
      .subscribe((data) => {
        console.log("Project added successfully!");
        this.projectPanels.push({
          project: data,
          opened: false
        })
        this.filteredProjectPanels = this.projectPanels;
      })
  }

  updateProject(data: Project) {
    console.log("Updated project: ", data)
    this.projectService.updateProject(data)
      .subscribe((data) => {
        console.log("Project added successfully!");
        this.projectPanels = _.map(this.projectPanels, (p) => {
          if (p.project.id === data.id) {
            p.project = data;
          }
          return p;
        })
        this.filteredProjectPanels = this.projectPanels;
      })
  }

  deleteProject(id: string) {
    console.log("Deleted project: ", id)
    this.projectService.deleteProject(id)
      .subscribe((data) => {
        console.log("Project added successfully!");
        this.projectPanels = _.filter(this.projectPanels, (p) => {
          return p.project.id !== id
        })
        this.filteredProjectPanels = this.projectPanels;
      })
  }
}
