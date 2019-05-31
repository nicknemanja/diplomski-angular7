import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate{

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const isUserLoggedIn = sessionStorage.getItem("isUserLoggedIn");
        if (isUserLoggedIn == "1") {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }

}
