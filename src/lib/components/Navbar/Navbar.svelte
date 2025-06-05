<script>
  import { page } from "$app/stores";
  import ThemeToggler from "./components/themeToggler.svelte";
  import '@fontsource/itim';
  $: currentPath = $page.url.pathname;
</script>

<nav class="flex flex-row justify-center items-center my-24">
  <h1
    class="mx-4 text-8xl"
    style:font-weight={currentPath === "/" ? "bold" : "normal"}
  >
    RecipeReel
  </h1>
  <!-- <a
    href="/recipes"
    class="mx-4"
    style:font-weight={currentPath === "/recipes" ? "bold" : "normal"}>Recipes</a
  > -->
  <!-- <ThemeToggler /> -->
</nav>

<style>
  h1 {
    font-family: 'Itim', cursive;
  }
</style>