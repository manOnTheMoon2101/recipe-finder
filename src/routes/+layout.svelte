<script lang="ts">
  import "../app.css";
  import Navbar from "$lib/components/Navbar/Navbar.svelte";
  import Footer from "$lib/components/Footer/Footer.svelte";
  import { ModeWatcher } from "mode-watcher";
  let { children } = $props();
</script>

<div class="min-h-screen flex flex-col bg-gradient-to-bl from-accent to-background">
  <nav>
    <Navbar />
  </nav>
  <ModeWatcher />

  <main class="flex-1">
    {@render children()}
  </main>

  <footer>
    <Footer />
  </footer>
</div>
