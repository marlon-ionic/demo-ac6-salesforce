import { inject, Injectable, NgZone } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { BiometricPermissionState, BrowserVault, Device, DeviceSecurityType, IdentityVaultConfig, Vault, VaultError, VaultType } from '@ionic-enterprise/identity-vault';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VaultService {
  private readonly zone = inject(NgZone);
  private readonly vault: BrowserVault | Vault;
  private readonly vaultErrorSubject = new Subject<VaultError>();
  private readonly vaulLockSubject = new ReplaySubject<VaultLockState>(1);

  constructor() {
    this.vault = Capacitor.isNativePlatform() ? new Vault() : new BrowserVault();
  }

  vaultError$ = this.vaultErrorSubject.asObservable();
  vaultLock$ = this.vaulLockSubject.asObservable();

  async init() {
    const biometricsSupported = await Device.isBiometricsSupported();
    const vaultConfig: IdentityVaultConfig = {
      type: VaultType.InMemory,
      key: 'io.ionic.demo-ac6-vault',
      deviceSecurityType: DeviceSecurityType.None,
      shouldClearVaultAfterTooManyFailedAttempts: true
    };
    if(biometricsSupported) {
      const permissions = await Device.isBiometricsAllowed();
      if (permissions === BiometricPermissionState.Denied) {
        // Prompt user that Biometrics are disabled?
        } else {
          vaultConfig.deviceSecurityType = DeviceSecurityType.Both;
          vaultConfig.type = VaultType.DeviceSecurity;
        }
    }
    this.vault.onLock((lockEvent) => {
      this.zone.run(() => {
        this.vaulLockSubject.next({ isLocked: true, timeout: lockEvent.timeout });
      });
    });
    this.vault.onUnlock(() => {
      this.zone.run(() => {
        this.vaulLockSubject.next({ isLocked: false });
      });
    });
    this.vault.onError((error) => {
      this.zone.run(() => {
        this.vaultErrorSubject.next(error);
      });
    });
    await this.vault.initialize(vaultConfig);

    const isLocked = await this.vault.isLocked();
    this.vaulLockSubject.next({ isLocked });
  }
  async clear() {
    await this.vault.clear();
  }

  async lock() {
    await this.vault.lock();
  }
  async unlock() {
    await this.vault.unlock();
  }
  async set<T>(key: string, value: T) {
    await this.vault.setValue(key, value);
  }
  async get<T>(key: string): Promise<T|null> {
    return await this.vault.getValue(key);
  }

}

export interface VaultLockState {
  isLocked: boolean;
  timeout?: boolean;
}
