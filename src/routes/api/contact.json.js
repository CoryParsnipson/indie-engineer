import { env } from '$lib/util/env';
import { validate_email } from '$lib/util/string';
import { viewSender, sendMail } from '$lib/services/sendgrid';

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
 
    // ignore requests that have honeypot set (bot spammer)
    if (data.honeypot != '') {
      console.log("honeypot field is set. Ignoring submission.");

      return {
        status: 403,
        body: {
          error: "Honeypot is set. Ignoring.",
        },
      };
    }

    let subject = "[Contact Form Submission from Indie Engineer (" + env.var.VITE_INSTANCE + ")]";
    if (data.subject) {
      subject = subject + " " + data.subject;
    }

    let getSenderRequest = await viewSender({ id: env.var.VITE_SENDGRID_SENDER_ID});
    if (getSenderRequest.response.statusCode !== 200) {
      return {
        status: getSenderRequest.response.statusCode,
        body: getSenderRequest.body.errors,
      }
    }

    if (getSenderRequest.body.results.length < 1) {
      return {
        status: 404,
        body: {
          message: "Could not find any matching verified senders.",
        },
      }
    }

    let contact_email = getSenderRequest.body.results[0].from_email;
    let email_body = data.name + " (" + data.email + ") sent a contact inquiry:\n\n" + data.message;

    // backend validation
    let body = { errors: {} };
    if (!javascript_enabled) {
      if (!data.email || !validate_email(data.email)) {
        body.errors['email'] = "Invalid email '" + data.email + "'";
      }

      if (!data.message) {
        body.errors['message'] = "Message cannot be empty.";
      }
    }

    // send a single mail
    let response = await sendMail({
      to: contact_email,
      from: contact_email, // from must be from verified sender
      subject: subject,
      text: email_body,
    });

    console.log("Contact email sent:");
    console.log(response);

    if (!javascript_enabled) {
      let response_body = response.body ? JSON.parse(response.body) : {};
      response_body.errors = { ...response_body.errors, ...body.errors };
      body = response_body;

      let referer = request.headers.get('referer').split('?')[0];

      let sp = new URLSearchParams();
      if (!body.errors || Object.entries(body.errors).length == 0) {
        sp.append('success', 'true');
      } else {
        Object.entries(body.errors).forEach(pair => {
          sp.append(pair[0], pair[1]);
        });
      }

      return {
        headers: { Location: referer + "?" + sp.toString() + "#contactform" },
        status: 302,
        body: body,
      }
    }

    return {
      status: response.statusCode,
      body: response.body ? response.body : '{}',
    };
  } catch (error) {
    console.error(error);
  }
}
