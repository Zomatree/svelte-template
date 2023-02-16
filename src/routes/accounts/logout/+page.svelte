<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import { redirect } from "@sveltejs/kit";
	import { onMount } from "svelte";

    onMount(async () => {
        await invalidateAll();
        throw redirect(307, "/accounts/login");
    });

</script>

Redirecting...
