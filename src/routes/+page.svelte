<script lang="ts">
  import { Textarea } from "$lib/components/ui/textarea/index.js";
  import { Button } from "$lib/components/ui/button/index";
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";

  export let data;
  let query = "";
  let recipes = data.recipes || [];

  function clearFilter() {
    recipes = [];
    query = "";
  }
</script>

<div class="flex flex-col items-center justify-center">
  <form method="GET" use:enhance>
    <Textarea
      bind:value={query}
      name="query"
      placeholder="Enter ingredients here..."
      class="w-96"
    />

    <div class="mt-6">
      <Button type="submit" class="bg-secondary text-foreground">Submit</Button>
      {#if recipes.length > 0}
        <Button type="button" onclick={clearFilter} class="ml-2">Clear Filter</Button>
      {/if}
    </div>
  </form>

  {#if recipes.length > 0}
    <div class="mt-8">
      <h2 class="text-xl font-bold mb-4">Recipes:</h2>
      <ul class="space-y-2">
        {#each recipes as recipe}
          <li class="p-2 rounded">{recipe.title}</li>

          <img src={recipe.image} alt="Recipe" />
        {/each}
      </ul>
    </div>
  {/if}
</div>
