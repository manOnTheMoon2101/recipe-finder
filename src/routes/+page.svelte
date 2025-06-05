<script lang="ts">
  import { Textarea } from "$lib/components/ui/textarea/index.js";
  import { Button } from "$lib/components/ui/button/index";
  import { enhance } from "$app/forms";
  import { goto, invalidateAll } from "$app/navigation";
  import { page } from "$app/stores";
  import { Badge } from "$lib/components/ui/badge/index.js";
  import Link from "@lucide/svelte/icons/link";
  import Users from "@lucide/svelte/icons/users";
  import User from "@lucide/svelte/icons/user";
  import CircleSmall from "@lucide/svelte/icons/circle-small";
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
  import BookOpen from "@lucide/svelte/icons/notebook-text";
  import "@fontsource/itim";
  export let data;
  let query = $page.url.searchParams.get("query") || "";
  let recipes = data.recipes || [];
  let isLoading = false;
  $: recipes = data.recipes || [];

  function clearFilter() {
    query = "";
    window.location.href = $page.url.pathname;
  }

  const handleSubmit = () => {
    return async ({ formData }: { formData: FormData }) => {
      isLoading = true;
      const queryValue = formData.get("query") as string;
      if (queryValue) {
        const url = new URL($page.url);
        url.searchParams.set("query", queryValue);
        await goto(url.toString());
        await invalidateAll();
      }
      isLoading = false;
    };
  };
</script>

<div class="flex flex-col items-center justify-center">
  <form method="POST" use:enhance={handleSubmit}>
    <Textarea
      bind:value={query}
      name="query"
      placeholder="Enter ingredients here..."
      class="w-96"
    />

    <div class="mt-6">
      <Button type="submit" variant="outline" disabled={isLoading}>
        {#if isLoading}
          Loading...
        {:else}
          Submit
        {/if}
      </Button>
      {#if recipes.length > 0}
        <Button
          type="button"
          variant="destructive"
          onclick={clearFilter}
          class="ml-2"
          disabled={isLoading}>Clear</Button
        >
      {/if}
    </div>
  </form>

  {#if isLoading}
    <div class="mt-8 text-center">
      <p class="text-lg text-muted-foreground">Searching for recipes...</p>
    </div>
  {:else if recipes.length > 0}
    <div class="mt-8">
      <!-- <h2 class="text-xl font-bold mb-4">Recipes for <Badge>{query}</Badge></h2> -->
      {#each recipes as recipe}
        <div
          class="flex flex-col md:flex-row gap-6 mb-8 p-4 border-bacground mx-2 rounded-lg shadow-sm"
        >
          <div class="w-full md:w-1/3 flex items-center justify-center">
            <img
              src={recipe.image}
              alt={recipe.title}
              class="object-contain rounded-lg max-h-64 w-full"
            />
          </div>
          <div class="w-full md:w-2/3">
            <Tooltip.Provider delayDuration={100}>
              <Tooltip.Root>
                <Tooltip.Trigger>
                  <h2
                    class="flex flex-row items-center gap-2 text-xl font-semibold mb-4"
                  >
                    <a
                      target="_blank"
                      id="recipeTitle"
                      rel="noopener noreferrer"
                      href={`${recipe.information.sourceUrl}`}
                      class="hover:underline text-6xl text-primary"
                      >{recipe.title}</a
                    >
                    <Link class="w-4 h-4 text-gray-400" />
                  </h2>
                </Tooltip.Trigger>
                <Tooltip.Content>
                  <p>{recipe.information.sourceName}</p>
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>

            <div class="flex items-center gap-4 mb-4">
              <div class="flex items-center gap-1">
                <p class="text-sm text-gray-600">Servings:</p>
                {#if recipe.information.servings > 1}
                  <Users class="w-4 h-4" />
                  {recipe.information.servings}
                {:else}
                  <User class="w-4 h-4" />
                  {recipe.information.servings}
                {/if}
              </div>
              <p class="text-sm text-gray-600 flex items-center gap-1">
                {recipe.information.readyInMinutes} minutes
              </p>
            </div>

            <div class="flex gap-2 mb-4">
              {#if recipe.information.vegan == true}
                <Badge class="text-secondary">Vegan</Badge>
              {/if}
              {#if recipe.information.dairyFree == true}
                <Badge class="text-secondary">Dairy Free</Badge>
              {/if}
              {#if recipe.information.glutenFree == true}
                <Badge class="text-secondary">Gluten Free</Badge>
              {/if}
              {#if recipe.information.ketogenic == true}
                <Badge class="text-secondary">Ketogenic</Badge>
              {/if}
            </div>

            <div class="mt-4">
              <h3 class="font-medium mb-2">Ingredients:</h3>
              <ul class="list-none space-y-1">
                {#each recipe.information.extendedIngredients as ingredient}
                  <div class="flex items-center gap-2">
                    <CircleSmall class="w-4 h-4 text-primary" />
                    <span>{ingredient.original}</span>
                  </div>
                {/each}
              </ul>
            </div>

            <div class="mt-4">
              <div class="flex flex-row justify-center">
                <Dialog.Root>
                  <Dialog.Trigger
                    ><Badge
                      class="text-xl cursor-pointer text-secondary hover:bg-primary/60"
                      ><BookOpen />Instructions</Badge
                    ></Dialog.Trigger
                  >
                  <Dialog.Content class="w-[900px] h-[700px]">
                    <Dialog.Header>
                      <Dialog.Title>Instructions</Dialog.Title>
                    </Dialog.Header>
                    <ScrollArea class="h-[500px] w-full">
                      <Dialog.Description>
                        <ol class="list-decimal list-inside space-y-2">
                          {#each recipe.information.analyzedInstructions[0]?.steps || [] as step}
                            <li class="my-4">{step.step}</li>
                          {/each}
                        </ol>
                      </Dialog.Description>
                    </ScrollArea>
                  </Dialog.Content>
                </Dialog.Root>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  #recipeTitle {
    font-family: "Itim", cursive;
  }
</style>
