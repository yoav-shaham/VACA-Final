import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {HttpService} from '../../services/http-services/http.service'
import { Location } from '@angular/common';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-command-dialog',
  templateUrl: './command-dialog.component.html',
  styleUrls: ['./command-dialog.component.scss']
})
export class CommandDialogComponent {
  newCommand={
    "commandName":"",
    "commandScript":"",
    "commandComment":""};
  constructor(
    public dialogRef: MatDialogRef<CommandDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private httpService: HttpService,  private location: Location) { }
    
    goBack(): void {
      this.location.back();
    }
    
    sendCommand(){
      console.debug(this.newCommand["commandName"])
      this.httpService.postcommand(this.newCommand)
      .subscribe(()=> this.goBack())
      console.log(this.NameFormControl.hasError('required'))
      this.onNoClick();
    }
  onNoClick(): void {
    this.dialogRef.close();
    
  }
  NameFormControl = new FormControl('', [
    Validators.required
  ]);
  CodeFormControl = new FormControl('', [
    Validators.required
  ]);

}
