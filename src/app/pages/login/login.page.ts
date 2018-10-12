import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage implements OnInit, OnDestroy {
  myForm: FormGroup;
  isAuth = false;
  authSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.authSubscription = this.authService
      .isAuthenticated()
      .subscribe(authStatus => {
        this.isAuth = authStatus;
      });
  }

  onSignOut() {
    this.authService.logout();
  }

  async registerSubmitHandler() {
    try {
      await this.authService.registerUser(this.myForm.value);
    } catch (err) {
      console.log(err);
    }
  }

  async loginSubmitHandler() {
    try {
      await this.authService.login(this.myForm.value);
    } catch (err) {
      console.log(err);
    }
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
