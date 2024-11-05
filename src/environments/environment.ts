// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

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
  production: false,
  providerOptions
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
