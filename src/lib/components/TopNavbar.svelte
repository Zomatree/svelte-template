<script lang="ts">
    import type { User } from "$lib/types";
	import { tobase64 } from "$lib/utils";
    import DefaultAvatar from "$lib/assets/default-avatar.png";
    export let user: User | null;

    export let avatar = user && user.avatar ? tobase64(user.avatar_format!, user.avatar) : DefaultAvatar;
</script>

<style lang="scss">
    .top-navbar {
        width: 100%;
        height: 50px;
        background-color: var(--grey-4);
        display: flex;
        justify-content: space-between;
    }

    .navbar-title {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 10px;
        font-weight: 500;
        font-size: 20px;
    }

    .navbar-account {
        display: flex;
        align-items: center;
    }

    .account-buttons {
        display: flex;
        flex-direction: column;
    }

    .avatar-link {
        height: 80%;
        padding: 10px;
    }

    .avatar {
        border-radius: 50%;
        height: 40px;
    }
</style>

<div class="top-navbar">
    <div class="navbar-title">
        Project Name
    </div>
    <div class="navbar-account">
        {#if user}
            <div class="account-buttons">
                <a href="/accounts/settings" class="orange link">{user.username}</a>
                <a href="/accounts/logout" class="link">Logout</a>
            </div>
        {:else}
            <div class="account-buttons">
                <a href="/accounts/login" class="link">Login</a>
                <a href="/accounts/register" class="link orange">Register</a>
            </div>
        {/if}
        <a href="/accounts/settings" class="avatar-link">
            <img src={ avatar } alt="avatar" class="avatar"/>
        </a>
    </div>
</div>
