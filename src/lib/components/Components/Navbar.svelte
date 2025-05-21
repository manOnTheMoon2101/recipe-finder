<script>
  import { page } from "$app/stores";
  import ThemeToggler from "./Navbar/themeToggler.svelte";
  $: currentPath = $page.url.pathname;
</script>

<nav>
  <a href="/" style:font-weight={currentPath === "/" ? "bold" : "normal"}
    >Home</a
  >
  <a
    href="/about"
    style:font-weight={currentPath === "/about" ? "bold" : "normal"}>About</a
  >
  <ThemeToggler />
</nav>
