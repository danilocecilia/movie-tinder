import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
// import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';

import {MatToolbarModule} from '@angular/material/toolbar';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  items: Observable<any[]>;

  constructor(db: AngularFireDatabase) {
    this.items = db.list('/books').valueChanges();
  }
}
