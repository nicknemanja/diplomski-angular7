import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../services/logger.service';
import { UseractionService } from '../services/useraction.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends BaseComponent implements OnInit {

  useractivitytracking: Object;
  userInfo: Object;

  constructor(loggerService: LoggerService, private useractionService: UseractionService) {
    super(loggerService);
 }

  ngOnInit() {
    this.loadUserData();
    this.loadUserActivityTracking();
  }

  loadUserData() {
    let username = this.getUsername();
    this.useractionService.getUserInfo(username).subscribe(result =>  this.handleUserInfo(result));
  }

  loadUserActivityTracking() {
    let username = this.getUsername();
    //TODO Uzeti username na serverskoj strani iz sesije kad se napravi...
    this.useractionService.getUserActivityTracking(username).subscribe(result =>  this.handleUserActivityTracking(result));
  }

  handleUserActivityTracking(result) {
    this.useractivitytracking = JSON.parse(result.data);
  }

  handleUserInfo(result: any) {
    console.log(result.userInfo.username);
    this.userInfo = result.userInfo;
  }

}
