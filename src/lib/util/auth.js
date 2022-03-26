import hmacSHA256 from 'crypto-js/hmac-sha256.js';
import Base64 from 'crypto-js/enc-base64.js';

import { env } from '$lib/util/env';

// cryptographic utilities
export const API_HEADER_AUTH = "API_HEADER_AUTH";

export function verify_request(data, providedHash) {
  let hmac = sign_string(env.var.VITE_API_SECRET, JSON.stringify(data));
  return (providedHash && hmac === providedHash);
}

export function sign_string(key, to_sign) {
  let hash = hmacSHA256(to_sign, key);
  return Base64.stringify(hash);
}
