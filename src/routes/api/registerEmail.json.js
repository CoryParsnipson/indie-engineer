import { env } from '$lib/util/env';
import { addContact, getListContactCount, getListById } from '$lib/services/sendgrid';

let SENDGRID_MAX_CONTACTS = 10 || env.var.VITE_SENDGRID_MAX_CONTACTS;

export async function post({ request }) {
  try {
    let javascript_enabled = true;
    let request2 = request.clone();
    let data = {};
    try {
      data = await request.json();
    } catch (error) {
      if (error instanceof SyntaxError) {
        let fd = await request2.formData();
        for (let pair of fd.entries()) {
          data[pair[0]] = pair[1];
        }

        javascript_enabled = false;
      } else {
        throw error;
      }
    }

    if (data.submit_id != '') {
      console.log("Ignoring submission.");

      return {
        status: 403,
        body: {
          error: "Invalid form data.",
        },
      };
    }

    // since we don't have captcha (and this endpoint should only be used for 'dev'
    // do not add contact to list if the list is larger than VITE_SENDGRID_MAX_CONTACTS)
    let list_size = await getListContactCount({ id: env.var.VITE_SENDGRID_LIST_ID });

    if (list_size >= SENDGRID_MAX_CONTACTS) {
      console.log("POST to /api/registerEmail.json endpoint failed - there are too many contacts in the dev list");
      return {
        status: 403,
        body: {
          error: "Could not add contact to mailing list: the contact list is full.",
        },
      };
    }

    // add to sendgrid list
    let result = await addContact({
      contacts: [{ email: data.email }],
      list_ids: [env.var.VITE_SENDGRID_LIST_ID.toString()]
    });

    if (!javascript_enabled) {
      let referer = request.headers.get('referer').split('?')[0];

      let sp = new URLSearchParams();
      if (result.response.statusCode == 202) {
        sp.append('success', 'true');
      } else {
        result.response.body.errors.forEach(e => {
          let key_tokens = e.field.split('.');
          let key = key_tokens[key_tokens.length - 1];

          sp.append(key, e.message);
        });
      }

      return {
        headers: { Location: referer + "?" + sp.toString() + "#mailform" },
        status: 302,
        body: result.body,
      }
    }

    return {
      status: result.response.statusCode,
      body: result.body,
    };
  } catch (error) {
    console.error(error);
  }
}
