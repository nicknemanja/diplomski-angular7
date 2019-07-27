import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UseractionService {

  userActivityTrackingInfo = "http://localhost:3000/users/activity-tracking";
  userDataInfo = "http://localhost:3000/users/user-info";

  constructor(protected http : HttpClient) { }

  getUserActivityTracking(username: String) {
    let actionData = {
  		username: username
  	};
    return this.http.post(this.userActivityTrackingInfo, actionData, { 
      withCredentials: true 
      });
  }

  getUserInfo(username: String) {
    let userInfo = {
      username: username
    };
    return this.http.post(this.userDataInfo, userInfo, { 
      withCredentials: true 
      });
  }

}
