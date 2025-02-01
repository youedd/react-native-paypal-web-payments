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

## Android
Add `onNewIntent` to the MainActivity in your app:

```kt

import android.content.Intent
// ...

class MainActivity : ReactActivity() {

  // ...
  
  override fun onNewIntent(newIntent: Intent?) {
    super.onNewIntent(newIntent)
    intent = newIntent
  }
```

Update your app's AndroidManifest.xml with your custom URL scheme in the intent-filter

```xml
 <activity
  android:name=".MainActivity"
  ...>
  ...
  <intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <data android:scheme="custom-url-scheme" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
  </intent-filter>
</activity>
```



## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
