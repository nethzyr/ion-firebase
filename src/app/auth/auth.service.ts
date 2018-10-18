import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';

import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root',
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

  get currentUserObservable(): any {
    return this.afAuth.authState;
  }

  isAuthenticated() {
    return this.isAuth$;
  }

  isAuthGuard() {
    return this.isAuth;
  }

  registerUser(authData: AuthData) {
    return this.afAuth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password,
    );
  }

  login(authData: AuthData) {
    return this.afAuth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password,
    );
  }

  logout() {
    return this.afAuth.auth.signOut();
  }
}
