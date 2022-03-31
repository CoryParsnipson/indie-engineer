<script>
  import { createForm } from 'svelte-forms-lib';
  import * as yup from 'yup';

  import { env } from '$lib/util/env';
  import { API_HEADER_AUTH, sign_string } from '$lib/util/auth';

  let instance = env.var.VITE_INSTANCE;

  let formBusy = false;
  let successMsg = '';

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

      let result = await fetch('/api/registerEmail.json', {
        method: 'post',
        headers: {
          API_HEADER_AUTH: sign_string(env.var.VITE_API_SECRET, data),
        },
        body: data,
      });
      
      const registerEmailResponse = await result.json();

      successMsg = '';
      if (result.status === 202) {
        $form.email = '';
        formBusy = false;
        successMsg = "Successfully subscribed. Thanks for your support!";
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
<iframe
  title="mailing-list-signup"
  src="https://cdn.forms-content.sg-form.com/4134f5b0-ad79-11ec-8a37-c21c974bde22"
  class="block w-full min-h-[500px]"
/>
{:else if instance == "dev"}
<div class="mail-signup-form border-2 border-slate-700 bg-slate-50 p-8">
  <h2 class="mb-4">Be notified when there's a new blog post</h2>
  <p class="mb-4">Receive an email with a link to the latest blog post when a new one is published. No more, no less.</p>
  <p class="sidenote text-right m-0"><span class="required">*</span> indicates required</p>

  <form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-2">
    <label for="email">Email Address <span class="required">*</span></label>
    <input id="email" name="email" type="text" class="flex-grow" on:change={handleChange} bind:value={$form.email} />
    {#if $errors.email}
    <p class="sidenote leading-tight text-red-600 m-1" >{$errors.email}</p>
    {/if}

    {#if successMsg}
    <p class="sidenote leading-tight text-lime-600 m-1" >{successMsg}</p>
    {/if}

    <button disabled='{formBusy || $errors.email}' type="submit"
      class="btn font-sans text-lg self-center text-slate-50 bg-slate-500 disabled:bg-slate-300 hover:bg-slate-400 rounded-md mt-3 py-2 px-8"
    >
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
