import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  user = new User(0,"","","","","");

  constructor(private router: Router, 
              private loginService: LoginService) { }

  ngOnInit() { 

  }

  onSubmit(){

    if((<HTMLInputElement>document.getElementById("login-username")).value == "") {
      alert("Username and password must be filled");
      return;
    }

    if((<HTMLInputElement>document.getElementById("login-password")).value == "") {
      alert("Username and password must be filled");
      return;
    }

    this.loginService.loginUser(this.user)
    .subscribe(userData => this.handleLoginData(userData));
    
  }

  handleLoginData(userData) {

    if(userData.success) {
      alert("User je logovan.");
      sessionStorage.setItem("token", userData.token);
      this.router.navigate(['/cryptocurrencies']);
    } else {
      alert(userData.message);
    }

  }

}
