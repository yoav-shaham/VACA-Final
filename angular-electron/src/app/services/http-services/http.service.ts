import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }

  getCommands(){
    var x= this.http.get("http://ec2-18-221-254-75.us-east-2.compute.amazonaws.com:3000/command")
  
    console.debug(x)
    return x
  }
  postcommand(command){
   var x = this.http.post("http://ec2-18-221-254-75.us-east-2.compute.amazonaws.com:3000/Command",command)
  
    console.debug(x)
    return x
  }

}
