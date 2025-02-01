package com.paypalwebpayments

import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.Promise

abstract class PaypalWebPaymentsSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {

  abstract fun startCheckout(
    clientID: String,
    environment: String,
    urlScheme: String,
    orderID: String,
    fundingSource: String?,
    onEvent: Callback?
  )
}
