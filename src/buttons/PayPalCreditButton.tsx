import {
  PayPalCreditButton as BasePayPalCreditButton,
  type PayPalCreditButtonProps as BasePayPalCreditButtonProps,
} from 'react-native-paypal-buttons';
import {
  PaypalEnvironment,
  PayPalWebCheckoutFundingSource,
  startCheckout,
  type PayPalWebCheckoutCancelEvent,
  type PayPalWebCheckoutErrorEvent,
  type PayPalWebCheckoutSuccessEvent,
} from '../module';
import { useCallback } from 'react';

export interface PayPalCreditButtonProps extends BasePayPalCreditButtonProps {
  clientID: string;
  orderID: string;
  urlScheme: string;
  environment: PaypalEnvironment;
  onSuccess?: (event: PayPalWebCheckoutSuccessEvent) => void;
  onError?: (event: PayPalWebCheckoutErrorEvent) => void;
  onCancel?: (event: PayPalWebCheckoutCancelEvent) => void;
}

export const PayPalCreditButton = ({
  clientID,
  orderID,
  urlScheme,
  environment,
  onSuccess,
  onError,
  onCancel,
  ...props
}: PayPalCreditButtonProps) => {
  const handlePress = useCallback(() => {
    startCheckout({
      clientID,
      orderID,
      urlScheme,
      fundingSource: PayPalWebCheckoutFundingSource.paypalCredit,
      environment,
      onEvent: (event) => {
        switch (event.type) {
          case 'success':
            return onSuccess?.(event);
          case 'error':
            return onError?.(event);
          case 'cancel':
            return onCancel?.(event);
        }
      },
    });
  }, [clientID, orderID, urlScheme, environment, onSuccess, onError, onCancel]);

  return <BasePayPalCreditButton onPress={handlePress} {...props} />;
};
