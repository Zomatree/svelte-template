<script lang="ts">
    import type { ActionData } from "./$types";

    export let errors: ActionData;
</script>

<div class="container">
    <div class="inner-container">
        <h1 class="form-header">Login</h1>
        <form method="POST" class="form">
            {#if errors}
            <ul>
                {#each errors as error}
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
