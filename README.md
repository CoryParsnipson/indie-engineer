# Indie Engineer

This is a sveltekit + MDsveX blog.

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

1. Gather heroku API keys (see below section).

## Generate site API keys and Heroku key access

TBD

## Set up automated email hook

TBD

## References

1. <https://dev.to/nostro/deploying-to-heroku-with-sveltekit-3350>
