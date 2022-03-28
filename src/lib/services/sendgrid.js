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

// get information about a sender identity
export async function viewSender({ id, on_behalf_of } = {}) {
  let res = await sendRequest({
    url: `/v3/senders/${id}`,
    method: 'GET',
    headers: {
      "on-behalf-of": on_behalf_of,
    },
  });

  return res.body;
}

// create a campaign to send to your specified mailing list
// NOTE: the "Create Campaign" endpoint is deprecated and not usable. The
// new terminology is "Create a Single Send" and has a completely different API
export async function createSingleSend({
  name,
  categories,
  send_at,
  list_id,
  subject,
  html_content,
  sender_id,
  suppression_group_id,
} = {}) {
  if (isNaN(parseInt(sender_id))) {
    throw "received invalid sender_id: '" + sender_id + "'";
  }

  if (isNaN(parseInt(suppression_group_id))) {
    throw "received invalid suppression_group_id: '" + suppression_group_id + "'";
  }

  let send_to = {
    list_ids: [list_id],
    all: false,
  };

  let email_config = {
    sender_id: parseInt(sender_id),
    subject,
    html_content,
    generate_plain_content: true,
    suppression_group_id: parseInt(suppression_group_id),
  };

  let data = {
    name: name,
    categories: categories,
    send_at: send_at,
    send_to: send_to,
    email_config: email_config,
  };

  let res = await sendRequest({
    url: `/v3/marketing/singlesends`,
    method: 'POST',
    body: data,
  });

  return res.body;
}

// send an existing SingleSend email (you must use createSingleSend with send_at undefined)
export async function scheduleSingleSend({ id, send_at = "now" }) {
  let res = await sendRequest({
    url: `/v3/marketing/singlesends/${id}/schedule`,
    method: 'PUT',
    body: {
      send_at: send_at,
    }
  });

  return res.body;
}

// send a single email to a single recipient
export function sendMail({ to, from, subject, text } = {}) {
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
