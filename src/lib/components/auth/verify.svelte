<script lang="ts">
    import { userTokenDecoded } from "$lib/stores";
    import { onMount } from "svelte";
    import { api } from "$lib/utils/api";
    


    onMount(async () => {
        const resp = await api("auth/verify", {
            body: {
                token: window.localStorage.getItem("token")
            }
        })

        userTokenDecoded.set(resp.data.decoded)
        
        if (resp.success === false){
            window.location.replace("/auth/login")
        }
    })
</script>