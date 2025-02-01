import { View, StyleSheet, Button } from 'react-native';
import { startCheckout } from 'react-native-paypal-web-payments';
import {
  PaypalEnvironment,
  PayPalWebCheckoutFundingSource,
} from '../../src/NativePaypalWebPayments';

export default function App() {
  return (
    <View style={styles.container}>
      <Button
        title="start"
        onPress={() => {
          startCheckout({
            clientID:
              'AT55yz0287Ab8XnDVh7eyS7n-NK72q1jxJi-aCrVu3mXDfUiJcGtqGdYKbLkBsu_wCcgugk5ONp8V4yP',
            environment: PaypalEnvironment.sandbox,
            urlScheme: 'example-app',
            orderID: '1D429762RU7439242',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
