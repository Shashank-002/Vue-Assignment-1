<template>
    <div class="app-container mt-24 p-5 bg-gray-100 w-auto mx-2 md:w-3/4 md:mx-auto font-sans">
        <div class="nav flex gap-5 my-2 justify-center">
            <router-link to="/" class="nav-link text-gray-500 text-xl pb-1 border-b-2 border-transparent"
                active-class="border-green-500" exact>
                Projects
            </router-link>
            <router-link to="/add" class="nav-link text-gray-500 text-xl pb-1 border-b-2 border-transparent"
                active-class="border-green-500">
                Add a New Project
            </router-link>
        </div>
        <router-view />
    </div>
</template>

<style scoped>
.nav-link.router-link-active {
    color: gray;
}
</style>
