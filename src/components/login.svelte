<script lang="ts">
    import {Auth} from "$lib/login";

    let password : string;

    function onSubmit() {
        Auth.login(password);
    }
</script>

<div class="d-flex align-items-center p-0! w-100 h-100">
    <div class="d-flex flex-column gap-4 flex-fill px-3">
        <h1 class="fw-light text-center">Login</h1>
        <form action="." class="d-flex gap-2" on:submit={onSubmit}>
            <input class="form-control" type="password" bind:value={password} name="password" id="password">
            <input type="submit" value="Login" class="btn btn-primary">
        </form>
    </div>
</div>