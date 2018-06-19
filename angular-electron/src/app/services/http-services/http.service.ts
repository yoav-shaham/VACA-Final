import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  
  constructor(private http: HttpClient) { }
  //addr="http://ec2-18-221-254-75.us-east-2.compute.amazonaws.com:3000/command";
  addr="http://127.0.0.1:3000/command"
  getCommands(){
    var x= this.http.get(this.addr)
  
    console.debug(x)
    return x
  }
  postcommand(command){
   var x = this.http.post(this.addr,command)
    console.debug(x)
    return x
  }
  deletecommand(commandName){
    var x = this.http.delete(this.addr,commandName).subscribe((response) => {
      console.log("deleted")
    })
    console.debug(x)
    return x
  }

}
