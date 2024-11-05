import { Capacitor } from "@capacitor/core";
import { ProviderOptions } from "@ionic-enterprise/auth";

const providerOptions: ProviderOptions = {
  audience: '',
  clientId: '3MVG91oqviqJKoEGK1XLbMkrVmBbc3G8Y3pY0sf4IBo3jimUuUdRnMJ.X3ELckx3IQZwOnQfS9S2_K8OFd7kk',
  redirectUri: Capacitor.isNativePlatform() ? 'msauth:/auth-action-complete' : 'http://localhost:8100/auth-action-complete',
  discoveryUrl: 'https://outsystems8-dev-ed.develop.my.salesforce.com/.well-known/openid-configuration',
  scope: 'openid profile email offline_access',
  logoutUrl: Capacitor.isNativePlatform() ? 'msauth:/auth-action-complete' : 'http://localhost:8100/home'
};

export const environment = {
  production: true,
  providerOptions
};
