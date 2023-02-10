<script lang="ts">
    import TopNavbar from "$lib/components/TopNavbar.svelte";
    import type { LayoutServerData } from "./$types";
    import "./styles.scss";

    export let data: LayoutServerData;
</script>

<div class="page">
    <TopNavbar user={data.user}/>
    <slot/>
</div>
