<script lang="ts">
    import {Auth} from "$lib/login";
    import { qr } from '@svelte-put/qr/svg';
    import {onMount} from "svelte";
    import {Api} from "$lib/api";

    const password = Auth.password;

    let newCode: string = "";
    let availableCodes: string[] = [];

    async function getCodesFromServer(): Promise<string[]> {
        return await Api.getCodes()
    }

    async function addCode() {
        await Api.addCode(newCode);
        availableCodes = await getCodesFromServer();
        newCode = "";
    }

    async function codeUsed() {
        await Api.deleteCode(availableCodes[0]);
        availableCodes = await getCodesFromServer();
    }

    function doLogout() {
        Auth.logout();
    }

    onMount(async () => {
        availableCodes = await getCodesFromServer();
    })
</script>

<div class="d-flex flex-column gap-3 mx-3 h-100">
    <span class="text-center mt-4 h3 fw-light">Verfügbar: {availableCodes?.length || 0}</span>
    <form class="d-flex flex-column gap-3" on:submit={addCode}>
        <input type="text" class="form-control" placeholder="Neuer Code" bind:value={newCode}>
        <input type="submit" class="btn btn-outline-success" value="Hinzufügen">
    </form>
    {#if availableCodes?.length > 0}
        <svg use:qr={{
                 data: availableCodes[0]
             }}
        />
        <span class="text-center">{availableCodes[0]}</span>
        <button class="btn btn-outline-primary" on:click={codeUsed}>Benutzt</button>
    {/if}
    <div class="flex-fill"></div>
    <button class="btn btn-outline-danger mb-5" on:click={doLogout}>Logout</button>
</div>