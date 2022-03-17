import { Component, OnInit } from '@angular/core';
import { ProjectsService } from "../../api/services/projects/projects.service";
import {Project} from "../../entities/projects";

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.sass']
})
export class ProjectsPageComponent implements OnInit {
  projects?: Project[] = undefined;
  constructor(private projectService: ProjectsService ) { }

  ngOnInit(): void {
    this.getProjects()
  }

  getProjects(): void {
    console.log("Fetching projects:")
    this.projectService.getProjects()
      .subscribe((data) => {
        // Error Check
        if (data.length > 0) {
            this.projects = data
            console.log(data);
        }
      })
  }

}
