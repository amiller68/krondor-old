import { Component, OnInit, VERSION } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectsService } from "../../api/services/projects/projects.service";
import { Project, Tag } from "../../entities/projects";
import {FormControl, Validators} from '@angular/forms';
import * as _ from 'underscore';
import {TooltipPosition} from "@angular/material/tooltip";
import {  MdEditorOption, UploadResult } from "ngx-markdown-editor";
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

  //Opens the dialog panel for creating a new project
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

export class AddProjectDialogComponent {

  title: string = '';
  public content: string = '';
  public mode: string = "editor";

  //Source: https://stackblitz.com/edit/ngx-markdown-editor?file=src%2Fapp%2Fapp.component.ts
  public options: MdEditorOption = {
    showPreviewPanel: false,
    enablePreviewContentClick: false,
    resizable: true,
  };

  constructor() {
    this.doUpload = this.doUpload.bind(this);
    this.preRender = this.preRender.bind(this);
    this.postRender = this.postRender.bind(this);
  }

  doUpload(files: Array<File>): Promise<Array<UploadResult>> {
    // do upload file by yourself
    return Promise.resolve([{ name: 'xxx', url: 'xxx.png', isImg: true }]);
  }

  ngOnInit(): void {
    let contentArr = ["# New Project"];
    contentArr.push("Use this editor to type up what you're thinking about");
    this.content = contentArr.join("\r\n");
  }

  togglePreviewPanel() {
    this.options.showPreviewPanel = !this.options.showPreviewPanel;
    this.options = Object.assign({}, this.options);
  }

  changeMode() {
    if (this.mode === "editor") {
      this.mode = "preview";
    } else {
      this.mode = "editor";
    }
  }

  togglePreviewClick() {
    this.options.enablePreviewContentClick = !this.options
      .enablePreviewContentClick;
    this.options = Object.assign({}, this.options);
  }

  toggleResizeAble() {
    this.options.resizable = !this.options.resizable;
    this.options = Object.assign({}, this.options);
  }

  //editor: AceEditor
  onEditorLoaded(editor: any) {
    console.log("Editor loaded: ", editor);
  }

  preRender(content: any) {
    console.log("Pre-render called");
    return content;
  }

  postRender(htmlContent: any) {
    console.log("Post-render called");
    return htmlContent;
  }

 onPreviewDomChanged(dom: HTMLElement) {
    console.log(dom);
    console.log(dom.innerHTML);
  }
}
