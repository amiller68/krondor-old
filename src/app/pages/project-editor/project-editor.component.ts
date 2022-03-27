import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MdEditorOption, UploadResult } from "ngx-markdown-editor";
import { MatDialogRef, MAT_DIALOG_DATA  } from "@angular/material/dialog";
import {defaultProject, Project, Tag} from "../../entities/projects";
import {ProjectDialogData} from "../projects-page/projects-page.component";
import * as _ from "underscore";

@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.sass']
})

export class ProjectEditorComponent implements OnInit {
  //Dialog state
  //Action coordinates what we're doing to the project being edited
  action: string = '';
  localProject: Project = defaultProject;
  localTags: Tag[] = [];

  //Editor variables
  title: string = '';
  content: string = '';
  mode: string = "editor";

  //Source: https://stackblitz.com/edit/ngx-markdown-editor?file=src%2Fapp%2Fapp.component.ts
  public options: MdEditorOption = {
    showPreviewPanel: false,
    enablePreviewContentClick: false,
    resizable: false,
  };

  constructor(
    public dialogRef: MatDialogRef<ProjectEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProjectDialogData) {
    console.log("Dialog opened with Initializer: ", data);
    this.localProject = data.project;
    this.localTags = data.tags
    this.action = data.action;

    this.doUpload = this.doUpload.bind(this);
    this.preRender = this.preRender.bind(this);
    this.postRender = this.postRender.bind(this);
  }

  ngOnInit(): void {
  }

  //Dialog action controls
  doAction(){
    console.log("Submitted dialog action")
    this.dialogRef.close({event:this.action,data:this.localProject});
    this.localProject = defaultProject;
  }

  closeDialog(){
    console.log("Closed dialog")
    this.dialogRef.close({event:'Cancel'});
    this.localProject = defaultProject;
  }

  //Project editing and data access methods:

  getTagColor(tagId: string) {
    //Error Check
    if (this.localTags !== undefined) {
      let tags = this.localTags
      let tag = _.findWhere(tags, {id: tagId});
      if (tag) {
        return "rgb(" + tag.color + ")";
      }
      console.log("[ERROR] Tag does not exist: id = ", tagId)
    }
    console.log("[ERROR] No tags to get colors from!");
    return "rgb(0, 0, 0)"
  }

  //MD Editor methods

  //@todo: Implement upload
  doUpload(files: Array<File>): Promise<Array<UploadResult>> {
    return Promise.resolve([{ name: 'xxx', url: 'xxx.png', isImg: true }]);
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
    console.log("Preview changed!")
    console.log(dom);
    console.log(dom.innerHTML);
  }
}
