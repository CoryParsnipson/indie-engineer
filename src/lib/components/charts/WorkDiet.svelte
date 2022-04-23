<script lang="ts">
  export let data = [];
  export let show_hours = true;
  export let show_layer_names = false;

  let maxHours = 0;
  let metadata = [];

  type RowData = {
    items: any[];
    hours: num;
    width: num;
    layer_name: string;
    layer_bg: string;
  };

  data.forEach((row) => {
    let totalHours = 0;
    row.forEach((item) => {
      totalHours += item.hours;
    });

    maxHours = Math.max(totalHours, maxHours);

    let d: RowData = {
      items: row,
      hours: totalHours,
    };
    metadata.push(d);
  });

  metadata.forEach((row, idx) => {
    row.width = Math.round((row.hours / maxHours) * 100);
  });

  metadata[4].layer_name = "Passion project<br /> <span class='text-sm sm:text-base text-slate-700'>(passive optional)</span>";
  metadata[3].layer_name = "Serious hobbies<br /> <span class='text-sm sm:text-base text-slate-700'>(passive optional)</span>";
  metadata[2].layer_name = "Skilled work<br /> <span class='text-sm sm:text-base text-slate-700'>(passive)</span>";
  metadata[1].layer_name = "Soft work<br /> <span class='text-sm sm:text-base text-slate-700'>(passive)</span>";
  metadata[0].layer_name = "Survival jobs<br /> <span class='text-sm sm:text-base text-slate-700'>(passive and non-passive mix)</span>";

  metadata[4].layer_bg = "bg-yellow-500/40";
  metadata[3].layer_bg = "bg-orange-400/40";
  metadata[2].layer_bg = "bg-orange-400/40";
  metadata[1].layer_bg = "bg-rose-400/40";
  metadata[0].layer_bg = "bg-purple-400/40";
</script>

<div class="chart-work-diet relative">
  {#if show_hours}
  <p class="max-w-[100px] border-b-2 border-slate-500 leading-normal font-sans text-right sm:text-center text-lg absolute top-0 right-0">Hours Worked this Week</p>
  {/if}

  <div class="min-h-[20px] flex flex-col-reverse pt-20 mb-12">
  {#each metadata as row, idx}
    <div class:border-b-2={idx != 0} class:pl-24={show_layer_names}
      class="chart-work-diet-row border-slate-500 relative z-[2] px-2 {show_layer_names ? row.layer_bg : ''}">
      {#if show_hours}
      <p class="font-sans absolute top-0 right-0 z-[2] py-4 text-sm sm:text-xl sm:pr-7">~{row.hours}</p>
      {/if}

      {#if show_layer_names}
      <p class="max-w-[30%] font-sans absolute top-0 left-[1rem] z-[2] py-4 text-sm sm:text-lg sm:pr-7">{@html row.layer_name}</p>
      {/if}
  
      <div class="flex flex-wrap items-start justify-center gap-2 mx-auto mx-6 sm:mx-12 py-5">
      {#each row.items as item}
        <p class="m-0 py-2 px-4 z-10
          text-slate-100 bg-slate-500 rounded-lg
          font-sans leading-normal text-center
          text-xs min-w-[2rem] max-w-[7rem]
          sm:text-lg sm:min-w-[5rem] sm:max-w-[10rem]">
          {item.item}
        </p>
      {/each}
      </div>
    </div>
  {/each}
  </div>

  <svg
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    width="100%"
    height="100%"
    class="absolute top-0 left-0"
    class:pl-24={show_layer_names}
  >
    <path d="M0,100 L50,0 L100,100 Z" fill="#94A3B8">
  </svg>
</div>

<style>
  /* make the bottom row taller */
  div.chart-work-diet-row:first-child div { @apply pb-12; }
</style>
