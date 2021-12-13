<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let list
  export let index

  const finish = (index) => {
    dispatch('finish', {
      index
    })
  }

  const destroy = (index) => {
    dispatch('destroy', {
      index
    })
  }

  const edit = (index) => {
    dispatch('edit', {
      index
    })
  }
</script>

<div class="select-none flex flex-1 items-center transition duration-500 ease-in-out transform hover:-translate-y-2 rounded-2xl border-2 p-4 hover:shadow-2xl border-blue-400">
  <div class="flex-1 pl-1">
    <div class="font-medium leading-normal hover:cursor-pointer inline-block" on:click={() => finish(index)}>
      <input type="checkbox"
             class="active:outline-none mr-2 outline-none rounded"
             bind:checked={list.isFinished}
      >
      {#key list.isFinished}
        {#if list.isFinished}
          <s>{list.task}</s>
        {:else}
          {list.task}
        {/if}
      {/key}
    </div>
  </div>
  <div class="w-1/4 text-center flex text-white text-bold rounded-md justify-center items-end p-2">
    <button on:click={() => destroy(index)} class="rounded active:bg-red-600 m-1 focus:outline-none focus:ring focus:ring-red-300 px-3 py-2 border-b-4 border-l-2 focus:outline-none shadow-lg bg-red-700 border-red-800">
      <svg class="h-4 w-4 text-white"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <polyline points="3 6 5 6 21 6" />  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" /></svg>
    </button>
    <button on:click={() => edit(index)} class="rounded active:bg-yellow-600 m-1 focus:outline-none focus:ring focus:ring-yellow-300 px-3 py-2 border-b-4 border-l-2 focus:outline-none shadow-lg bg-yellow-500 border-yellow-600">
      <svg class="h-4 w-4 text-white"  viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />  <line x1="16" y1="5" x2="19" y2="8" /></svg>
    </button>
  </div>
</div>
