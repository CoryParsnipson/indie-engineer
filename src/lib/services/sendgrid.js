import sendgridMail from '@sendgrid/mail';

import { env } from '$lib/util/env';

sendgridMail.setApiKey(env.var.VITE_SENDGRID_API_KEY);

export function sendMail({ to, from = env.var.VITE_EMAIL_SENDER, subject, text } = {}) {
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
