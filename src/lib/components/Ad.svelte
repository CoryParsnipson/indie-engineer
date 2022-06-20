<script>
  import { onMount } from 'svelte';

  export let width = "250px";
  export let height = "250px";
  export let max_width = "";

  export let placeholder = "";

  export let show = true;
  export let id;

  let self;
  let ef_placeholder = "";

  function updateSize() {
    if (!self) {
      return;
    }

    ef_placeholder = !placeholder ? `${self.offsetWidth} x ${self.offsetHeight}` : placeholder;
  }

  onMount(() => {
    updateSize();
    window.addEventListener('resize', updateSize);
  });
</script>

{#if show === "true"}
<div bind:this={self} id={id} class="flex justify-center items-center mx-auto mt-6 mb-12 bg-zinc-500" style="width: {width}; max-width: {max_width}; height: {height}">
  <p class="font-title text-lg text-zinc-100 m-0">{ef_placeholder}</p>
</div>
{/if}
