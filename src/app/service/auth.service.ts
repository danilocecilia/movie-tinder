import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import * as auth0 from "auth0-js";
import { AUTH_CONFIG } from "./auth0-variables";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AuthService {
  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientID,
    redirectUri: AUTH_CONFIG.callbackURL,
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    responseType: "token id_token",
    scope: "openid"
  });

  constructor(public router: Router, private http: HttpClient) {}

  public login(email: string, password: string): void {
    this.auth0.login(
      { realm: "Username-Password-Authentication", email, password },
      (err, authResult) => {
        if (err) {
          console.log(err);
          alert(`Error: ${err}. Check the console for further details.`);
          return;
        } else if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
        }
      }
    );
  }

  public signup(email: string, password: string): void {
    const credentials = {
      client_id: AUTH_CONFIG.clientID,
      email: email,
      password: password,
      connection: "Username-Password-Authentication"
    };

    this.http
      .post("https://dcecilia.auth0.com/dbconnections/signup", credentials)
      .toPromise()
      .then(result => {
        console.log(result);
        this.login(email, password);
      })
      .catch(err => {
        console.log(err);
      });
  }

  public loginWithGoogle(): void {
    this.auth0.authorize({
      connection: "google-oauth2"
    });
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.router.navigate(["/home"]);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);

    this.router.navigate(["home"]);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    // Go back to the home route
    this.router.navigate(["/home"]);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }
}
