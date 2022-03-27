import sendgridMail from '@sendgrid/mail';
import sendgridClient from '@sendgrid/client';

import { env } from '$lib/util/env';

sendgridMail.setApiKey(env.var.VITE_SENDGRID_API_KEY);
sendgridClient.setApiKey(env.var.VITE_SENDGRID_API_KEY);

// send a request to the sendgrid API using the sendgridClient
function sendRequest({ url, method, body, headers, queryParams } = {}) {
  let request = {
    url: url,
    method: method,
    body: body,
    headers: headers,
    qs: queryParams,
  };

  return sendgridClient.request(request)
    .then(([response, body]) => {
      return { response, body };
    })
    .catch(error => {
      console.error(JSON.stringify(error, null, 4));
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

// get a single list by ID
export async function getListById({ id, contact_sample } = {}) {
  let res = await sendRequest({
    url: `/v3/marketing/lists/${id}`,
    method: 'GET',
    qs: { contact_sample },
  });

  return res.body;
}

// get a single list's contact count
export async function getListContactCount({ id } = {}) {
  let res = await sendRequest({
    url: `/v3/marketing/lists/${id}/contacts/count`,
    method: 'GET',
  });

  return res.body.contact_count;
}

// add contacts to a list (if the contact already exists, it will be updated)
export async function addContact({ contacts = [], list_ids = [] } = {}) {
  try {
    let res = await sendRequest({
      url: `/v3/marketing/contacts`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        contacts: contacts,
        list_ids: list_ids,
      },
    });

    // note: add contact is asynchronous. If it returns status code 202, that means
    // the contacts were successfully queued, but aren't successfully added to the list yet.
    // You can check the status with importContactsStatus() but it takes a really long time
    // to complete (on the order of minutes). Looks like sendgrid doesn't want you to make
    // your own sign up forms.
    return res;
  } catch (error) {
    console.error(error);
  }
}

// check on the status of a contact add or import
export async function importContactsStatus({ id } = {}) {
  let res = await sendRequest({
    url: `/v3/marketing/contacts/imports/${id}`,
    method: 'GET',
  });

  return res.body;
}

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
    console.error(error);
  }
}
