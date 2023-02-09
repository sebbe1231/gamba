<script lang="ts">
    import { page } from "$app/stores";
    import { api } from "$lib/utils/api";
    import { onMount } from "svelte";

    onMount(async () => {
        const resp = await api("user/get_user")

        console.log(resp)
    })
</script>

YOU
{$page.params.slug}