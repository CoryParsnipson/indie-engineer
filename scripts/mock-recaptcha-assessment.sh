#!/bin/bash
# This script is used to send a POST request to reCAPTCHA to request an
# assessment. The token must be provided by the user. You can get this from
# the reCAPTCHA widget.

# make everything relative to the script file location
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path"

# load environment variables
source ./../.env

API_KEY=${VITE_CAPTCHA_API_KEY}
SITE_KEY=${VITE_CAPTCHA_SITEKEY}
PROJECT_ID=${VITE_CAPTCHA_PROJECT_ID}

DATA=$( jq -n -c \
  --arg token $1 \
  --arg siteKey ${SITE_KEY} \
  --arg expectedAction "test" \
  '{ "event": { "token": $token, "siteKey": $siteKey, "expectedAction": $expectedAction } }')

curl -X POST -H "Content-Type: application/json; charset=utf-8" -d "${DATA}" https://recaptchaenterprise.googleapis.com/v1/projects/${PROJECT_ID}/assessments?key=${API_KEY}
