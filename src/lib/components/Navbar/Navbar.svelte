<script>
  import { page } from "$app/stores";
  import ThemeToggler from "./components/themeToggler.svelte";
  $: currentPath = $page.url.pathname;
</script>

<nav class="flex flex-row justify-center items-center my-24">
  <a class="mx-4" href="/" style:font-weight={currentPath === "/" ? "bold" : "normal"}
    >Home</a
  >
  <a
    href="/recipes"
    class="mx-4"
    style:font-weight={currentPath === "/recipes" ? "bold" : "normal"}>Recipes</a
  >
  <ThemeToggler />
</nav>
