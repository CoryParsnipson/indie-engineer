#!/bin/bash
# This script is used to test heroku webhook functionality. This creates a fake
# webhook event that the endpoint will authenticate and respond to.

# make everything relative to the script file location
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path"

# load environment variables
source ./../.env

# change this to whichever oid you want; must be in heroku repo
COMMIT=b98450368e1ff4760d9856f479d9c266afe4b200

DATA=$( jq -n -c \
  --arg commit ${COMMIT} \
  '{"action": "update", "resource": "build", "data": { "status": "succeeded" }, "slug": { "commit": $commit } }')

HASH=$( echo -n ${DATA} | openssl dgst -binary -sha256 -hmac "${VITE_API_SECRET}" | openssl enc -base64 -A)

curl -sS -X POST -H "Heroku-Webhook-Hmac-SHA256: ${HASH}" -d "${DATA}" http://localhost:3000/api/sendEmail.json
