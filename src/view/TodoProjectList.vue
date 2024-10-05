<template>
    <div class="projects-container">
        <div class="filter-buttons">
            <button v-for="option in filterOptions" :key="option" @click="setFilter(option)"
                :class="{ active: filter === option }">
                {{ option }}
            </button>
        </div>


        <div v-if="filteredProjects && filteredProjects.length === 0" class="no-projects-message">
            No projects yet. Add a new one!
        </div>

        <div v-else>
            <div v-for="project in filteredProjects" :key="project.id" class="project-item"
                :class="project.status === 'completed' ? 'border-green' : 'border-red'">
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
                            <font-awesome-icon :icon="['fas', 'check']"
                                :class="project.status === 'completed' ? 'change-color' : ''" />
                        </button>
                    </div>
                </div>
                <p v-if="project.showDetails" class="project-details">{{ project.details }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TodoProjectList',
    data() {
        return {
            filterOptions: ['all', 'completed', 'ongoing'],
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
        setFilter(option) {
            this.filter = option; 
        },
        saveToLocalStorage() {
            // Save projects to localStorage
            localStorage.setItem('projects', JSON.stringify(this.projects));
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

            this.$router.push({
                name: 'EditProject',
                params: { id }
            });
        },
        handleToggleDetails(id) {
            const project = this.projects.find(project => project.id === id);
            if (project) {
                project.showDetails = !project.showDetails;
            }
        },
    },
    mounted() {
        this.projects = JSON.parse(localStorage.getItem('projects')) || [];
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