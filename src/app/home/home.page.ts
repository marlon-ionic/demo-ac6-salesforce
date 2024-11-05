import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, ToastController } from '@ionic/angular/standalone';
import { AuthService } from '../core/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, AsyncPipe, IonButton],
})
export class HomePage {
  private readonly authService = inject(AuthService);
  private readonly toastController = inject(ToastController);
  isAuthenticated$ = this.authService.isAuthenticated$;
  constructor() {}

  async login() {
    try {
      await this.authService.login();
    } catch (error) {
      console.error('Login failed', error);
      const toast = await this.toastController.create({
        color: 'danger',
        message: 'Login failed',
        duration: 3000
      });
      await toast.present();
    }
  }

  async logout() {
    try {
      await this.authService.logout();
    } catch (error) {
      console.error('Logout failed', error);
      const toast = await this.toastController.create({
        color: 'danger',
        message: 'Login failed',
        duration: 3000
      });
      await toast.present();
    }
  }
}
