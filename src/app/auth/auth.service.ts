import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Auth } from './auth.model';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User;

  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  registerUser(authData: Auth) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(response => {
        console.log(response);
      });
  }

  isAuth() {
    return this.user != null;
  }
}
