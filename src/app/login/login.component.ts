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

  constructor(private router: Router, 
              private loginService: LoginService,
              loggerService: LoggerService) {
                super(loggerService);
               }

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
    this.logUserAction(userData.user.username, "Login", JSON.stringify(userData.success));

    if(userData.success) {
      localStorage.setItem("username", userData.user.username);
      sessionStorage.setItem("token", userData.token);
      this.router.navigate(['/cryptocurrencies']);
    } else {
      alert(userData.msg);
      return;
    }

  }

}
