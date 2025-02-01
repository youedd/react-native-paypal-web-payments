import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export enum PaypalEnvironment {
  sandbox = 'sandbox',
  live = 'live',
}

export enum PayPalWebCheckoutFundingSource {
  paypalCredit = 'paypalCredit',
  paylater = 'paylater',
  paypal = 'paypal',
}

export type PayPalWebCheckoutSuccessEvent = {
  type: 'success';
  orderID: string;
  payerID: string;
};

export type PayPalWebCheckoutErrorEvent = {
  type: 'error';
  code: number | null | undefined;
  domain: string | null | undefined;
  errorDescription: string | null | undefined;
};

export type PayPalWebCheckoutCancelEvent = {
  type: 'cancel';
};

export type PayPalWebCheckoutEvent =
  | PayPalWebCheckoutSuccessEvent
  | PayPalWebCheckoutErrorEvent
  | PayPalWebCheckoutCancelEvent;

export interface Spec extends TurboModule {
  startCheckout(
    clientID: string,
    environment: PaypalEnvironment,
    urlScheme: string,
    orderID: string,
    fundingSource?: PayPalWebCheckoutFundingSource,
    onEvent?: (result: PayPalWebCheckoutEvent) => void
  ): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('PaypalWebPayments');
