import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.isAuth = this.authService.isAuthGuard();

    this.authSubscription = this.authService
      .isAuthenticated()
      .subscribe(authStatus => {
        this.isAuth = authStatus;
      });
  }

  async registerSubmitHandler() {
    try {
      await this.authService.registerUser(this.myForm.value);
      this.router.navigate(['/home']);
    } catch (err) {
      console.log(err);
    }
  }

  async loginSubmitHandler() {
    try {
      await this.authService.login(this.myForm.value);
      this.router.navigate(['/home']);
    } catch (err) {
      console.log(err);
    }
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
