import { View, StyleSheet } from 'react-native';
import {
  startCheckout,
  PaypalEnvironment,
  PayPalWebCheckoutFundingSource,
} from 'react-native-paypal-web-payments';
import { PayPalButton } from 'react-native-paypal-buttons';

export default function App() {
  const clientID = '';
  const urlScheme = 'example-app';
  const orderID = '';

  return (
    <View style={styles.container}>
      <PayPalButton
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    justifyContent: 'center',
  },
});
