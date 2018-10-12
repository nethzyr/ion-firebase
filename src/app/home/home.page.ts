import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Auth } from '../auth/auth.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  items: Observable<any[]>;

  constructor(private authService: AuthService, private db: AngularFirestore) {
    this.items = this.db.collection('prices').valueChanges();
  }

  logForm() {
    console.log();
  }

  registerUser(authData: Auth) {
    this.authService.registerUser(authData);
  }
}
