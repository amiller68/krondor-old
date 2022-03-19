import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectsService } from "../../api/services/projects/projects.service";
import { Project } from "../../entities/projects";
import * as _ from 'underscore';

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
  constructor(
    private projectService: ProjectsService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getProjects()
  }

  getProjects(): void {
    console.log("Fetching projects:")
    this.projectService.getProjects()
      .subscribe((data) => {
        // Error Check
        if (data.length > 0) {
            this.projectPanels = _.map(data, (p): ProjectPanel => {
              return {
                project: p,
                opened: false
              }
            })
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
}

@Component({
  selector: 'add-project-dialog',
  templateUrl: 'add-project-dialog.html',
})
export class AddProjectDialogComponent {}
