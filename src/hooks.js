/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  let proto_header = event.request.headers.get('X-Forwarded-Proto');

  // redirect non https to https
  if ((proto_header && proto_header !== 'https')) {
    let https_url = event.url.href.replace(/^(http)/, 'https');
    return Response.redirect(https_url, 303);
  }

  // else don't do anything to the request
  const response = await resolve(event);
  return response;
}
