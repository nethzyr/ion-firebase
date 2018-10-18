import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  authSubscription: Subscription;
  endpoint =
    'https://us-central1-ng-fitness-tracker-c96cc.cloudfunctions.net/httpEmail';
  items: Observable<any[]>;
  isAuth = false;
  myForm: FormGroup;

  constructor(
    private authService: AuthService,
    private db: AngularFirestore,
    private fb: FormBuilder,
    private http: HttpClient,
    private toastController: ToastController,
  ) {
    this.items = this.db.collection('prices')
      .valueChanges();

    this.initMyForm();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your email have been sent.',
      position: 'top',
      duration: 3000,
    });
    toast.present();
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
      .toPromise()
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });

    this.presentToast();
    this.initMyForm();
  }

  private initMyForm() {
    this.myForm = this.fb.group({
      toEmail: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      body: ['', [Validators.required]],
    });
  }

  add() {
    console.log();
  }
}
