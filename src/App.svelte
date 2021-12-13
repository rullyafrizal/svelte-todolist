<script lang="ts">
	import TaskList from './Components/TaskList.svelte'

	let title

	interface List {
		task: string,
		isFinished: boolean
	}

	let lists: Array<List> = [
	  {
	    task: 'Cleaning Toilets',
	    isFinished: true
	  },
	  {
	    task: 'Learning Svelte',
	    isFinished: false
	  }
	]

	let task: string = ''

	const add = (): void => {
	  if (task) {
	    lists = [...lists, {
	      task,
	      isFinished: false
	    }]

	    task = ''
	  } else {
	    window.alert('Tolong diisi dahulu sebelum menyimpan!')
	  }
	}

	const finish = (event): void => {
	  const { index } = event.detail
	  lists[index].isFinished = !lists[index].isFinished
	}

	const destroy = (event): void => {
	  const { index } = event.detail

	  if (!window.confirm('Are you sure?')) {
	    return
	  }
	  lists.splice(index, 1)
	  lists = lists
	}

	let editMode = false
	let selectedIndex = null
	const edit = (event): void => {
	  const { index } = event.detail

	  task = lists[index].task
	  editMode = true
	  selectedIndex = index
	}

	const update = (): void => {
	  if (!task) {
	    window.alert('Harap isi terlebih dahulu!')
	    task = lists[selectedIndex].task
	  } else {
	    lists[selectedIndex].task = task
	    editMode = false
	    task = ''
	  }
	}

	const reset = (): void => {
	  task = ''
	  editMode = false
	  selectedIndex = null
	}

	// computed property kalau di vue
	$: title = 'TO DO LIST'
</script>

<svelte:head>
	<title>To Do List</title>
	<meta name="robots" content="noindex nofollow" />
	<html lang="en"></html>
</svelte:head>

<main>
	<div class="flex justify-center">
		<div class="basis-1/2">
			<div class="w-full py-4 px-8 bg-white shadow-lg hover:shadow-2xl rounded-lg my-10">
				<div>
					<div class="text-gray-800 text-xl leading-loose font-bold">{ title }</div>
					<div class="focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded-lg p-1">
						<input placeholder="Enter task..." id="name" bind:value={task} autocomplete="false" tabindex="0" type="text" class="py-3 px-3 text-gray-900 focus:ring focus:border-blue-500 outline-none rounded-md block h-full w-full">
					</div>
				</div>
				<div class="flex justify-end border-t mt-6 pt-3">
					<button title="Clear" on:click={() => reset()} class="rounded text-gray-100 mr-2 px-3 py-1 bg-gray-500 hover:shadow-inner hover:bg-gray-700 transition-all duration-300">
						<svg class="h-5 w-5 text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -5v5h5" />  <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 5v-5h-5" /></svg>
					</button>
					{#if !editMode}
						<button on:click={() => add()} class="rounded text-gray-100 px-3 py-1 bg-blue-500 hover:shadow-inner hover:bg-blue-700 transition-all duration-300">
							<svg class="h-5 w-5 text-white"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />  <polyline points="17 21 17 13 7 13 7 21" />  <polyline points="7 3 7 8 15 8" /></svg>
						</button>
					{:else}
						<button on:click={() => update()} class="rounded text-gray-100 px-3 py-1 bg-yellow-500 hover:shadow-inner hover:bg-yellow-700 transition-all duration-300">
							<svg class="h-5 w-5 text-white"  viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />  <line x1="16" y1="5" x2="19" y2="8" /></svg>
						</button>
					{/if}
				</div>
			</div>
			<div class="w-full flex justify-center mb-20 py-4 px-8 bg-white shadow-lg hover:shadow-2xl rounded-lg basis-1/2">
				{#if lists.length}
					<ul class="flex flex-col p-2 basis-full">
						{#each lists as list, index}
							{#key lists.length}
								<li class="flex flex-row my-3">
									<TaskList list={list} index={index}
														on:finish={finish}
														on:destroy={destroy}
														on:edit={edit}
									/>
								</li>
							{/key}
						{/each}
					</ul>
				{:else}
					<h1 class="font-2xl font-semibold">No Data Found</h1>
				{/if}
			</div>
		</div>
	</div>
</main>

<style global lang="postcss">
	@import url('https://fonts.googleapis.com/css2?family=Inter');

	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	* {
		font-family: Inter, serif;
	}
</style>
