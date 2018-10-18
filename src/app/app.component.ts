import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Platform } from '@ionic/angular';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.authService.initAuthService();
    this.platform.ready()
      .then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      });
  }

  async onSignOut() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}
