import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { LoginService } from "./login.service";

@Injectable({
  providedIn: 'root'
})

export class AuthguardService implements CanActivate{

  constructor(private router: Router,
              private jwtHelper: JwtHelperService,
              private loginService: LoginService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {        
    if(!this.isLoggedIn()){
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }

  isLoggedIn() {

    let token = sessionStorage.getItem("token");

    if(sessionStorage.getItem("token") == null) {
      return false;
    }

    const decodedToken = this.jwtHelper.decodeToken(token);
    const expirationDate = this.jwtHelper.getTokenExpirationDate(token);
    const isExpired = this.jwtHelper.isTokenExpired(token);

    return !this.jwtHelper.isTokenExpired(token);
  }

  logout(){
    this.clearUserData();
    this.loginService.logoutUser().subscribe(logoutData => {
      if(logoutData.success) {
        this.router.navigate(['/login']);
      }
    });
  }

  clearUserData() {
    sessionStorage.removeItem("token");
    localStorage.removeItem("username");
  }

}
