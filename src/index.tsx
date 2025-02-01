import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-paypal-web-payments' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const PaypalWebPaymentsModule = isTurboModuleEnabled
  ? require('./NativePaypalWebPayments').default
  : NativeModules.PaypalWebPayments;

console.log(NativeModules.PaypalWebPayments);

const PaypalWebPayments = PaypalWebPaymentsModule
  ? PaypalWebPaymentsModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

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

export type PayPalWebCheckoutConfig = {
  clientID: string;
  environment: PaypalEnvironment;
  orderID: string;
  urlScheme: string;
  fundingSource?: PayPalWebCheckoutFundingSource;
  onEvent?: (result: PayPalWebCheckoutEvent) => void;
};

export const startCheckout = (config: PayPalWebCheckoutConfig) => {
  PaypalWebPayments.startCheckout(
    config.clientID,
    config.environment,
    config.urlScheme,
    config.orderID,
    config.fundingSource,
    (args: any) => {
      config.onEvent && config.onEvent(args);
    }
  );
};
