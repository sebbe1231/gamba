<script lang="ts">
    import { page } from "$app/stores";

    import User from "$lib/components/user/user.svelte";
    import ThisUser from "$lib/components/user/this_user.svelte";
    import { userTokenDecoded } from "$lib/stores";
</script>

<div class="container mt-4">
    {#if $userTokenDecoded === null}
        <div class="spinner-border" style="display: block; margin-left: auto; margin-right: auto;" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    {:else if Number.isNaN(Number($page.params.slug))}
        Not valid id
    {:else if $userTokenDecoded?.id === Number($page.params.slug)}
        <ThisUser />
    {:else if $userTokenDecoded?.id != Number($page.params.slug)}
        <User />
    {/if}
</div>