import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectsService } from "../../api/services/projects/projects.service";
import { Project, Tag } from "../../entities/projects";
import {FormControl} from '@angular/forms';
import * as _ from 'underscore';
import {TooltipPosition} from "@angular/material/tooltip";

export interface ProjectPanel {
  project: Project,
  opened: boolean
}

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.sass']
})

export class ProjectsPageComponent implements OnInit {
  projectPanels?: ProjectPanel[] = undefined;
  tags?: Tag[] = undefined;

  //@todo: determine this dynamically in order to make sure its displayed correctly
  positionOptions: TooltipPosition[] = ['before'];
  tagToolTipPosition = this.positionOptions[0];

  selectedTags = new FormControl();

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
            //Extract Tags available
            this.tags = data[1];
            console.log("Extracted ProjectPanels: ", this.projectPanels);
            console.log("Extracted Tags: ", this.tags);
            console.log(data);
        }
      })
  }

  addProject() {
    const dialogRef = this.dialog.open(AddProjectDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getTagColor(tagId: string) {
    //Error Check
    if (this.tags !== undefined) {
      let tags = this.tags
      //@ts-ignore
      //@todo: figure out how to read this properly
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
    if (this.tags !== undefined) {
      let tags = this.tags
      //@ts-ignore
      //@todo: figure out how to read this properly
      let tag = _.findWhere(tags, {id: tagId});
      if (tag) {
        return tag.name;
      }
      console.log("[ERROR] Tag does not exist: id = ", tagId)
    }
    console.log("[ERROR] No tags to get names from!");
    return "No Name"
  }
}

@Component({
  selector: 'add-project-dialog',
  templateUrl: 'add-project-dialog.html',
})

export class AddProjectDialogComponent {}
