<script lang="ts">
    export let errors: string[] = [];
</script>

<div class="container">
    <div class="inner-container">
        <h1 class="form-header">Register</h1>
        <form method="POST" class="form">
            {#if errors}
            <ul>
                {#each errors as error}
                    <li>{error}</li>
                {/each}
            </ul>
            {/if}
            <label for="username">
                <span class="label-header">
                    Username
                </span>
                <input name="username" required>
            </label>
            <label>
                <span class="label-header">
                    Profile Picture
                </span>
                <input type="file" accept="image/png, image/jpeg">
            </label>
            <button class="button">
                Next
            </button>
        </form>
    </div>
</div>
