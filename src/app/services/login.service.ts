import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends LoggerService {

	loginUrl = "http://localhost:3000/users/authenticate";
	logoutUrl ="http://localhost:3000/users/logout";

	 constructor(public http : HttpClient,
					 private loggerService : LoggerService) {
		 super(http);
	  }

 	loginUser(user: User) {
  		return this.http.post<any>(this.loginUrl, user, { 
			withCredentials: true 
		  });
	  }
	  
	logoutUser() {
		return this.http.post<any>(this.logoutUrl, {}, {withCredentials: true});
	}
}
