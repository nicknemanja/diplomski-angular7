import { Component, OnInit } from '@angular/core';

import { LoggerService } from '../services/logger.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  constructor(private loggerService: LoggerService) { }

  username: String;

  ngOnInit() {
    //nothing to do
  }

  getUsername() {
    if(this.username == null) {
      this.username = (localStorage.getItem("username"))?  localStorage.getItem("username") : "";
    }

    return this.username;
  }

  logUserAction(username: String, action: String, data: String) {
    this.loggerService.logUserAction(username, action, data).subscribe(data => this.handleLoggingResponse(data));
  }

  handleLoggingResponse(data) {
    console.log("User action logged: " + JSON.stringify(data));
  }

  getUserActivityTracking(username: String) {
      
  }

}
