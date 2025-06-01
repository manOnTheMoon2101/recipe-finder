<script lang="ts">
  import { Textarea } from "$lib/components/ui/textarea/index.js";
  import { Button } from "$lib/components/ui/button/index";
  import { enhance } from "$app/forms";
  import { goto, invalidateAll } from "$app/navigation";
  import { page } from "$app/stores";
  import { Badge } from "$lib/components/ui/badge/index.js";

  export let data;
  let query = $page.url.searchParams.get('query') || "";
  let recipes = data.recipes || [];
  $: recipes = data.recipes || [];

  function clearFilter() {
    query = "";
    window.location.href = $page.url.pathname;
  }

  const handleSubmit = () => {
    return async ({ formData }: { formData: FormData }) => {
      const queryValue = formData.get('query') as string;
      if (queryValue) {
        const url = new URL($page.url);
        url.searchParams.set('query', queryValue);
        await goto(url.toString());
        await invalidateAll();
      }
    };
  };
</script>

<div class="flex flex-col items-center justify-center">
  <form method="GET" use:enhance={handleSubmit}>
    <Textarea
      bind:value={query}
      name="query"
      placeholder="Enter ingredients here..."
      class="w-96"
    />

    <div class="mt-6">
      <Button type="submit" variant="outline" >Submit</Button>
      {#if recipes.length > 0}
        <Button type="button" variant="destructive"  onclick={clearFilter} class="ml-2">Clear Filter</Button>
      {/if}
    </div>
  </form>

  {#if recipes.length > 0}
    <div class="mt-8">
      <h2 class="text-xl font-bold mb-4">Recipes for <Badge>{query}</Badge></h2>
      <ul class="space-y-2">
        {#each recipes as recipe}
          <h2 class="p-2 rounded">{recipe.title}</h2>
          <img src={recipe.image} alt="Recipe" />
        {/each}
      </ul>
    </div>
  {/if}
</div>