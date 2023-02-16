<script lang="ts">
	import { tobase64 } from "$lib/utils";
    import "./styles.scss";
    import DefaultAvatar from "$lib/assets/default-avatar.png";
	import type { PageParentData } from "./$types";

    export let _data: PageParentData;
    export let data = { user: _data.user!, account: _data.account! }
    export let current_avatar = data.user.avatar_format && data.user.avatar ? tobase64(data.user.avatar_format, data.user.avatar!) : DefaultAvatar
</script>

<div class="settings-container">
    <div class="settings-column">
        <img class="avatar" src={current_avatar} width="200" height="200">
        <button>Remove</button>
        <button class="blue-bg">Upload</button>
    </div>
    <div class="settings-column">
        <p class="settings-header">Username</p>
        <input class="text-input" value={data.user.username}>
        <p class="settings-header">Email</p>
        <input class="text-input" value={data.account.email}>
    </div>
    <div class="settings-column">
        <p class="settings-header">Password</p>
        <div class="update-password-container">
            <input class="text-input" type="password" value="............" disabled>
            <button class="blue-bg">Update Password</button>
        </div>

        <div class="control-buttons">
            <button class="blue-bg">Save</button>
            <button>Cancel</button>
        </div>
    </div>
</div>
