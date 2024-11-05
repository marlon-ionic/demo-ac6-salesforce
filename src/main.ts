import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { AuthService } from './app/core/auth.service';
import { VaultService } from './app/core/vault.service';
import { APP_INITIALIZER } from '@angular/core';


const appInitFactory =
  (vaultService: VaultService,  authService: AuthService): (() => Promise<void>) =>
  async () => {
    await vaultService.init();
    await authService.init();
  };

bootstrapApplication(AppComponent, {
  providers: [
    { provide: APP_INITIALIZER, useFactory:appInitFactory , deps: [VaultService, AuthService], multi: true },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
