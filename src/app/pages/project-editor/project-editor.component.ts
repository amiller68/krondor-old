import { Component, OnInit } from '@angular/core';
import { MdEditorOption, UploadResult } from "ngx-markdown-editor";

@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.sass']
})

export class ProjectEditorComponent implements OnInit {
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
    console.log("Preview changed!")
    console.log(dom);
    console.log(dom.innerHTML);
  }

  //I'm pretty sure I'm gonna want the preview to stay clickable
  // togglePreviewClick() {
  //   this.options.enablePreviewContentClick = !this.options
  //     .enablePreviewContentClick;
  //   //I think this is for triggering changes
  //   this.options = Object.assign({}, this.options);
  // }
  //I'm pretty sure I'm gonna want everything to be resizable
  // toggleResizeAble() {
  //   this.options.resizable = !this.options.resizable;
  //   this.options = Object.assign({}, this.options);
  // }
}
