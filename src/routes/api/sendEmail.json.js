import { checkForNewBlogPost } from '$lib/util/git';
import { verify_request } from '$lib/util/auth';

export async function post({ request, url, params }) {
  try {
    let data = await request.json();

    if (!verify_request(data, request.headers.get('Heroku-Webhook-Hmac-SHA256'))) {
      console.log("POST to /api/sendEmail.json endpoint failed authorization!");
      return { status: 403 };
    }
    console.log("Successfully authenticated webhook post.");

    // only respond to api:build update events that succeed
    if (!(data?.resource === "build" && data?.action === "update" && data?.data?.status === "succeeded")) {
      console.log("Ignoring webhook POST for releases that aren't successful builds.");
      return { status: 200 };
    }

    let newBlogPost = await checkForNewBlogPost(data?.slug?.commit);
    if (newBlogPost) {
      console.log("New blog post detected: " + newBlogPost);

      // TODO: implement endpoint business logic
    }

    return {
      status: 204,
      data: "",
    };
  } catch (error) {
    console.error(error);
  }
}
