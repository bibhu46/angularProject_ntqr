import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthorizeService } from './authorize.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,
    private authorize: AuthorizeService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authorize.isUserLoggedIn()) {
      this.authorize.check_expiry();
      return true;
    }      

    this.router.navigate(['login']);
    return false;

  }
}
