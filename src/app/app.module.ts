import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';

//firebase configurarion
import { AngularFireModule } from "angularfire2";
import { environment } from "../environments/environment";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFirestoreModule } from 'angularfire2/firestore';

//auth 0
import { AuthService } from "./service/auth.service";

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'movie-tinder-app'),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatToolbarModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
