<script lang="ts">
  import { Textarea } from "$lib/components/ui/textarea/index.js";
  import { Button } from "$lib/components/ui/button/index";
</script>

<div class=" flex flex-col items-center justify-center">
  <Textarea  placeholder="Enter Products here..." class="w-96" />
  
  <div class="mt-6">
    <Button class='bg-secondary text-foreground'>Submit</Button>
  </div>
</div>
