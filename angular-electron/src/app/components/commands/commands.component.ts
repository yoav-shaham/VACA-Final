import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http-services/http.service'
import { CommandName } from 'blocking-proxy/built/lib/webdriver_commands';
import { HighlightResult } from 'ngx-highlightjs';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CommandDialogComponent } from "../command-dialog/command-dialog.component";

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.scss']
})
export class CommandsComponent implements OnInit {
  commandsHolder = {
    "commands": [{
      "commandName": "beforeoInitiation",
      "commandScript": "beforeoInitiation",
      "commandComment": "beforeoInitiation"
    }],
  };
  response: HighlightResult;
  constructor(public dialog: MatDialog, private _location: Location, private httpService: HttpService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    {
      iconRegistry.addSvgIcon(
        'reload',
        sanitizer.bypassSecurityTrustResourceUrl('../../../dist/assets/refresh.svg'));
      iconRegistry.addSvgIcon(
        'add',
        sanitizer.bypassSecurityTrustResourceUrl('../../../dist/assets/add.svg'));
      iconRegistry.addSvgIcon(
        'back',
        sanitizer.bypassSecurityTrustResourceUrl('../../../dist/assets/back.svg'));
      iconRegistry.addSvgIcon(
        'delete',
        sanitizer.bypassSecurityTrustResourceUrl('../../../dist/assets/delete.svg'));
        

    }
  }
  addCommand(): void {
    let dialogRef = this.dialog.open(CommandDialogComponent, {
      width: '40%',
      height: 'auto'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getCommands()
    });
    
  }
  getCommands() {
    this.httpService.getCommands()
      .subscribe(data =>
        this.commandsHolder['commands'] = data['commands']
      )

    console.debug('2')
    console.debug(this.commandsHolder['commands'][0].commandName)
  }
  deleteCommand(commandName) {
    console.log(commandName)
    var reply = this.httpService.deletecommand(commandName)
    this.getCommands()

  }
  onHighlight(e) {
    this.response = {
      language: e.language,
      r: e.r,
      second_best: '{...}',
      top: '{...}',
      value: '{...}'
    }
  }
  backClicked() {
    this._location.back();
  }

  ngOnInit() {
    this.getCommands()
  }

}
