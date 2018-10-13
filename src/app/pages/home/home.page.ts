import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  items: Observable<any[]>;
  myForm: FormGroup;
  isAuth = false;
  authSubscription: Subscription;
  endpoint =
    'https://us-central1-ng-fitness-tracker-c96cc.cloudfunctions.net/httpEmail';

  constructor(
    private authService: AuthService,
    private db: AngularFirestore,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.items = this.db.collection('prices').valueChanges();
    this.initMyForm();
  }

  private initMyForm() {
    this.myForm = this.fb.group({
      fromEmail: ['', [Validators.required, Validators.email]],
      toEmail: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      body: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.authSubscription = this.authService
      .isAuthenticated()
      .subscribe(authStatus => {
        this.isAuth = authStatus;
      });
  }

  sendEmail() {
    this.http
      .post(this.endpoint, this.myForm.value)
      .subscribe(res => this.initMyForm());
  }
}
