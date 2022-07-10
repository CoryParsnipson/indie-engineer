<script>
  import { browser } from '$app/env';
  import { onMount } from 'svelte';

  import { evalAssessment } from '$lib/services/recaptcha';
  import { env } from '$lib/util/env';

  export let enable = false;
  export let sitekey;
  export let action = "submit";

  export let form_enable;
  export let errors;

  const CAPTCHA_THRESHOLD = 0.5;

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
      grecaptcha.enterprise.execute(clientId, { action: action }).then(async function (token) {
        let data = {
          token: token,
          action: action,
        };

        let result = await fetch('/api/recaptcha.json', {
          method: 'post',
          body: JSON.stringify(data),
        });

        let assessment = await result.json();

        let res = evalAssessment(assessment, CAPTCHA_THRESHOLD, action);
        if (res.decision) {
          form_enable = true;
        } else {
          // show error message on form about failed captcha
          errors.recaptcha = env.var.VITE_INSTANCE == "dev" ? JSON.stringify(res.reasons) : "Captcha failed. Form is disabled.";
        }
      });
    });
  }

  onMount(async () => {
    if (!browser || !enable) {
      return;
    }

    // disable the form ASAP and then re-enable if captcha passes
    form_enable = false;

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
