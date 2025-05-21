<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Components/Navbar.svelte';
	let { children } = $props();
</script>

<div>
	<Navbar />
</div>
{@render children()}
