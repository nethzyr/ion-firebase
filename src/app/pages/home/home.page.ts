import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from '../../auth/auth.service';
import { LoadItems } from '../../items/store/actions';
import { ItemsState } from '../../items/store/reducers/reducer';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  authSubscription: Subscription;
  endpoint =
    'https://us-central1-ng-fitness-tracker-c96cc.cloudfunctions.net/httpEmail';
  items: Observable<any[]>;
  isAuth = false;
  myForm: FormGroup;
  subscriptions: Array<Subscription> = [];

  constructor(
    private authService: AuthService,
    private db: AngularFirestore,
    private fb: FormBuilder,
    private http: HttpClient,
    private toastController: ToastController,
    private store: Store<ItemsState>
  ) {
    this.initMyForm();

    this.items = this.store.select('items');

    this.store.dispatch(new LoadItems());
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

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
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

    const promise = this.presentToast();
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
