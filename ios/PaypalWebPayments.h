
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNPaypalWebPaymentsSpec.h"

@interface PaypalWebPayments : NSObject <NativePaypalWebPaymentsSpec>
#else
#import <React/RCTBridgeModule.h>

@interface PaypalWebPayments : NSObject <RCTBridgeModule>
#endif

@end
