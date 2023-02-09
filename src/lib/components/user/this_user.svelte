<script lang="ts">
    import { writable, type Writable } from 'svelte/store';
    import type { DetailedUser } from '$lib/components/user/user_type';
    import { page } from "$app/stores";
    import { api } from "$lib/utils/api";
    import { onMount } from "svelte";
    import Swal from "sweetalert2";

    const user: Writable<DetailedUser | null> = writable(null);
    
    

    onMount(async () => {
        const resp = await api("user/get_user")

        if (resp.success === false){
            Swal.fire({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                text: `Failed: ${resp.message}`,
                icon: "error"
            });
        }

        $user = resp.data.user
    })
</script>

{#if $user === null}
<div class="spinner-border" style="display: block; margin-left: auto; margin-right: auto;" role="status">
    <span class="visually-hidden">Loading...</span>
</div>

{:else}

<h2 class="text-center">{$user?.name}</h2>
<div class="row">
    <div class="col-12 col-md-4">
        <div class="card">
            <div class="card-header">
                Profile
            </div>
            <div class="card-body">
                <h5>Username</h5>
                <p>{$user.name}</p>
                <h5>ID</h5>
                <p>{$user.id}</p>
                <h5>Date created</h5>
                <p>{$user.createdAt.slice(0,10)}</p>
            </div>
        </div>
    </div>
    <div class="col-12 col-md-4">
        <div class="card">
            <div class="card-header">
                Games played
            </div>
            <div class="card-body">
                <h5>lol</h5>
            </div>
        </div>
    </div>
    <div class="col-12 col-md-4">
        <div class="card">
            <div class="card-header">
                Winnings
            </div>
            <div class="card-body">
                <h5>lol</h5>
            </div>
        </div>
    </div>
</div>

{/if}
