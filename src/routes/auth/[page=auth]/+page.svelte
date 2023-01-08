<script lang="ts">
    import { page } from "$app/stores";
    import Login from "$lib/components/auth/login.svelte";
    import Register from "$lib/components/auth/register.svelte";
</script>

<div class="container mt-4">
    <div class="card text-center">
        <div class="card-header">
            <ul class="nav nav-tabs card-header-tabs">
                <li class="nav-item">
                    <a class="nav-link" class:active={$page.params.page === "login"} href="login">Login</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" class:active={$page.params.page === "register"} href="register">Register</a>
                </li>
            </ul>
        </div>
        <div class="card-body">
            {#if $page.params.page === "login"}
                <Login />
            {:else}
                <Register />
            {/if}
        </div>
    </div>
</div>