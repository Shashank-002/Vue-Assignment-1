<template>
  <div class="projects-container">
    <div class="filter-buttons">
      <button @click="setFilter('all')" :class="{ active: filter === 'all' }">View All</button>
      <button @click="setFilter('completed')" :class="{ active: filter === 'completed' }">Completed</button>
      <button @click="setFilter('ongoing')" :class="{ active: filter === 'ongoing' }">Ongoing</button>
    </div>

    <div v-if="filteredProjects.length === 0" class="no-projects-message">
      No projects yet. Add a new one!
    </div>

    <div v-for="(project, index) in filteredProjects" :key="index" class="project-item"
      :class="{ 'border-green': project.status === 'completed', 'border-red': project.status !== 'completed' }">
      <div class="project-header">
        <h4 @click="showDetails(index)">{{ project.name }}</h4>
        <div class="flex">
          <button @click="deleteProject(index)" class="icon">
            <font-awesome-icon :icon="['fas', 'trash']" />
          </button>
          <button @click="editProject(index)" class="icon">
            <font-awesome-icon :icon="['fas', 'pen']" />
          </button>
          <button @click="toggleStatus(index)" class="icon">
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
</template>

<script>
export default {
  name: 'TodoProjectManagement',
  props: {
    projects: {
      type: Array,
      required: true,
      showDetails: false
    },
  },
  data() {
    return {
      filter: 'all',
    };
  },
  computed: {
    filteredProjects() {
      return this.filter === 'all' ? this.projects : this.projects.filter(project => project.status === this.filter);
    },
  },
  methods: {
    setFilter(status) {
      this.filter = status;
    },
    deleteProject(index) {
      this.$emit('delete-project', index);
    },
    toggleStatus(index) {
      this.$emit('toggle-status', { index });
    },
    editProject(index) {
      this.$router.push({ name: 'EditProject', params: { index } });
    },
    showDetails(index) {
      this.$emit('toggle-details', index);
    }
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
    gap: 12px;
  }

  .projects-container {
    padding: 10px;
  }
}

@media(max-width:375px) {
  .filter-buttons {
    gap: 0px;
  }
}
</style>
