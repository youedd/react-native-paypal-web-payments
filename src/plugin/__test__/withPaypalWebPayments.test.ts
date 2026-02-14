import { setOnNewIntent } from '../withPaypalWebPayments';
import pkg from 'react-native-paypal-web-payments/package.json';

describe('withPaypalWebPayments', () => {
  it('should add onNewIntent method to MainActivity', async () => {
    const content = `
    package com.example;


    class MainActivity : ReactActivity() {
    }
    `;

    const updatedContent = setOnNewIntent(content);

    expect(updatedContent).toContain(
      'override fun onNewIntent(intent: Intent)'
    );
    expect(updatedContent).toContain('import android.content.Intent');
  });

  it('should not duplicate import statement if already present', async () => {
    const content = `
    package com.example;
    import android.content.Intent;

    class MainActivity : ReactActivity() {
    }
    `;

    const updatedContent = setOnNewIntent(content);

    const importCount = (
      updatedContent.match(/import android.content.Intent/g) || []
    ).length;
    expect(importCount).toBe(1);
  });

  it('should throw an error if onNewIntent method already exists', async () => {
    const content = `
    package com.example;


    class MainActivity : ReactActivity() {

      override fun onNewIntent(newIntent: Intent) {
        super.onNewIntent(newIntent)
      }
    }
    `;

    expect(() => setOnNewIntent(content)).toThrow(
      `Unable to run ${pkg.name} plugin. Changes conflicts with current source code, please apply changes manually`
    );
  });
});
