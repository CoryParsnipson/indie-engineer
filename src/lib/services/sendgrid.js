import sendgridMail from '@sendgrid/mail';
import sendgridClient from '@sendgrid/client';

import { env } from '$lib/util/env';

sendgridMail.setApiKey(env.var.VITE_SENDGRID_API_KEY);
sendgridClient.setApiKey(env.var.VITE_SENDGRID_API_KEY);

// send a request to the sendgrid API using the sendgridClient
function sendRequest({ url, method, data, headers, queryParams } = {}) {
  let request = {
    url: url,
    method: method,
    body: data,
    headers: headers,
    qs: queryParams,
  };

  return sendgridClient.request(request)
    .then(([response, body]) => {
      return { response, body };
    })
    .catch(error => {
      console.log(error);
    });
}

// get info on all mailing lists in the account
export async function getAllLists({ page_size, page_token } = {}) {
  let res = await sendRequest({
    url: `/v3/marketing/lists`,
    method: 'GET',
    qs: { page_size, page_token },
  });

  return res.body.result;
};

// send a single email to a single recipient
export function sendMail({ to, from = env.var.VITE_SENDGRID_SENDER, subject, text } = {}) {
  const msg = {
    to: to,
    from: from,
    subject: subject,
    text: text,
  };

  try {
    return sendgridMail.send(msg);
  } catch (error) {
    console.log(error);
  }
}
