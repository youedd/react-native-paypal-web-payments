#!/bin/bash

set -a

cd $(dirname $0)

source ../.env
node createOrder.mjs