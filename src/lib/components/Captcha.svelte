<script>
  import { browser } from '$app/env';
  import { onMount } from 'svelte';

  export let enable = false;
  export let sitekey;
  export let action = "submit";

  let recaptcha_target;

  if (browser && enable) {
    window.onRecaptchaLoad = onRecaptchaLoad;
  }

  function onRecaptchaLoad() {
    if (recaptcha_target.innerHTML) {
      return;
    }

    let clientId = grecaptcha.enterprise.render('grecaptcha-target', {
      'sitekey': sitekey,
      'badge': 'inline',
      'size': 'invisible',
    });

    // generate assessment on page load
    grecaptcha.enterprise.ready(function() {
      grecaptcha.enterprise.execute(clientId, { action: action }).then(function (token) {
        console.log("reCAPTCHA token: ", token);
      });
    });
  }

  onMount(async () => {
    if (!browser || !enable) {
      return;
    }

    // need to add this script tag here so the code above can run first
    let script = document.createElement('script');
    script.setAttribute('src', '//www.google.com/recaptcha/enterprise.js?render=explicity&onload=onRecaptchaLoad');
    script.setAttribute('async', '');
    script.setAttribute('defer', '');

    document.head.appendChild(script);
  });
</script>

{#if enable}
  <div bind:this={recaptcha_target} id="grecaptcha-target"></div>
{/if}
