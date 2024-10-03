<template>
  <div class="add-project-container">
    <h2 v-if="isEditMode">Edit Project</h2>
    <h2 v-else>Add Project</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="project.name" placeholder="Enter project title" required />
      </div>

      <div class="form-group">
        <label for="details">Details</label>
        <textarea id="details" v-model="project.details" placeholder="Enter project details"></textarea>
      </div>

      <button type="submit">{{ isEditMode ? 'Update Project' : 'Add Project' }}</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AddProject',
  props: {
    projects: {
      type: Array,
      required: true
    },
    isEditMode: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      project: { name: '', details: '', status: 'ongoing' },
    };
  },
  watch: {
    index: {
      handler(newVal) {
        // Update project data accordingly when the index changes
        if (newVal !== null && this.projects[newVal]) {
          this.project = { ...this.projects[newVal] };
        } else {
          this.project = { name: '', details: '', status: 'ongoing' };
        }
      },
      immediate: true,
    },
  },
  methods: {
    submitForm() {
      if (this.isEditMode && this.index !== null) {
        this.$emit('update-project', { ...this.project }, this.index);
      } else {
        this.$emit('add-project', { ...this.project });
      }

      this.$router.push('/');
    }
  }
};
</script>


<style scoped>
.add-project-container {
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 92%;
}

h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 1.8rem;
  text-align: center;
}

.form-group {
  width: 100%;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  text-transform: uppercase;
  color: #555;
  font-size: 0.9rem;
}

input {
  width: 100%;
  border: none;
  border-bottom: 1px solid gray;
  padding: 10px;
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;
}

textarea {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;
}

input:focus,
textarea:focus {
  border-color: #4caf50;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
  outline: none;
}

button {
  padding: 12px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background-color: #45a049;
}

@media (max-width:1024px) {
  .add-project-container {
    width: 88%;
  }

  h2 {
    font-size: 1.5rem;
  }
}

@media (max-width:575px) {
  .add-project-container {
    width: 82%;
  }

  h2 {
    font-size: 1.3rem;
  }
}

@media (max-width:425px) {
  .add-project-container {
    width: 79%;
  }

  h2 {
    font-size: 1.3rem;
  }
}

@media (max-width:375px) {
  .add-project-container {
    width: 75%;
  }

  h2 {
    font-size: 1.3rem;
  }
}
</style>
