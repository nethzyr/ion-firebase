import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuth$ = new Subject<boolean>();
  private isAuth = false;

  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  initAuthService() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuth$.next(true);
        this.isAuth = true;
      } else {
        this.isAuth$.next(false);
        this.isAuth = false;
      }
    });
  }

  isAuthenticated() {
    return this.isAuth$;
  }

  isAuthGuard() {
    return this.isAuth;
  }

  registerUser(authData: AuthData) {
    this.afAuth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    );
  }

  login(authData: AuthData) {
    this.afAuth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password
    );
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
