import { AuthConnectConfig, AzureProvider, Manifest, ProviderOptions } from '@ionic-enterprise/auth';

export class SalesforceProvider extends AzureProvider {
  // Override the tokenRequest method to remove `scope` from the payload
  // Salesforce does not support the scope parameter in the token request and will return an error if it is included
  override async tokenRequest(
    manifest: Manifest,
    options: ProviderOptions,
    config: Pick<
      AuthConnectConfig,
      'ios' | 'android' | 'web' | 'platform' | 'logLevel'
    >
  ) {
    const result = await super.tokenRequest(manifest, options, config);
    if(result.payload?.['scope'] !== undefined && result.payload?.['scope'] !== null) {
     delete result.payload['scope'];
    }
    return result;
  }
}
