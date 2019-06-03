import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class AuthguardService implements CanActivate{

  constructor(private router: Router,
              private jwtHelper: JwtHelperService) { }

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

    //TODO
    const decodedToken = this.jwtHelper.decodeToken(token);
    const expirationDate = this.jwtHelper.getTokenExpirationDate(token);
    const isExpired = this.jwtHelper.isTokenExpired(token);

    return !this.jwtHelper.isTokenExpired(token);
  }

  logout(){
    sessionStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

}
