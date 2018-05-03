import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-variables';

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientID,
    redirectUri: AUTH_CONFIG.callbackURL,
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    responseType: 'token id_token',
    scope: 'openid'
  });

  constructor(public router: Router) { }

  public login(email: string, password: string): void {
    // tslint:disable-next-line:no-debugger

    this.auth0.login({realm: 'Username-Password-Authentication', email, password},
     (err, authResult) => {
       console.log('err: ' + err);
       console.log('authResult: ' + authResult);
      // tslint:disable-next-line:no-debugger
      if (err) {
        console.log(err);
        alert(`Error: ${err}. Check the console for further details.`);
        return;
      } else if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      }
    });
  }

  public signup(email: string, password: string): void {
    this.auth0.redirect.signupAndLogin({
      connection: 'Username-Password-Authentication',
      email,
      password,
    }, err => {
      if (err) {
        console.log(err);
        alert(`Error: ${err.description}. Check the console for further details.`);
        return;
      }
    });
  }

  public loginWithGoogle(): void {
    // tslint:disable-next-line:no-debugger
    this.auth0.authorize({
      connection: 'google-oauth2',
    });
  }

  public handleAuthentication(): void {
    // tslint:disable-next-line:no-debugger
    this.auth0.parseHash((err, authResult) => {
      // tslint:disable-next-line:no-debugger
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify(
      (authResult.expiresIn * 1000) + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    this.router.navigate(['home']);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/home']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
