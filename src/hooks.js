/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  let proto_header = event.request.headers.get('X-Forwarded-Proto');

  // redirect non https to https (ignore prerendering requests)
  if (event.url.host !== 'sveltekit-prerender' && (proto_header && proto_header !== 'https')) {
    console.log(event.url);
    let https_url = event.url.href.replace(/^(http:)/, 'https:');
    return Response.redirect(https_url, 308);
  }

  // else don't do anything to the request
  const response = await resolve(event);
  return response;
}
