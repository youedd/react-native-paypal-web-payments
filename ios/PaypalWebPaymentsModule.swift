//
//  PaypalWebPaymentsModule.swift
//  react-native-paypal-web-payments
//
//  Created by Youssef  on 17/01/2025.
//

import Foundation
import PayPal


@objc public class PaypalWebPaymentsModule : NSObject {
  private static var delegate : CheckoutDelegate?;
  
  @objc public static func startCheckout(
                      clientID: String,
                      environment: String,
                      urlScheme: String,
                      orderID: String,
                      fundingSource: String,
                      onEvent: @escaping ([Any]) -> Void) {
                        
    let config = CoreConfig(
      clientID: clientID,
      environment: try! environment.toEnvironment()
    )

    let webClient = PayPalWebCheckoutClient(config: config)
    let payPalWebRequest = PayPalWebCheckoutRequest(
      orderID: orderID,
      fundingSource: try! fundingSource.toFundingSource()
    )
                        
    if (self.delegate == nil) {
      self.delegate = CheckoutDelegate()
    }
                        
    self.delegate?.setHandler(onEvent: onEvent);

    webClient.delegate = delegate;
    webClient.start(request: payPalWebRequest)
    
  }
}

class CheckoutDelegate : PayPalWebCheckoutDelegate {
  
  var onEvent:  (([Any]) -> Void)?
  
  public func setHandler (
    onEvent: @escaping ([Any]) -> Void
  ) {
    self.onEvent = onEvent
  }
  
  public func payPal(_ payPalClient: PayPal.PayPalWebCheckoutClient, didFinishWithResult result: PayPal.PayPalWebCheckoutResult) {
    self.onEvent?([[
      "type": "success",
      "orderID": result.orderID,
      "payerID": result.payerID
    ]]);
  }
  
  public func payPal(_ payPalClient: PayPal.PayPalWebCheckoutClient, didFinishWithError error: PayPal.CoreSDKError) {
    self.onEvent?([[
      "type": "error",
      "code": error.code as Any,
      "domain": error.domain as Any,
      "errorDescription": error.errorDescription as Any
    ]]);
  }
  
  public func payPalDidCancel(_ payPalClient: PayPal.PayPalWebCheckoutClient) {
    self.onEvent?([[
      "type": "cancel"
    ]]);
  }
}

enum PaypalWebPaymentsError : Error {
  case invalidEnvironment
  case invalidFundingSource
}

extension String {
  func toFundingSource() throws -> PayPalWebCheckoutFundingSource  {
    switch(self) {
      case "paypal": return .paypal
      case "paylater": return .paylater
      case "paypalCredit": return .paypalCredit
      default:
        throw PaypalWebPaymentsError.invalidFundingSource
    }
  }
  
  func toEnvironment() throws -> Environment {
    switch(self) {
      case "sandbox": return .sandbox
      case "live": return .live
      default:
        throw PaypalWebPaymentsError.invalidEnvironment
    }
  }
}
