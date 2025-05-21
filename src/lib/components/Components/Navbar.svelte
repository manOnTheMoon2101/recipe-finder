<script>
  import { page } from "$app/stores";
  $: currentPath = $page.url.pathname;
</script>

<nav
  style="display: flex; gap: 1rem; padding: 1rem; background-color: #f0f0f0;"
>  <a href="/" style:font-weight={currentPath === "/" ? "bold" : "normal"}
    >Home</a
  >
  <a
    href="/about"
    style:font-weight={currentPath === "/about" ? "bold" : "normal"}>About</a
  >
</nav>

