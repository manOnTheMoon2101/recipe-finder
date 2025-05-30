<div>
{#each recipes as recipe }
    
{recipe.name}
{/each}
</div>


<script lang="ts">
    export let data;
    const recipes = data.recipes;
</script>