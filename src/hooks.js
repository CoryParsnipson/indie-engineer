/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  let proto_header = event.request.headers.get('X-Forwarded-Proto');

  // redirect non https to https (ignore prerendering requests)
  if (event.url.host !== 'sveltekit-prerender' && (proto_header && proto_header !== 'https')) {
    let https_url = event.url.href.replace(/^(http)/, 'https');
    console.log(https_url);
    return Response.redirect(https_url, 301);
  }

  // else don't do anything to the request
  const response = await resolve(event);
  return response;
}
