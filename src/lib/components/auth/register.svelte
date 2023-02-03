<script lang="ts">
    import { api } from "$lib/utils/api";
    import Swal from "sweetalert2";
    export let name = "";
    export let password = "";

    const toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
    });

    const register = async () => {
        const resp = await api("auth/register", {
            body: {
                name: name,
                password: password
            }
        })

        if (!resp.success) {
            toast.fire({
                text: `Failed: ${resp.message}`,
                icon: "error",
            });
            return;
        }

        window.localStorage.removeItem("token")
        window.localStorage.setItem("token", resp.data.token)

        window.location.replace("/panel")
        
        toast.fire({
            text: "Account created!",
            icon: "success",
        });
    };
</script>

<h5 class="card-title">Register</h5>
<form on:submit={register}>
    <div class="mb-3">
        <label for="reg-name" class="form-label">Username</label>
        <input class="form-control" id="reg-name" bind:value={name} type="text">
    </div>
    <div class="mb-3">
        <label for="reg-pass" class="form-label">Password</label>
        <input class="form-control" id="reg-pass" bind:value={password} type="password">
    </div>
    <button type="submit" class="btn btn-primary">Register</button>
</form>
