import { Injectable } from '@angular/core';
import { AuthProvider } from '@ionic-enterprise/auth';
import { SalesforceProvider } from './salesforce.provider';
import { Capacitor } from '@capacitor/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly provider: AuthProvider;
  private readonly providerOptions = environment.providerOptions;

  constructor() {
    const isNativePlatform = Capacitor.isNativePlatform();
    this.provider = new SalesforceProvider();
  }
}
