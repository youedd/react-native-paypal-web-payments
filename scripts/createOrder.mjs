const { PAYPAL_CLIENT_ID, PAYPAL_SECRET_KEY } = process.env;

const generateToken = async () => {
  const result = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET_KEY}`)
    },
    body: new URLSearchParams({
      'grant_type': 'client_credentials'
    })
  });

  const response = await result.json()
  return response.access_token
}

const createOrderPayload = () => {
  const currencyCode = 'EUR'
  const isShippingRequired = true
  const taxes = 0
  const countryCode = 'FR'
  const address = {
    address1: '166 avenue de la resistance',
    zip: '92350',
    city: 'Le plessis robinson',
    country: 'France',
  }
  const cart = {
    totals: {
      total: 100,
      subtotal: 100,
      shipping: 10,
    },
    billingAddress: address,
    shippingAddress: address,
    lineItems: [
      {
        quantity: 2,
        total: 100,
        cartItem: {
          title: 'item 1',
          subtitle: 'item description 1',
        }
      }
    ],
    lineRewards: [
      {
        cartItem: {
          title: 'reward 1',
          subtitle: 'reward description 1',
        }
      }
    ]
  }

  return {
    applicationContext: {
      brandName: "Typology Paris",
      shippingPreference: isShippingRequired
        ? "SET_PROVIDED_ADDRESS"
        : "NO_SHIPPING",
      userAction: "PAY_NOW",
      locale: "fr-FR",
    },
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          value: cart.totals.total.toFixed(2),
          currency_code: currencyCode,
          breakdown: {
            item_total: {
              currency_code: currencyCode,
              value: cart.totals.subtotal.toFixed(2),
            },
            shipping: {
              currency_code: currencyCode,
              value: cart.totals.shipping.toFixed(2),
            },
            discount: {
              currency_code: currencyCode,
              value: (
                taxes +
                cart.totals.subtotal +
                cart.totals.shipping -
                cart.totals.total
              ).toFixed(2),
            },
            tax_total: {
              value: taxes.toFixed(2),
              currency_code: currencyCode,
            },
          },
        },
        shipping: {
          address: {
            country_code: countryCode,
            address_line_1: cart.shippingAddress?.address1,
            address_line_2: cart.shippingAddress?.address2 ?? undefined,
            admin_area_1: cart.shippingAddress?.city,
            admin_area_2: cart.shippingAddress?.country,
            postal_code: cart.shippingAddress?.zip,
          },
        },
        items: [
          ...cart.lineItems.map((item) => {
            return {
              name: item.cartItem.title,
              item_description: item.cartItem.subtitle,
              quantity: item.quantity.toString(),
              unit_amount: {
                currency_code: currencyCode,
                value: (item.total / item.quantity).toFixed(2),
              },
            };
          }),
          ...cart.lineRewards
            .filter((item) => !item.rejectedByCustomer && !item.onHold)
            .map((item) => {
              return {
                name: item.cartItem.title,
                item_description: item.cartItem.subtitle,
                quantity: "1",
                unit_amount: {
                  currency_code: currencyCode,
                  value: (0).toFixed(2),
                },
              };
            }),
        ],
      },
    ],
  }
}

const createOrder = async () => {
  const result = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await generateToken()}`
    },
    body: JSON.stringify(createOrderPayload())
  });
  const response = await result.json()

  return response.id
}

console.log(await (createOrder()))