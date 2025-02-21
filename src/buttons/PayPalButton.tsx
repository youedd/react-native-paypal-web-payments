import {
  PayPalButton as BasePayPalButton,
  type PayPalButtonProps as BasePayPalButtonProps,
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

export interface PayPalButtonProps extends BasePayPalButtonProps {
  clientID: string;
  orderID: string;
  urlScheme: string;
  environment: PaypalEnvironment;
  onSuccess?: (event: PayPalWebCheckoutSuccessEvent) => void;
  onError?: (event: PayPalWebCheckoutErrorEvent) => void;
  onCancel?: (event: PayPalWebCheckoutCancelEvent) => void;
}

export const PayPalButton = ({
  clientID,
  orderID,
  urlScheme,
  environment,
  onSuccess,
  onError,
  onCancel,
  ...props
}: PayPalButtonProps) => {
  const handlePress = useCallback(() => {
    startCheckout({
      clientID,
      orderID,
      urlScheme,
      fundingSource: PayPalWebCheckoutFundingSource.paypal,
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

  return <BasePayPalButton onPress={handlePress} {...props} />;
};
