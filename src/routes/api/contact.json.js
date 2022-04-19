import { env } from '$lib/util/env';
import { viewSender, sendMail } from '$lib/services/sendgrid';

export async function post({ request }) {
  try {
    let data = await request.json();
 
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

    // send a single mail
    let response = await sendMail({
      to: contact_email,
      from: contact_email, // from must be from verified sender
      subject: subject,
      text: email_body,
    });

    console.log("Contact email sent:");
    console.log(response);

    return {
      status: response.statusCode,
      body: response.body ? response.body : '{}',
    };
  } catch (error) {
    console.error(error);
  }
}
