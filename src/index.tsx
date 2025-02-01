import PaypalWebPayments, {
  PaypalEnvironment,
  PayPalWebCheckoutFundingSource,
  type PayPalWebCheckoutEvent,
} from './NativePaypalWebPayments';

type PayPalWebCheckoutConfig = {
  clientID: string;
  environment: PaypalEnvironment;
  orderID: string;
  urlScheme: string;
  fundingSource?: PayPalWebCheckoutFundingSource;
  onEvent?: (result: PayPalWebCheckoutEvent) => void;
};

export {
  PaypalEnvironment,
  PayPalWebCheckoutFundingSource,
} from './NativePaypalWebPayments';

export const startCheckout = (config: PayPalWebCheckoutConfig) => {
  PaypalWebPayments.startCheckout(
    config.clientID,
    config.environment,
    config.urlScheme,
    config.orderID,
    config.fundingSource,
    (args) => {
      config.onEvent && config.onEvent(args);
    }
  );
};
