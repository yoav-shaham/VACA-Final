import { Component, OnInit } from '@angular/core';


    @Component({
        selector: 'app-code-editor',
      templateUrl: './code-editor.component.html',
      styleUrls: ['./code-editor.component.scss'],
      template: `
      <codemirror [(ngModel)]="code"
        (focus)="onFocus()"
        (blur)="onBlur()">
      </codemirror>
    `
    })
export class CodeEditorComponent {
    constructor(){
        var code = `// Some code...`;
      }
}
