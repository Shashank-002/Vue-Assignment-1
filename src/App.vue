<template>
    <div class="app-container">
        <div class="nav">
            <router-link to="/" class="nav-link" active-class="active">Projects</router-link>
            <router-link to="/add" class="nav-link" active-class="active">Add a New Project</router-link>
        </div>

        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'App',
};
</script>

<style scoped>
.app-container {
    font-family: Arial, sans-serif;
    padding: 20px;
}

.nav {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
}

.nav-link {
    text-decoration: none;
    color: gray;
    font-size: 18px;
}

.nav-link.active {
    color: green;
    border-bottom: 2px solid green;
}
</style>