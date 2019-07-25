import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  loggingEndpoint = "http://localhost:3000/users/log-user-action";

  constructor(protected http : HttpClient) { }

  logUserAction(username, action, data) {
  	let actionData = {
  		username: username,
  		action: action,
  		data: data
  	};
  	return this.http.post(this.loggingEndpoint, actionData, { 
		withCredentials: true 
	  });
  }
}
