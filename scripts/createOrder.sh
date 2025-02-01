#!/bin/bash

set -a

cd $(dirname $0)

source ../.env

echo $PAYPAL_CLIENT_ID

node createOrder.mjs