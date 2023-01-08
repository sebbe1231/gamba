<script lang="ts">
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

    const login = async () => {
        const resp = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({
                name: name,
                password: password
            })
        })
        
        const data = await resp.json();

        if (!data.success){
            return toast.fire({
                text: `Failed: ${data.message}`,
                icon: "error"
            })
        }

        window.localStorage.removeItem("token")
        window.localStorage.setItem("token", data.data.token)

        window.location.replace("/panel")

        return toast.fire({
            text: "Logged in!",
            icon: "success"
        })
    }
</script>

<h5 class="card-title">Login</h5>
<form on:submit={login}>
    <div class="mb-3">
        <label for="login-name" class="form-label">Username</label>
        <input class="form-control" id="login-name" bind:value={name} type="text">
    </div>
    <div class="mb-3">
        <label for="login-pass" class="form-label">Password</label>
        <input class="form-control" id="login-pass" bind:value={password} type="password">
    </div>
    <button type="submit" class="btn btn-primary">Log in</button>
</form>