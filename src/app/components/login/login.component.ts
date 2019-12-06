import { Component, OnInit } from '@angular/core';
import * as OktaSignIn from '@okta/okta-signin-widget';
import { OktaAuthService } from '@okta/okta-angular';
import { AppConfig } from 'src/app/app.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signin
  widget = new OktaSignIn({
    baseUrl: this.appConfig.okta["baseUrl"]
  });
  
  constructor(private oktaAuth: OktaAuthService,private appConfig: AppConfig,private router:Router) {
    this.signin = this.oktaAuth;
   }

  ngOnInit() {

    this.signin.oktaAuth.session.get().then(res => {
      if(res.status === 'INACTIVE') {
        this.widget.renderEl({
          el: "#okta-signin-container"},
          (res) => {
            console.log(res);
            this.signin.loginRedirect('dashboard', {sessionToken: res.session.token});
            this.widget.hide();
          })
      } else {
        this.signin.loginRedirect('dashboard');
      }
    })
    
  }
}
