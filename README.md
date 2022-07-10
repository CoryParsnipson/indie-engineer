# Indie Engineer

This is a sveltekit + MDsveX blog.

## TODO

* set up redirect email from namecheap, use for contact and automatic new post notifications
  * verify this domain with sendgrid

* add links to next and prev posts. Also section for "posts you may also like"?

* csrf tokens for forms and api calls
* next gen images - (low res placeholder, multiple res, etc)
* add in tag manager events for share button clicks + subscribe clicks
* rate limiting api endpoints
* fix all high priority issues in SEO site checkup: https://seositecheckup.com

## Creating a svelte kit project

```bash
npm init svelte@next app

mv app indie-engineer
cd indie-engineer

npm install
npm run dev # or npm run dev:host

git init && git add -A && git commit -m "Initial commit"
```

## Adding tailwindcss and MDsveX

Do this before modifying the project.

```bash
npx svelte-add@latest tailwindcss --forms --typography

npm install
git add -A && git commit -m "Add tailwindcss"
```

```bash
npx svelte-add@latest mdsvex

npm install
git add -A && git commit -m "Add mdsvex"
```

## Deploy to Heroku [1]

1. Add a `start` command to `package.json`. Heroku runs this command in the deployment container.

```
{
  "name": "indie-engineer",
  // ...
  "scripts": {
    "start": "node build/index.js",
    // ...
  }
  // ...
}
```

1. Specify which node version to use.

```
  "engines": {
    "node": "16.x",
    "npm": "8.x"
  }
```

1. Change the adapter to use the node adapter.

```
npm install --save-dev @sveltejs/adapter-node@next
```

Swap out the adapter in `svelte.config.js`. This needs to be a node adapter and not a static adapter because we are handling POST requests in the webhook and email signup forms.

1. Add heroku remote to git repo

```
git remote add heroku <heroku git repo url>
```
## Set up Environment Variables and API keys

Vite uses .env and .env.\* files to load environment variables.

Required variables:

* VITE\_INSTANCE - set this to "dev" or "prod" ("dev" will expose debug functionality. Do NOT use this in production)
* VITE\_API\_SECRET - see [3]
* VITE\_SENDGRID\_API\_KEY - see [4]
* VITE\_SENDGRID\_SENDER\ID - set this to the sender you used in sendgrid. To get the "from" field, use the view sender API call (see [8]).
* VITE\_SENDGRID\_LIST\_ID - see [6]
* VITE\_SENDGRID\_UNSUBSCRIBE\_GROUP - link to group for users to unsubscribe from the list; see [9]
* VITE\_HEROKU\_WEBHOOK\_ENABLE - if not "true", exit the webhook function without doing anything (not even authentication)
* VITE\_HEROKU\_REPO - set the heroku repo (git remote show heroku)
* VITE\_HEROKU\_API\_TOKEN - retrieve your heroku api token (see [7])

Optional variables:

* VITE\_SENDGRID\_MAX\_CONTACTS - set this to change amount of people who can go in the sendgrid 'dev' mailing list. Defaults to 10.
* VITE\_GTM\_ENABLE - set this to true to enable the Google Tag Manager widget
* VITE\_GTM\_ID - if Google Tag Manager is enabled, this must be set to properly send data to the account
* VITE\_INDEX\_PAGINATION\_SIZE - set the page size for index blog post pagination (defaults to 10 if not present)

## Set up automated email hook

Use heroku app web hooks [3].

1. Create a new web hook using the tutorial. Use the api:build event. The payload url should use the sendEmail.json endpoint:

```
PayloadURL (https): https://indie-engineer-dev.herokuapp.com/api/sendEmail.json
```

1. Create a secret phrase to serve as the internal API key. [4] Put this in the .env file:

```
VITE_API_SECRET="<secret passphrase>"
```

Don't forget to copy this to the heroku app config vars.

1. Install sendgrid packages:

```
npm install @sendgrid/mail
npm install @sendgrid/client
```

Create a sendgrid api key and put it in the .env folder (see [4]). This requires a valid sendgrid account.

1. Modify tsconfig.js to allow for importing sendgrid ESM style. See [5].

1. Set the sendgrid mailing list ID for this website instance. For example, create a mailing list for the dev instance called "indie-engineer-dev". Add the ID of this list to the environment variables. Use [6] api call to get all existing list ids.

1. Create Unsubscribe groups

It's recommended to create 2--one for unsubscribing from automated blog post notifications and another called "All" for unsubscribing for all email. (When you do a single send, the associated suppression group you supply will filter out unsubscribed users from the provided list\_ids)

Then get the suppression group ID from the sendgrid dashboard and put it in the VITE\_SENDGRID\_UNSUBSCRIBE\_GROUP environment variable.

## Set up reCAPTCHA Enterprise (Requires GCP account)

1. Create a GCP account and make a GCP project. (I called mine "indie-engineer").

1. Enable the reCAPTCHA Enterprise API

1. Create a sitekey (See [10].) for a score based test. You need to make one key for dev and another for prod. For dev, add "localhost" and "indie-engineer-dev.herokuapp.com" to the domains. For prod, add "indieengineer.com".

1. Create a google cloud API key and restrict it to only allow it for reCAPTCHA Enterprise API. (See [11]).

1. Set these environment variables:

```
VITE_CAPTCHA_ENABLE=true
VITE_CAPTCHA_SITEKEY=\<sitekey from GCP dashboard\>
VITE_CAPTCHA_API_KEY=\<api key\>
VITE_CAPTCHA_PROJECT_ID=<gcp project id--e.g. 'indie-engineer'>
```

## References

1. <https://dev.to/nostro/deploying-to-heroku-with-sveltekit-3350>
1. <https://devcenter.heroku.com/articles/app-webhooks>
1. <https://www.worksighted.com/random-passphrase-generator/#passphrase-generator>
1. <https://app.sendgrid.com/guide/integrate/langs/nodejs>
1. <https://github.com/sendgrid/sendgrid-nodejs/issues/743>
1. <https://docs.sendgrid.com/api-reference/lists/get-all-lists>
1. <https://devcenter.heroku.com/articles/authentication>
1. <https://docs.sendgrid.com/api-reference/sender-identities-api/view-a-sender-identity>
1. <https://docs.sendgrid.com/ui/sending-email/unsubscribe-groups>
1. <https://cloud.google.com/recaptcha-enterprise/docs/create-key>
1. <https://cloud.google.com/recaptcha-enterprise/docs/instrument-web-pages-with-checkbox>
1. <https://auth0.com/docs/secure/attack-protection/bot-detection/configure-recaptcha-enterprise#create-an-api-key>
1. <https://cloud.google.com/recaptcha-enterprise/docs/interpret-assessment>
