import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { RegistrationService } from '../services/registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user = new User(0,"","","","","");

  constructor(private registrationService: RegistrationService,
              private router: Router) { }

  ngOnInit() {
  	
  }

  onSubmit(){

    if((<HTMLInputElement>document.getElementById("registration-username")).value == "") {
      alert("All fields must be filled");
      return;
    }

    if((<HTMLInputElement>document.getElementById("registration-firstname")).value == "") {
      alert("All fields must be filled");
      return;
    }

    if((<HTMLInputElement>document.getElementById("registration-lastname")).value == "") {
      alert("All fields must be filled");
      return;
    }

    if((<HTMLInputElement>document.getElementById("registration-email")).value == "") {
      alert("All fields must be filled");
      return;
    }

    if((<HTMLInputElement>document.getElementById("registration-password")).value == "") {
      alert("All fields must be filled");
      return;
    }

  	this.registrationService.registerUser(this.user)
        .subscribe(responseData => this.handleData(responseData));
  }

  handleData(responseData) {

    if(responseData.success) {
      alert("Registration success.");
      this.router.navigate(['/login']);
    } else {
        alert(responseData.msg);
    }

  }

}
