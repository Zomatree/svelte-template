<script lang="ts">
	import { redirect } from "@sveltejs/kit";
    import type { PageParentData, ActionData } from "./$types";

    export let data: PageParentData;
    export let form: ActionData;

    if (data.user) {
        throw redirect(300, "/home")
    }
</script>

<div class="container">
    <div class="inner-container">
        <h1 class="form-header">Login</h1>
        <form method="POST" class="form">
            {#if form && !form.success}
            <ul>
                {#each form.errors as error}
                    <li>{error}</li>
                {/each}
            </ul>
            {/if}
            <label for="email">
                <span class="label-header">
                    Email
                </span>
                <input name="email" type="email" required>
            </label>
            <label for="password">
                <span class="label-header">
                    Password
                </span>
                <input name="password" type="password" required>
            </label>
            <span>No account? <a href="/accounts/register">Create account!</a></span>
            <button class="button">
                Login
            </button>
        </form>
    </div>
</div>
