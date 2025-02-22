# react-native-paypal-web-payments

PayPal Web Payments native integration for React native and Expo.

<img src="./preview.gif" alt="Preview" width="300" />

## Table of Contents
- [Installation](#installation)
  - [Setup](#setup)
- [Usage](#usage)
  - [Buttons](#buttons)
  - [startCheckout](#startcheckout)
- [Contributing](#contributing)
- [License](#license)

## Installation

```sh
npm install react-native-paypal-web-payments
```

### Setup

<details>
<summary>Bare React Native</summary>

1. Update `react-native.config.js`
    ````
    ...
      assets: [
        "./node_modules/react-native-paypal-buttons/src/assets/fonts"
      ]
    ````
2. Run command 
    ````
    npx react-native-asset
    ````

3. Add `onNewIntent` to the MainActivity in your app:
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

4. Update your app's AndroidManifest.xml with your custom URL scheme in the intent-filter
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
</details>

<details>
<summary>Expo</summary>

1. Install the `expo-font` package:
    ```sh
    expo install expo-font
    ```
2. Update expo config
    ```tsx
    {
      "expo": {
        "scheme": "custom-url-scheme",
        "plugins": [
          "react-native-paypal-web-payments",
          [
            "expo-font",
            {
              "fonts": ["./node_modules/react-native-paypal-buttons/src/assets/fonts/PayPalOpen-Regular.otf"]
            }
          ]
        ]
      }
    }
    ```

</details>


## Usage

### Buttons

```js
import { PayPalButton, PaypalEnvironment } from 'react-native-paypal-web-payments';

// ...

<PayPalButton
  clientID="client-id"
  orderID="order-id"
  urlScheme="url-scheme"
  environment={PaypalEnvironment.sandbox}
  onSuccess={(data) => {
    console.log(data)
  }}
/>
```

### startCheckout

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
