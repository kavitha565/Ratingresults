import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  profileData:any
  constructor(private oktaAuth:OktaAuthService,private router:Router) { }
  async logout() {
    // Terminates the session with Okta and removes current tokens.
    await this.oktaAuth.logout();
    this.router.navigateByUrl('login');
  }
  ngOnInit() {
    
    //getting profile data from localstorage
    if(localStorage.length>0 && localStorage["okta-token-storage"]){
      let sessionData = JSON.parse(localStorage["okta-token-storage"]);
      if(sessionData && sessionData.idToken && sessionData.idToken.claims)
      this.profileData = sessionData.idToken.claims;
    }
  }

}
