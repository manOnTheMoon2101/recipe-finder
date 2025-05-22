<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar/Navbar.svelte';
	import { ModeWatcher } from "mode-watcher";
	let { children } = $props();
</script>

<div>
	<Navbar />
	<ModeWatcher />
</div>

{@render children()}
