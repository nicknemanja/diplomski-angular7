import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';

import { LoginService } from '../services/login.service';
import { LoggerService } from '../services/logger.service';

import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent extends BaseComponent implements OnInit {
  user = new User(0,"","","","","");
  errorMessage: String = "";

  constructor(private router: Router, 
              private loginService: LoginService,
              loggerService: LoggerService) {
                super(loggerService);
               }

  ngOnInit() { 
    //nothing to do
  }

  onSubmit(){
    if(this.user.username == "") {
      alert("Username and password must be filled");
      return;
    }
    if(this.user.password == "") {
      alert("Username and password must be filled");
      return;
    }
    
    this.loginService.loginUser(this.user)
        .subscribe(userData => this.handleLoginData(userData));
  }

  handleLoginData(userData) {
    this.logUserAction(userData.user.username, "Login", JSON.stringify(userData.success));
    if(userData.success) {
      localStorage.setItem("username", userData.user.username);
      sessionStorage.setItem("token", userData.token);
      this.router.navigate(['/cryptocurrencies']);
    } else {
        this.errorMessage = "Invalid username or password.";
        return;
    }
  }
}
