<template>
    <div class="app-container">
        <div class="nav">
            <router-link to="/" class="nav-link" active-class="active">Projects</router-link>
            <router-link to="/add" class="nav-link" active-class="active">Add a New Project</router-link>
        </div>
        <router-view />
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
    background-color: rgb(236, 233, 233);
    width: 50%;
    margin: 100px auto;
}

.nav {
    display: flex;
    gap: 20px;
    margin: 10px auto;
    justify-content: center;
}

.nav-link {
    text-decoration: none;
    color: gray;
    font-size: 20px;
    padding-bottom: 3px;
}

.nav-link.active {
    color: gray;
    border-bottom: 2px solid green;
}

@media (max-width:768px) {
    .app-container {
        width: 70%;
    }

    .nav-link {
        font-size: 16px;
    }
}

@media (max-width:575px) {
    .nav-link {
        font-size: 14px;
    }

    .app-container {
        width: 80%;
    }
}
</style>
