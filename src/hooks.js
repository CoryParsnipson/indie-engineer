/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  let proto_header = event.request.headers.get('X-Forwarded-Proto');

  console.log(proto_header);
  console.log(event.url);

  // redirect non https to https
  if ((proto_header && proto_header !== 'https') || !event.url.href.startsWith('https')) {
    let https_url = event.url.href.replace(/^(http)/, 'https');
    console.log(https_url);
    return Response.redirect(https_url, 303);
  }

  // else don't do anything to the request
  const response = await resolve(event);
  console.log(response);
  return response;
}
