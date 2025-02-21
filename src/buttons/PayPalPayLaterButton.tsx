import {
  PayPalPayLaterButton as BasePayPalPayLaterButton,
  type PayPalPayLaterButtonProps as BasePayPalPayLaterButtonProps,
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

export interface PayPalPayLaterButtonProps
  extends BasePayPalPayLaterButtonProps {
  clientID: string;
  orderID: string;
  urlScheme: string;
  environment: PaypalEnvironment;
  onSuccess?: (event: PayPalWebCheckoutSuccessEvent) => void;
  onError?: (event: PayPalWebCheckoutErrorEvent) => void;
  onCancel?: (event: PayPalWebCheckoutCancelEvent) => void;
}

export const PayPalPayLaterButton = ({
  clientID,
  orderID,
  urlScheme,
  environment,
  onSuccess,
  onError,
  onCancel,
  ...props
}: PayPalPayLaterButtonProps) => {
  const handlePress = useCallback(() => {
    startCheckout({
      clientID,
      orderID,
      urlScheme,
      fundingSource: PayPalWebCheckoutFundingSource.paylater,
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

  return <BasePayPalPayLaterButton onPress={handlePress} {...props} />;
};
