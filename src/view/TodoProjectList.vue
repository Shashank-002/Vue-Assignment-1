<template>
    <div class="projects-container">
        <div class="filter-buttons">
            <button @click="setFilter('all')" :class="{ active: filter === 'all' }">View All</button>
            <button @click="setFilter('completed')" :class="{ active: filter === 'completed' }">Completed</button>
            <button @click="setFilter('ongoing')" :class="{ active: filter === 'ongoing' }">Ongoing</button>
        </div>


        <div v-if="filteredProjects && filteredProjects.length === 0" class="no-projects-message">
            No projects yet. Add a new one!
        </div>

        <div v-else>
            <div v-for="project in filteredProjects" :key="project.id" class="project-item"
                :class="{ 'border-green': project.status === 'completed', 'border-red': project.status !== 'completed' }">
                <div class="project-header">
                    <h4 @click="handleToggleDetails(project.id)">{{ project.name }}</h4>
                    <div class="flex">
                        <button @click="deleteProject(project.id)" class="icon">
                            <font-awesome-icon :icon="['fas', 'trash']" />
                        </button>
                        <button @click="editProject(project.id)" class="icon">
                            <font-awesome-icon :icon="['fas', 'pen']" />
                        </button>
                        <button @click="toggleStatus(project.id)" class="icon">
                            <span v-if="project.status === 'completed'" class="change-color">
                                <font-awesome-icon :icon="['fas', 'check']" />
                            </span>
                            <span v-else>
                                <font-awesome-icon :icon="['fas', 'check']" />
                            </span>
                        </button>
                    </div>
                </div>
                <p v-if="project.showDetails" class="project-details">{{ project.details }}</p>
            </div>
        </div>
        <!-- <router-view /> -->
    </div>
</template>

<script>
export default {
    name: 'TodoProjectList',
    data() {
        return {
            filter: 'all',
            projects: []

        };
    },
    computed: {
        filteredProjects() {
            return this.filter === 'all' ? this.projects : this.projects.filter(project => project.status === this.filter);
        },
    },
    methods: {
        saveToLocalStorage() {
            // Save projects to localStorage
            localStorage.setItem('projects', JSON.stringify(this.projects));
        },
        setFilter(status) {
            this.filter = status;
        },
        deleteProject(id) {
            // this.projects.splice(index, 1);
            this.projects = this.projects.filter(project => project.id !== id);
            this.saveToLocalStorage();
        },
        toggleStatus(id) {
            const project = this.projects.find(project => project.id === id);
            if (project) {
                project.status = project.status === 'completed' ? 'ongoing' : 'completed';
                this.saveToLocalStorage();
            } else {
                console.error(`Project with ID ${id} does not exist.`);
            }
        },
        editProject(id) {
            const projectIndex = this.projects.findIndex(project => project.id === id);
            if (projectIndex !== -1) {
                this.$router.push({
                    name: 'EditProject',
                    params: { index: projectIndex }
                });
            } else {
                console.error(`Project with ID ${id} does not exist.`);
            }
        },
        handleToggleDetails(id) {
            const project = this.projects.find(project => project.id === id);
            if (project) {
                project.showDetails = !project.showDetails;
            }
        },
    },
    mounted() {
        const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
        this.projects = storedProjects;
    },
};
</script>

<style scoped>
.projects-container {
    padding: 20px;
}

.filter-buttons {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
}

.filter-buttons button {
    padding: 10px;
    background-color: rgb(236, 233, 233);
    border: none;
    cursor: pointer;
    font-weight: 600;
    text-transform: uppercase;
}

.filter-buttons button.active {
    background-color: rgb(236, 233, 233);
    color: black;
}

.project-item {
    display: flex;
    flex-direction: column;
    padding: 2px 15px;
    border: 1px solid #eee;
    border-radius: 5px;
    margin-bottom: 10px;
    background-color: #fafafa;
    border-left: 5px solid;
}

h4 {
    font-size: 20px;
    cursor: pointer;
}

.icon {
    font-size: 20px;
}

.border-green {
    border-left-color: green;
}

.border-red {
    border-left-color: red;
}

.project-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    white-space: normal;
    word-wrap: break-word;
    word-break: break-word;
}

.flex {
    display: flex;
    gap: 10px;
}

button {
    border: none;
    color: gray;
    background-color: #fafafa;
}

.change-color {
    color: green;
}

.project-details {
    margin-top: 0px;
    font-size: 16px;
    color: gray;
    overflow: hidden;
    white-space: normal;
    word-wrap: break-word;
    word-break: break-word;
}

.no-projects-message {
    text-align: center;
    font-size: 18px;
    color: red;
    margin-top: 20px;
}


@media(max-width:575px) {
    .filter-buttons {
        gap: 8px;
    }

    .projects-container {
        padding: 10px;
    }

    .filter-buttons button {
        font-size: 12px;
    }
}

@media(max-width:375px) {
    .filter-buttons {
        gap: 0px;
    }

    .filter-buttons button {
        font-size: 10px;
    }
}
</style>