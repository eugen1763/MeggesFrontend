<script lang="ts">
    import Login from "../components/login.svelte";
    import KeyStore from "../components/keyStore.svelte";
    import {Auth} from "$lib/login";
    import {onMount} from "svelte";

    const password = Auth.password;

    let isLoading = true;

    onMount(() => {
        Auth.init();

        isLoading = false;
    })
</script>

<div class="position-fixed h-100 w-100">
    {#if !isLoading}
        {#if $password}
            <KeyStore />
        {:else}
            <Login />
        {/if}
    {/if}
</div>