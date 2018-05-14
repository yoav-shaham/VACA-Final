import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }

  getCommands(){
    var x= this.http.get("http://127.0.0.1:3000/command")
  
    console.debug(x)
    return x
  }
  postcommand(command){
   var x = this.http.post("http://127.0.0.1:3000/Command",command)
  
    console.debug(x)
    return x
  }

}
