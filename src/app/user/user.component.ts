import { Component, OnInit } from '@angular/core';
import { HttpClient } from ''

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.loadUserData();
    this.loadUserActivityTracking();
  }

  loadUserData() {
    //http get for userdata
  }

  loadUserActivityTracking() {
    //http get for user activity tracking
    this.("http://localhost:3000/users/activity-tracking");
  }

}
