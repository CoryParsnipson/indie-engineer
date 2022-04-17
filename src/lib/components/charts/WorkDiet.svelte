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
</script>

<div class="chart-work-diet flex items-stretch">
  <div class="relative pt-20 pb-3 mb-12">
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      width="100%"
      height="100%"
      class="absolute top-0 left-0"
    >
      <path d="M0,100 L50,0 L100,100 Z" fill="#94A3B8">
    </svg>

    {#if show_hours === true}
    <p class="max-w-[100px] border-b-2 border-slate-500 leading-normal font-sans text-right sm:text-center text-lg absolute top-0 right-0">Hours Worked this Week</p>
    {/if}

    <div class="min-h-[20px] flex flex-col-reverse gap-1">
    {#each metadata as row, idx}
      <div class:border-b-2={idx != 0} class="border-slate-500 relative px-2">
        {#if show_hours === true}
        <p class="font-sans absolute top-0 right-0 z-[2] py-4 text-sm sm:text-xl sm:pr-7">~{row.hours}</p>
        {/if}
    
        <div class="flex flex-wrap items-start justify-center gap-2 mx-auto mx-6 sm:mx-12 py-3">
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
  </div>
</div>
