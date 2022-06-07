<script lang="ts">
  export let data = [];
  export let legend = false;
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

  const status_list = [
    'inactive',
    'wip',
    'active',
    'passive',
    'paused',
    'blocked',
    'discarded',
  ];

  const status_readable = {
    inactive: "Inactive",
    wip: "Work in Progress",
    active: "Actively Working",
    passive: "Passively Working",
    paused: "On Hold",
    blocked: "Problem Encountered",
    discarded: "Discarded",
  };

  function getItemColor(status) {
    switch (status) {
      case "paused":
        return "bg-amber-500";
      case "blocked":
        return "bg-red-500";
      case "discarded":
        return "bg-zinc-300";
      case "passive":
        return "bg-lime-400";
      case "active":
        return "bg-lime-700";
      case "wip":
        return "bg-yellow-300";
      default:
        return "bg-zinc-500";
    }
  }

  function getTextColor(status) {
    switch (status) {
      case "paused":
        return "text-red-900";
      case "discarded":
        return "text-zinc-400";
      case "passive":
        return "text-lime-800";
      case "wip":
        return "text-yellow-800";
      default:
        return "text-zinc-50";
    }
  }
</script>

<div class="flex flex-col gap-6 mb-12">
  <div class="chart-work-diet relative">
    {#if show_hours}
    <p class="max-w-[100px] border-b-2 border-slate-500 leading-normal font-sans text-right sm:text-center text-lg absolute top-0 right-0">Hours Worked this Week</p>
    {/if}
  
    <div class="min-h-[20px] flex flex-col-reverse pt-20">
    {#each metadata as row, idx}
      <div class:border-b-2={idx != 0} class:pl-24={show_layer_names}
        class="chart-work-diet-row border-slate-500 relative z-[2] px-2 {show_layer_names ? row.layer_bg : ''}">
        {#if show_hours}
        <p class="font-sans absolute top-0 right-0 z-[2] py-4 text-sm sm:text-xl sm:pr-7">~{row.hours}</p>
        {/if}
  
        {#if show_layer_names}
        <p class="max-w-[30%] font-sans absolute top-0 left-[1rem] z-[2] py-4 text-sm sm:text-lg sm:pr-7">{@html row.layer_name}</p>
        {/if}
    
        <div class="flex flex-wrap items-start justify-center gap-2 mx-auto mx-6 sm:mx-14 py-5">
        {#each row.items as item}
          <p
            title="{item.status}"
            class="m-0 py-2 px-4 z-10
            {getItemColor(item.status)}
            {getTextColor(item.status)}
            rounded-lg
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
      <path d="M0,100 L50,0 L100,100 Z" fill="#A1A1AA">
    </svg>
  </div>
  
  <div class:hidden={!legend} class="flex flex-col items-stretch w-full border-dashed border-cream-200 p-2" class:border-2={legend}>
    <div class="flex flex-wrap gap-x-12">
      {#each status_list as item, index}
        <div class="flex gap-2 items-center">
          <div class="block w-[10px] h-[10px] {getItemColor(item)}"></div>
          <p class="font-serif text-lg m-0">{status_readable[item]}</p>
        </div>
      {/each}
    </div>
  </div>
</div>
