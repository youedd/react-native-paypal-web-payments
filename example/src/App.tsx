import { View, StyleSheet, Button } from 'react-native';
import {
  startCheckout,
  PaypalEnvironment,
  PayPalWebCheckoutFundingSource,
  PayPalCreditButton,
} from 'react-native-paypal-web-payments';

export default function App() {
  const clientID = '';
  const urlScheme = 'example-app';
  const orderID = '';

  return (
    <View style={styles.container}>
      <Button
        title="start"
        onPress={() => {
          startCheckout({
            clientID,
            urlScheme,
            orderID,
            environment: PaypalEnvironment.sandbox,
            fundingSource: PayPalWebCheckoutFundingSource.paypal,
            onEvent: (result) => {
              console.log(result);
            },
          });
        }}
      />
      <PayPalCreditButton
        clientID={clientID}
        orderID={orderID}
        urlScheme={urlScheme}
        environment={PaypalEnvironment.sandbox}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
