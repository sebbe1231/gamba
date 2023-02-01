<script lang="ts">
    import { onMount } from "svelte";

    onMount(async () => {
        const resp = await fetch("/api/user/get_store", {
            method: "GET",
        });

        const data = await resp.json();
        console.log(data)

        document.getElementById("username-text")!.textContent = data.data.user.name
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
        <span id="username-text" class="text-white">USERNAME</span>
        <button type="button" id="logoutbtn" class="mx-2 btn btn-danger">logout</button>
    </div>
</nav>