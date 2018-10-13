import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

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
    private fb: FormBuilder,
    private toastController: ToastController
  ) {
    this.items = this.db.collection('prices').valueChanges();
    this.initMyForm();
  }

  private initMyForm() {
    this.myForm = this.fb.group({
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

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your email have been sent.',
      position: 'top',
      duration: 3000
    });
    toast.present();
  }
}
