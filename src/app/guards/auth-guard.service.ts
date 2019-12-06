import { OktaAuthService } from '@okta/okta-angular';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  signIn
  constructor(private oktaAuth: OktaAuthService, private router: Router) {
    this.signIn = oktaAuth
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean {
     return this.signIn.oktaAuth.session.get()
      .then(res=>{
          if(res.status === 'ACTIVE'){
            return true;
          }

          this.router.navigate(['login']);
          return false;
      })
      .catch(err=>{
        console.log(err);
      })
  }
}
