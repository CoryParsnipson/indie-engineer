<script>
  import { page } from '$app/stores';
  import { createForm } from 'svelte-forms-lib';
  import * as yup from 'yup';

  import { env } from '$lib/util/env';

  const SUCCESS_MSG = "Successfully subscribed. Thanks for your support!";

  let instance = env.var.VITE_INSTANCE;

  let formBusy = false;
  let formEndpoint = '/api/registerEmail.json';
  let successMsg = $page.url.searchParams.has('success') ? SUCCESS_MSG : '';
  let qError = $page.url.searchParams.get('email');

  const { form, errors, state, handleChange, handleSubmit } = createForm({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object().shape({
      email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email address must not be blank"),
    }),
    onSubmit: async (values) => {
      formBusy = true;
      let data = JSON.stringify(values);

      let result = await fetch(formEndpoint, {
        method: 'post',
        body: data,
      });
      
      const registerEmailResponse = await result.json();

      successMsg = '';
      if (result.status === 202) {
        $form.email = '';
        formBusy = false;
        successMsg = SUCCESS_MSG;
      } else {
        if (registerEmailResponse.error) {
          $errors.email = registerEmailResponse.error;
        } else {
          $errors.email = "An internal error has occurred. Please contact support for assistance.";
        }
      }
    },
  });
</script>

{#if instance == "prod"}
<div class="iframe-wrapper">
  <iframe
    title="mailing-list-signup"
    width="100%"
    height="100%"
    src="https://cdn.forms-content.sg-form.com/4134f5b0-ad79-11ec-8a37-c21c974bde22"
    style="min-height: 500px"
  ></iframe>
</div>
{:else if instance == "dev"}
<div class="mail-signup-form border-2 border-cream-800 bg-cream-50 mb-8 p-8">
  <h2 id="mailform" class="mb-4">Be notified when there's a new blog post</h2>
  <p class="mb-4">Receive an email with a link to the latest blog post when a new one is published. No more, no less.</p>
  <p class="sidenote text-right m-0"><span class="required">*</span> indicates required</p>

  <form on:submit|preventDefault={handleSubmit} method='POST' action="{formEndpoint}" class="flex flex-col gap-2">
    <label for="email">Email Address <span class="required">*</span></label>
    <input id="email" name="email" type="text" class="flex-grow" on:change={handleChange} bind:value={$form.email} />
    {#if $errors.email}
      <p class="sidenote leading-tight text-red-600 m-1">{$errors.email}</p>
    {/if}

    {#if qError}
      <p class="sidenote leading-tight text-red-600 m-1">{qError}</p>
    {/if}

    {#if successMsg}
      <p class="sidenote leading-tight text-lime-600 m-1">{successMsg}</p>
    {/if}

    <button disabled='{formBusy || $errors.email}' type="submit"
      class="btn font-title text-xl self-center text-zinc-800 bg-emerald-500
             disabled:bg-zinc-400 disabled:text-zinc-600 disabled:hover:bg-zinc-400 disabled:hover:text-zinc-600 disabled:cursor-not-allowed
             hover:bg-emerald-700 hover:text-zinc-300 rounded-md mt-3 py-2 px-8">
      Subscribe
    </button>
  </form>
</div>

<style>
  .mail-signup-form input[type="text"] {
    border-radius: 0.2rem;
  }

  .mail-signup-form p, .mail-signup-form label {
    @apply font-serif;
    @apply text-xl;
  }

  .mail-signup-form p.sidenote {
    @apply text-lg;
  }

  .mail-signup-form .required {
    @apply text-red-600;
  }
</style>
{/if}
