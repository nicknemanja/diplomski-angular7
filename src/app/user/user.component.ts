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

  useractivitytracking;

  constructor(loggerService: LoggerService, private useractionService: UseractionService) {
    super(loggerService);
 }

  ngOnInit() {
    this.loadUserData();
    this.loadUserActivityTracking();
  }

  loadUserData() {
    console.log("calling loadUserData() - ispraviti sesiju pa uraditi...");
  }

  loadUserActivityTracking() {
    let username = this.getUsername();
    console.log("Getting activity-tracking for user: " + username);
    //TODO Uzeti username na serverskoj strani iz sesije kad se napravi...
    this.useractionService.getUserActivityTracking(username).subscribe(result =>  this.handleData(result));
  }

  handleData(result) {
    this.useractivitytracking = (JSON.parse(result.data));
  }

}
