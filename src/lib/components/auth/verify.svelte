<script lang="ts">
    import { onMount } from "svelte";
    


    onMount(async () => {
        const resp = await fetch("/api/auth/verify", {
            method: "POST",
            body: JSON.stringify({
                token: window.localStorage.getItem("token"),
            }),
        });

        const data = await resp.json();
        
        if (data.success === false){
            window.location.replace("/auth/login")
        }
    })
</script>