<script>
  import MetaData from '$lib/components/MetaData.svelte';

  import { page } from '$app/stores';
  import { createForm } from 'svelte-forms-lib';
  import * as yup from 'yup';

  import { env } from '$lib/util/env';

  const SUCCESS_MSG = "Message sent successfully.";

  const meta = {
    title: "Contact :: Indie Engineer",
    description: "Want to contact Cory Parsnipson, author of IndieEngineer.com? Fill out the email form and he will get back to you.",
    image: "/site/indie-engineer-og-image.png",
    twitter_user: "@CoryParsnipson",
  };

  let form_busy = false;
  let form_endpoint = '/api/contact.json';
  let form_success_msg = $page.url.searchParams.has('success') ? SUCCESS_MSG : '';
  let query_errors = [];

  for (let pair of $page.url.searchParams.entries()) {
    if (pair[0] == "success") {
      continue;
    }
    query_errors.push(pair[1]);
  }

  const { form, errors, state, handleChange, handleSubmit } = createForm({
    initialValues: {
      name: "",
      submit_id: "",
      subject: "",
      email: "",
      message: "",
    },
    validationSchema: yup.object().shape({
      name: yup
        .string(),
      subject: yup
        .string(),
      email: yup
        .string()
        .email("Please enter a valid email address")
        .required("Email address must not be blank"),
      message: yup
        .string()
        .required("Message must not be blank"),
    }),
    onSubmit: async (values) => {
      form_busy = true;
      let data = JSON.stringify(values);

      let result = await fetch(form_endpoint, {
        method: 'post',
        body: data,
      });
      const response = await result.json();

      form_success_msg = '';
      if (result.status >= 200 && result.status < 300) {
        $form.name = '';
        $form.subject = '';
        $form.email = '';
        $form.message = '';

        form_success_msg = SUCCESS_MSG;
        form_busy = false;
      } else {
        if (env.var.VITE_INSTANCE === "dev" && response.error) {
          $errors.response = response.error;
        } else {
          $errors.response = "An internal error has occurred.";
        }
      }
    }
  });
</script>

<MetaData meta={meta} />

<main>
  <h1 class="font-title text-5xl mt-12 mb-12">Contact me</h1>

  <div class="flex flex-col-reverse sm:flex-row sm:items-start mb-12">
    <form id="contactform" on:submit|preventDefault={handleSubmit} action="{form_endpoint}" method="post" class="grow scroll-mt-28 sm:pr-8">
      <input type="text" name="submit_id" style="display:none" on:change={handleChange} bind:value={$form.submit_id}>

      {#if $errors.email || $errors.message || $errors.response || query_errors.length > 0}
        <div class="bg-red-100 border-red-500 border rounded-lg p-4 mb-6">
          {#each Object.entries($errors) as [error_type, message]}
            <p class="text-red-500 font-serif mb-0">{message}</p>
          {/each}

          {#each query_errors as message}
            <p class="text-red-500 font-serif mb-0">{message}</p>
          {/each}
        </div>
      {/if}

      {#if form_success_msg}
        <div class="bg-lime-200 border-lime-600 border rounded-lg p-4 mb-6">
          <p class="text-lime-600 font-serif mb-0">{form_success_msg}</p>
        </div>
      {/if}

      <div class="flex flex-col">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" on:change={handleChange} bind:value={$form.name}>

        <label for="subject">Subject</label>
        <input type="text" id="subject" name="subject" on:change={handleChange} bind:value={$form.subject}>

        <label for="email">Reply to <span class="required">*</span></label>
        <input type="text" id="email" name="email" placeholder="someone@somewhere.com" on:change={handleChange} bind:value={$form.email}>

        <label for="message">Message <span class="required">*</span></label>
        <textarea id="message" name="message" rows="4" placeholder="Hello!" class="min-h-[100px]" on:change={handleChange} bind:value={$form.message}></textarea>

        <p class="font-serif text-lg text-right mb-3"><span class="required">*</span> indicates required</p>

        <input type="submit" value="Submit" disabled='{form_busy || $errors.email || $errors.message}'
          class="self-center font-title text-xl text-zinc-800 rounded-lg px-8 py-4
                 bg-emerald-500
                 hover:bg-emerald-700 hover:text-zinc-300 hover:cursor-pointer
                 disabled:bg-zinc-400 disabled:text-zinc-600 disabled:hover:text-zinc-600 disabled:hover:cursor-not-allowed">
      </div>
    </form>

    <div class="sm:w-2/5 py-4 px-8 mb-12 sm:pb-12 bg-cream-200">
      <img src="/site/headshot-cparsnipson.png" width="150px" alt="A headshot of yours truly, Cory Parsnipson" class="m-8 mx-auto">
      <p class="font-serif text-lg sm:text-xl leading-loose sm:leading-loose text-center">
        Hey, it's me, Cory Parsnipson! Need to get in touch with me? Fill out the form and I'll get back to you.
      </p>
    </div>
  </div>
</main>

<style>
  label { @apply font-serif text-lg mb-2; }
  input[type="text"], textarea { @apply rounded-md mb-6; }

  span.required { @apply text-red-600; }
  
  /* need to use vanilla media query because complex class ('sm:') causes compilation issue (svelte bug?) */
  @media (min-width: 640px) {
    label { @apply font-serif text-xl mb-2; }
  }
</style>
