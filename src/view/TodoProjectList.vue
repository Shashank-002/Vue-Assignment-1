<template>
    <div class="projects-container p-5">
        <div class="filter-buttons flex gap-5 mb-5">
            <button v-for="option in filterOptions" :key="option" @click="setFilter(option)" :class="{
                'bg-gray-100 text-black': filter === option,
                'bg-gray-100 text-gray-400': filter !== option,
            }" class="py-2 uppercase font-semibold text-xs md:px-4 md:text-sm">
                {{ option }}
            </button>
        </div>

        <div v-if="filteredProjects && filteredProjects.length === 0" class="text-center text-red-500 text-lg mt-5">
            No projects yet. Add a new one!
        </div>

        <div v-else>
            <div v-for="project in filteredProjects" :key="project.id" :class="[
                'project-item flex flex-col p-4 mb-4 bg-gray-50 border border-gray-300 rounded-lg',
                project.status === 'completed'
                    ? 'border-l-4 border-green-500'
                    : 'border-l-4 border-red-500',
            ]">
                <div class="project-header flex justify-between items-center ">
                    <h4 @click="handleToggleDetails(project.id)"
                        class="text-md cursor-pointer break-words overflow-hidden md:text-xl xl:text-2xl">
                        {{ project.name }}
                    </h4>
                    <div class="flex gap-2 text-sm md:gap-4 md:text-lg">
                        <button @click="openDeleteModal(project.id)" class="text-gray-500">
                            <font-awesome-icon :icon="['fas', 'trash']" />
                        </button>
                        <button @click="editProject(project.id)" class="text-gray-500">
                            <font-awesome-icon :icon="['fas', 'pen']" />
                        </button>
                        <button @click="toggleStatus(project.id)"
                            :class="{ 'text-green-500': project.status === 'completed' }">
                            <font-awesome-icon :icon="['fas', 'check']" />
                        </button>
                    </div>
                </div>
                <p v-if="project.showDetails" class="text-gray-600 mt-2 break-words overflow-hidden text-xs">
                    {{ project.details }}
                </p>
            </div>
        </div>

        <!-- Modal -->
        <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
            <div class="bg-white rounded-lg shadow-lg w-3/4 md:w-3/5 lg:w-2/5  p-6 2xl:w-1/4">
                <h3 class="text-lg font-semibold mb-4">Delete Confirmation</h3>
                <hr class="mt-0 mb-5">
                <p class="text-gray-700 bg-red-300 rounded-md p-3">Are you sure you want to delete this project?</p>
                <hr class="mt-5 mb-0">
                <div class="mt-6 flex justify-end">
                    <button @click="closeDeleteModal"
                        class="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400">
                        Cancel
                    </button>

                    <button @click="confirmDelete"
                        class="bg-red-500 text-white py-2 px-4 ml-2 rounded hover:bg-red-600">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TodoProjectList",
    data() {
        return {
            filterOptions: ["all", "completed", "ongoing"],
            filter: "all",
            projects: [],
            isModalOpen: false,
            projectIdToDelete: null, // Store the ID of the project to delete
        };
    },
    computed: {
        filteredProjects() {
            return this.filter === "all"
                ? this.projects
                : this.projects.filter((project) => project.status === this.filter);
        },
    },
    methods: {
        setFilter(option) {
            this.filter = option;
        },
        saveToLocalStorage() {
            // Save projects to localStorage
            localStorage.setItem("projects", JSON.stringify(this.projects));
        },
        openDeleteModal(id) {
            this.projectIdToDelete = id; // Set the project ID to delete
            this.isModalOpen = true; // Open the modal
        },
        closeDeleteModal() {
            this.isModalOpen = false; // Close the modal
            this.projectIdToDelete = null; // Reset the project ID
        },
        confirmDelete() {
            this.deleteProject(this.projectIdToDelete); // Delete the project
            this.closeDeleteModal(); // Close the modal
        },
        deleteProject(id) {
            this.projects = this.projects.filter((project) => project.id !== id);
            this.saveToLocalStorage();
        },
        toggleStatus(id) {
            const project = this.projects.find((project) => project.id === id);
            if (project) {
                project.status =
                    project.status === "completed" ? "ongoing" : "completed";
                this.saveToLocalStorage();
            } else {
                console.error(`Project with ID ${id} does not exist.`);
            }
        },
        editProject(id) {
            this.$router.push({
                name: "EditProject",
                params: { id },
            });
        },
        handleToggleDetails(id) {
            const project = this.projects.find((project) => project.id === id);
            if (project) {
                project.showDetails = !project.showDetails;
            }
        },
    },
    mounted() {
        this.projects = JSON.parse(localStorage.getItem("projects")) || [];
    },
};
</script>