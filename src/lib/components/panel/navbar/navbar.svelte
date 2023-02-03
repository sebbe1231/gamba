<script lang="ts">
    import { userTokenDecoded } from "$lib/stores";
    import { onMount } from "svelte";
    import { api } from "$lib/utils/api";

    onMount(async () => {
        const resp = await api("user/get_user", {
            method: "GET"
        })

        console.log(resp)
    })
</script>

<nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="container-fluid">
        <div class="border-end mx-2">
            <span class="navbar-brand">GAMBA</span>
        </div>

        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navmenu"
            >
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navmenu">
            <div class="navbar-nav">
                <a class="nav-link mx-2" href="/panel">Home</a>
                <a class="nav-link mx-2" href="/panel/dice">Dice</a>
            </div>
        </div>
        <div class="row">
            <span id="username-text" class="text-white col-12">{$userTokenDecoded?.name}</span>
            <span id="money-text" class="text-white col-12">{$userTokenDecoded?.money}</span>
        </div>
        <button type="button" id="logoutbtn" class="mx-2 btn btn-danger">logout</button>
    </div>
</nav>