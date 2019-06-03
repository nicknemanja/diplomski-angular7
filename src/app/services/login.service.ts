import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

	loginUrl = "http://localhost:3000/users/authenticate";

 	constructor(private http : HttpClient) { }

 	loginUser(user: User) {
  		return this.http.post<any>(this.loginUrl, user);
  	}

}
