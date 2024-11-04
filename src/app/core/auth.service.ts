import { inject, Injectable } from '@angular/core';
import { AuthConnect, AuthProvider, AuthResult } from '@ionic-enterprise/auth';
import { SalesforceProvider } from './salesforce.provider';
import { Capacitor } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { VaultService } from './vault.service';

const authResultKey = 'authResult';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly vaultService = inject(VaultService);
  private readonly provider: AuthProvider;
  private readonly providerOptions = environment.providerOptions;

  constructor() {
    this.provider = new SalesforceProvider();
  }

  async init() {
    await AuthConnect.setup({
      platform: Capacitor.isNativePlatform() ? 'capacitor' : 'web',
      logLevel: 'DEBUG'
    });
  }

  async login() {
    const authResult = await AuthConnect.login(this.provider, this.providerOptions);
    this.saveAuthResult(authResult);
  }

  async isAuthenticated(): Promise<boolean> {
    const authResult = await this.getAuthResult();
    return !!authResult && (await AuthConnect.isAccessTokenAvailable(authResult));
  }

  async logout(): Promise<void> {
    const authResult = await this.getAuthResult();
    if (authResult) {
      await AuthConnect.logout(this.provider, authResult);
      this.saveAuthResult(null);
    }
  }

  private async getAuthResult(): Promise<AuthResult | null> {
    let authResult = await this.vaultService.get<AuthResult>(authResultKey);
    if (
      authResult &&
      (await AuthConnect.isAccessTokenAvailable(authResult)) &&
      (await AuthConnect.isAccessTokenExpired(authResult))
    ) {
      authResult = await this.refreshAuthResult(authResult);
    }
    return authResult;
  }

  private async refreshAuthResult(authResult: AuthResult): Promise<AuthResult | null> {
    let newAuthResult: AuthResult | null = null;
    if (await AuthConnect.isRefreshTokenAvailable(authResult)) {
      try {
        newAuthResult = await AuthConnect.refreshSession(this.provider, authResult);
      } catch (err) {
        null;
      }
    }
    await this.saveAuthResult(newAuthResult);
    return newAuthResult;
  }

  private async saveAuthResult(authResult: AuthResult | null): Promise<void> {
    if (authResult) {
      await this.vaultService.set(authResultKey, authResult);
    } else {
      await this.vaultService.clear();
    }
  }
}
