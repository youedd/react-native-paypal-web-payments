package com.paypalwebpayments

import androidx.fragment.app.FragmentActivity
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import com.paypal.android.corepayments.CoreConfig
import com.paypal.android.corepayments.Environment
import com.paypal.android.corepayments.PayPalSDKError
import com.paypal.android.paypalwebpayments.PayPalWebCheckoutClient
import com.paypal.android.paypalwebpayments.PayPalWebCheckoutFundingSource
import com.paypal.android.paypalwebpayments.PayPalWebCheckoutListener
import com.paypal.android.paypalwebpayments.PayPalWebCheckoutRequest
import com.paypal.android.paypalwebpayments.PayPalWebCheckoutResult

class PaypalWebPaymentsModule internal constructor(context: ReactApplicationContext) :
  PaypalWebPaymentsSpec(context) {

  override fun getName(): String {
    return NAME
  }

  companion object {
    const val NAME = "PaypalWebPayments"
  }

  @ReactMethod
  override fun startCheckout(
    clientID: String,
    environment: String,
    urlScheme: String,
    orderID: String,
    fundingSource: String?,
    onEvent: Callback?
  ) {

    reactApplicationContext.currentActivity!!.runOnUiThread {
      val config = CoreConfig(
        clientID,
        environment.toEnvironment()
      )

      val payPalWebCheckoutClient = PayPalWebCheckoutClient(
        reactApplicationContext.currentActivity as FragmentActivity,
        config,
        urlScheme
      )

      payPalWebCheckoutClient.listener = object : PayPalWebCheckoutListener {
        override fun onPayPalWebSuccess(result: PayPalWebCheckoutResult) {
          val event: WritableMap = Arguments.createMap();
          event.putString("type", "success")
          event.putString("orderID", result.orderId)
          event.putString("payerID", result.payerId)
          onEvent?.invoke(event)
          payPalWebCheckoutClient.removeObservers()
        }
        override fun onPayPalWebFailure(error: PayPalSDKError) {
          val event: WritableMap = Arguments.createMap();
          event.putString("type", "error")
          event.putString("code", error.code.toString())
          event.putString("errorDescription", error.errorDescription)
          onEvent?.invoke(event)
          payPalWebCheckoutClient.removeObservers()
        }
        override fun onPayPalWebCanceled() {
          val event: WritableMap = Arguments.createMap();
          event.putString("type", "cancel")
          onEvent?.invoke(event)
          payPalWebCheckoutClient.removeObservers()
        }
      }

      val payPalWebCheckoutRequest = PayPalWebCheckoutRequest(
        orderID,
        fundingSource?.toPayPalWebCheckoutFundingSource() ?: PayPalWebCheckoutFundingSource.PAYPAL
      )

      payPalWebCheckoutClient.start(payPalWebCheckoutRequest)
    }
  }
}


fun String.toEnvironment(): Environment {
  return when(this) {
    "sandbox" -> Environment.SANDBOX
    "live" -> Environment.LIVE
    else -> throw IllegalArgumentException("Invalid Environment: $this")
  }
}

fun String.toPayPalWebCheckoutFundingSource() : PayPalWebCheckoutFundingSource {
  return when(this) {
    "paypalCredit" -> PayPalWebCheckoutFundingSource.PAYPAL_CREDIT
    "paylater" -> PayPalWebCheckoutFundingSource.PAY_LATER
    "paypal" -> PayPalWebCheckoutFundingSource.PAYPAL
    else -> throw IllegalArgumentException("Invalid PayPalWebCheckoutFundingSource: $this")
  }
}
