<script lang="ts">
    import { userTokenDecoded } from "$lib/stores";
    import { onMount } from "svelte";
    import { api } from "$lib/utils/api";
    import { goto } from "$app/navigation";
    


    onMount(async () => {
        const resp = await api("auth/verify", {
            method: "GET"
        })

        if (resp.success === false){
            goto("/auth/login")
        }

        userTokenDecoded.set(resp.data.store)
    })
</script>