<script>
  import { page } from "$app/stores";
  import ThemeToggler from "./components/themeToggler.svelte";
  $: currentPath = $page.url.pathname;
</script>

<nav class="flex flex-row justify-center items-center my-24">
  <a class="mx-4 text-8xl" href="/" style:font-weight={currentPath === "/" ? "bold" : "normal"}
    >RecipeReel</a
  >
  <!-- <a
    href="/recipes"
    class="mx-4"
    style:font-weight={currentPath === "/recipes" ? "bold" : "normal"}>Recipes</a
  > -->
  <!-- <ThemeToggler /> -->
</nav>
