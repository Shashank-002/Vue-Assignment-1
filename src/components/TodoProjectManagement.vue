<template>
  <div class="projects-container">
    <div class="filter-buttons">
      <button @click="setFilter('all')" :class="{ active: filter === 'all' }">View All</button>
      <button @click="setFilter('completed')" :class="{ active: filter === 'completed' }">Completed</button>
      <button @click="setFilter('ongoing')" :class="{ active: filter === 'ongoing' }">Ongoing</button>
    </div>

    <!-- Project List -->
    <div v-for="(project, index) in filteredProjects" :key="index" class="project-item">
      <span>{{ project.name }}</span>
      <div class="flex">
        <button @click="deleteProject(index)"><font-awesome-icon :icon="['fas', 'trash']" /></button>
        <button @click="toggleStatus(index)">
          <span v-if="project.status === 'completed'" class="change-color"><font-awesome-icon
              :icon="['fas', 'check']" /></span>
          <span v-else><font-awesome-icon :icon="['fas', 'check']" /> </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import projectDetail from '../data/project.json'
export default {
  name: 'TodoProjectManagement',
  data() {
    return {
      filter: 'all',
      projects: projectDetail
    };
  },
  computed: {
    filteredProjects() {
      if (this.filter === 'all') {
        return this.projects;
      } else {
        return this.projects.filter(project => project.status === this.filter);
      }
    }
  },
  methods: {
    setFilter(status) {
      this.filter = status;
    },
    deleteProject(index) {
      this.projects.splice(index, 1);
    },
    toggleStatus(index) {
      const project = this.projects[index];
      project.status = project.status === 'completed' ? 'ongoing' : 'completed';
    }
  }
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
  background-color: lightgray;
  border: none;
  cursor: pointer;
}

.filter-buttons button.active {
  background-color: green;
  color: white;
}

.project-item {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border: 1px solid #eee;
  margin-bottom: 10px;
  background-color: #fafafa;
}

.flex {
  display: flex;
  gap: 10px;
}

button {
  border: none;
  color: gray;
}

.change-color {
  color: green;
}
</style>
