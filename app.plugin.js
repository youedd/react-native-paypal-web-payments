const pkg = require('./package.json');
const {
  withMainActivity,
  createRunOncePlugin,
} = require('@expo/config-plugins');

const withOnNewIntent = (conf) => {
  return withMainActivity(conf, async (config) => {
    const methodCode = `
    override fun onNewIntent(newIntent: Intent) {
        super.onNewIntent(newIntent)
        intent = newIntent
    }`;

    // Ensure the necessary import is present
    if (!config.modResults.contents.includes('import android.content.Intent')) {
      config.modResults.contents = config.modResults.contents.replace(
        /package .*?\n/,
        (match) => `${match}import android.content.Intent\n`
      );
    }

    config.modResults.contents = config.modResults.contents.replace(
      'class MainActivity : ReactActivity() {',
      `class MainActivity : ReactActivity() {${methodCode}`
    );

    return config;
  });
};

const withPaypalWebPayments = (config) => {
  return withOnNewIntent(config);
};

module.exports = createRunOncePlugin(
  withPaypalWebPayments,
  pkg.name,
  pkg.version
);
