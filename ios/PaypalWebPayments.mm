#import "PaypalWebPayments.h"

#if __has_include("react_native_paypal_web_payments-Swift.h")
#import "react_native_paypal_web_payments-Swift.h"
#else
#import <react_native_paypal_web_payments/react_native_paypal_web_payments-Swift.h>
#endif

@implementation PaypalWebPayments
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(startCheckout:(NSString *)clientID
                  environment:(NSString *)environment
                  urlScheme:(NSString *)urlScheme
                  orderID:(NSString *)orderID
                  fundingSource:(NSString *)fundingSource
                  onEvent:(RCTResponseSenderBlock)onEvent {
      [PaypalWebPaymentsModule
         startCheckoutWithClientID:clientID
         environment:environment
         urlScheme:urlScheme
         orderID:orderID
         fundingSource:fundingSource
         onEvent:onEvent];
});

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativePaypalWebPaymentsSpecJSI>(params);
}
#endif

@end
