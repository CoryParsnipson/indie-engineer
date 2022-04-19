import { env } from '$lib/util/env';
import { addContact, getListContactCount, getListById } from '$lib/services/sendgrid';

let SENDGRID_MAX_CONTACTS = 10 || env.var.VITE_SENDGRID_MAX_CONTACTS;

export async function post({ request }) {
  try {
    let data = await request.json();

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

    return {
      status: result.response.statusCode,
      body: result.body,
    };
  } catch (error) {
    console.error(error);
  }
}
