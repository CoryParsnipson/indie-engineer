# Cory's Blog

This is a sveltekit + MDsveX blog.

## Creating a svelte kit project

```bash
npm init svelte@next app

mv app corys-blog
cd corys-blog

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

## Deploy to Heroku

TBD

## Generate site API keys and Heroku key access

TBD

## Set up automated email hook

TBD
