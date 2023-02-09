<script lang="ts">
    import { userTokenDecoded } from "$lib/stores";
    import { onMount } from "svelte";
    import { api } from "$lib/utils/api";
    import { goto } from "$app/navigation";

    onMount(async () => {
        const resp = await api("user/get_user", {
            method: "GET"
        })

        console.log(resp)
    })

    const logout = async () => {
        goto("/auth/login")
        window.localStorage.removeItem("token")
        $userTokenDecoded = null
    }

    const profile = async () => {
        goto(`/panel/user/${$userTokenDecoded?.id}`)
    }
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
            {#if $userTokenDecoded?.name == undefined}
                <div class="col-12">
                    <div class="spinner-border text-light" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            {:else}
                <span id="username-text" class="text-white col-12" style="cursor: pointer;" on:click={profile} on:keypress={profile}>{$userTokenDecoded?.name}</span>
                <span id="money-text" class="text-white col-12">${$userTokenDecoded?.money}</span>
            {/if}
        </div>
        <button type="button" id="logoutbtn" class="mx-2 btn btn-danger" on:click={logout}>logout</button>
    </div>
</nav>