import { env } from '$lib/util/env';
import { writeBuildTagToRepo, checkForNewBlogPost } from '$lib/util/git';
import { verify_request } from '$lib/util/auth';
import { getFrontmatterFromMarkdown } from '$lib/util/markdown';
import { generateCampaignTitle, generateSubjectLine, generateHTMLContent, scheduleSingleSend, createSingleSend } from '$lib/services/sendgrid';

export async function post({ request, url, params }) {
  try {
    if (!env.var.VITE_HEROKU_WEBHOOK_ENABLE || env.var.VITE_HEROKU_WEBHOOK_ENABLE !== "true") {
      console.log("Heroku webhook response is disabled. Ignoring.");
      return { status: 200 };
    }

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

      let frontmatter = getFrontmatterFromMarkdown(newBlogPost);

      // send automated email with blog post info
      let campaign = await createSingleSend({
        name: generateCampaignTitle(frontmatter),
        categories: ["transactional", "blog", "new blog post" ],
        list_id: env.var.VITE_SENDGRID_LIST_ID,
        subject: generateSubjectLine(frontmatter),
        html_content: generateHTMLContent(url.origin, newBlogPost, frontmatter),
        suppression_group_id: env.var.VITE_SENDGRID_UNSUBSCRIBE_GROUP,
        sender_id: env.var.VITE_SENDGRID_SENDER_ID,
      });

      let send = await scheduleSingleSend({ id: campaign.id });
      console.log("Automated blog post notification email sent:");
      console.log(campaign);
      console.log(send);
    }

    // write a new build tag so we know when to start look on the next webhook run
    writeBuildTagToRepo();

    return {
      status: 204,
      data: "",
    };
  } catch (error) {
    console.error(error);
  }
}
