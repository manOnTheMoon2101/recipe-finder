<script lang="ts">
  import { Textarea } from "$lib/components/ui/textarea/index.js";
  import { Button } from "$lib/components/ui/button/index";
  import { enhance } from "$app/forms";
  import { goto, invalidateAll } from "$app/navigation";
  import { page } from "$app/stores";
  import { Badge } from "$lib/components/ui/badge/index.js";
  import Link from "@lucide/svelte/icons/link";
  import Users from "@lucide/svelte/icons/users";
  import CircleSmall from "@lucide/svelte/icons/circle-small";
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";
  export let data;
  let query = $page.url.searchParams.get("query") || "";
  let recipes = data.recipes || [];
  $: recipes = data.recipes || [];

  function clearFilter() {
    query = "";
    window.location.href = $page.url.pathname;
  }

  const handleSubmit = () => {
    return async ({ formData }: { formData: FormData }) => {
      const queryValue = formData.get("query") as string;
      if (queryValue) {
        const url = new URL($page.url);
        url.searchParams.set("query", queryValue);
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
      <Button type="submit" variant="outline">Submit</Button>
      {#if recipes.length > 0}
        <Button
          type="button"
          variant="destructive"
          onclick={clearFilter}
          class="ml-2">Clear</Button
        >
      {/if}
    </div>
  </form>

  {#if recipes.length > 0}
    <div class="mt-8">
      <h2 class="text-xl font-bold mb-4">Recipes for <Badge>{query}</Badge></h2>
      <ul class="space-y-2">
        {#each recipes as recipe}
          <div class="p-4 border rounded-lg shadow-sm">
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger>
                  <h2 class="flex flex-row">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`${recipe.information.sourceUrl}`}
                      >{recipe.title}
                    </a>
                    <Link />
                  </h2></Tooltip.Trigger
                >
                <Tooltip.Content>
                  <p>{recipe.information.sourceName}</p>
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
            <p class="text-sm text-gray-600">
              {recipe.information.readyInMinutes} minutes
            </p>
            <div class="flex flex-row items-center">
              <p class="text-sm text-gray-600">
                Servings: {recipe.information.servings}
              </p>
              <Users />
            </div>
            {#if recipe.information.vegan == true}
              <Badge>Vegan</Badge>
            {/if}
            {#if recipe.information.dairyFree == true}
              <Badge>Dairy Free</Badge>
            {/if}
            {#if recipe.information.glutenFree == true}
              <Badge>Gluten Free</Badge>
            {/if}
            {#if recipe.information.ketogenic == true}
              <Badge>Ketogenic</Badge>
            {/if}
            <div class="mt-2">
              <img src={recipe.image} alt={recipe.title} class="rounded-lg" />
            </div>
            <div class="mt-4">
              <h3 class="font-medium">Ingredients:</h3>
              <ul class="list-disc list-inside">
                {#each recipe.information.extendedIngredients as ingredient}
                  <div class="flex flex-row">
                    <CircleSmall /><span>{ingredient.original}</span>
                  </div>
                {/each}
              </ul>
            </div>
            <div class="mt-4">
              <h3 class="font-medium">Instructions:</h3>
              <ol class="list-decimal list-inside">
                {#each recipe.information.analyzedInstructions[0]?.steps || [] as step}
                  <li>{step.step}</li>
                {/each}
              </ol>
            </div>
          </div>
        {/each}
      </ul>
    </div>
  {/if}
</div>
