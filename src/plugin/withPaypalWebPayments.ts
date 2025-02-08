import {
  withMainActivity,
  createRunOncePlugin,
  type ConfigPlugin,
} from '@expo/config-plugins';
import pkg from 'react-native-paypal-web-payments/package.json';

export const setOnNewIntent = (mainActivity: string) => {
  if (mainActivity.includes('onNewIntent')) {
    throw `Unable to run ${pkg.name} plugin. Changes conflicts with current source code, please apply changes manually`;
  }
  let result = mainActivity;
  const methodCode = `
  override fun onNewIntent(newIntent: Intent) {
      super.onNewIntent(newIntent)
      intent = newIntent
  }`;

  // Ensure the necessary import is present
  if (!result.includes('import android.content.Intent')) {
    result = result.replace(
      /package .*?\n/,
      (match) => `${match}import android.content.Intent\n`
    );
  }

  result = result.replace(
    'class MainActivity : ReactActivity() {',
    `class MainActivity : ReactActivity() {${methodCode}`
  );

  return result;
};

const withPaypalWebPayments: ConfigPlugin = (conf) => {
  return withMainActivity(conf, (config) => {
    config.modResults.contents = setOnNewIntent(config.modResults.contents);
    return config;
  });
};

export default createRunOncePlugin(
  withPaypalWebPayments,
  pkg.name,
  pkg.version
);
