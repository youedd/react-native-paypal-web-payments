import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  startCheckout(
    clientID: string,
    environment: string,
    urlScheme: string,
    orderID: string,
    fundingSource?: string,
    onEvent?: (result: unknown) => void
  ): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('PaypalWebPayments');
