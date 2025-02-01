# react-native-paypal-web-payments

PayPal Web Payments native integration for React native and Expo.


## Installation

```sh
npm install react-native-paypal-web-payments
```

## Usage


```js
import {
  startCheckout,
  PaypalEnvironment,
  PayPalWebCheckoutFundingSource,
} from 'react-native-paypal-web-payments';

// ...

startCheckout({
  clientID: "client-id",
  environment: PaypalEnvironment.sandbox,
  urlScheme: "url-scheme",
  orderID: "order-id",
  fundingSource: PayPalWebCheckoutFundingSource.paypal,
  onEvent: (result) => {
    console.log(result);
  },
});
```


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
