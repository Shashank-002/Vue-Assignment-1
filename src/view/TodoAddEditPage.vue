<template>
    <div class="add-update-project-container">
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" id="title" v-model="project.name" @input="validateField('name')"
                    placeholder="Enter project title" />
                <p v-if="errors.title" class="error-message">{{ errors.title }}</p>
            </div>

            <div class="form-group">
                <label for="details">Details</label>
                <textarea id="details" v-model="project.details" placeholder="Enter project details"
                    @input="resizeTextarea, validateField('details')" ref="detailsTextarea"></textarea>
                <p v-if="errors.details" class="error-message">{{ errors.details }}</p>
            </div>

            <div class="add-update-button-container">
                <button type="submit" class="add-update-button">{{ isEditMode ? 'Update Project' : 'Add Project'
                    }}</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'TodoAddEditPage',
    data() {
        return {
            project: { name: '', details: '', status: 'ongoing' },
            errors: {
                title: '',
                details: ''
            },
            isEditMode: false,
            id: null
        };
    },

    methods: {
        validateField(field) {
            if (field === 'name') {
                this.errors.title = this.project.name.trim() ? '' : 'This field is required';
            }
            if (field === 'details') {
                this.errors.details = this.project.details.trim() ? '' : 'This field is required';
            }
        },

        validateForm() {
            this.validateField('name');
            this.validateField('details');

            return !this.errors.title && !this.errors.details;
        },

        submitForm() {
            if (this.validateForm()) {
                const projects = JSON.parse(localStorage.getItem('projects')) || [];

                if (this.isEditMode && this.id !== null) {
                    const projectIndex = projects.findIndex(project => project.id === this.id);

                    // If the project is found, update it
                    if (projectIndex !== -1) {
                        projects[projectIndex] = { ...this.project, id: this.id };
                    }


                } else {
                    const newProject = { ...this.project, id: Date.now() };
                    projects.push(newProject)
                }
                localStorage.setItem('projects', JSON.stringify(projects));
                this.$router.push('/');
            }
        },

        resizeTextarea() {
            const textarea = this.$refs.detailsTextarea;
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        }
    },
    mounted() {
        // Get the id from the route parameter
        this.id = this.$route.params.id !== undefined ? Number((this.$route.params.id)) : null;

        if (this.id !== null) {
            const projects = JSON.parse(localStorage.getItem('projects')) || [];
            const projectToEdit = projects.find(project => project.id === (this.id)); // Find the project by id
            if (projectToEdit) {
                this.project = { ...projectToEdit };
                this.isEditMode = true;
            } else {
                alert(`Project not found.`);
                this.$router.push('/');
            }
        }
    },
};
</script>


<style scoped>
.add-update-project-container {
    padding: 30px;
    margin-top: 50px;
    margin-bottom: 25px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    width: 92%;
}

.form-group {
    width: 100%;
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 5px;
    text-transform: uppercase;
    color: rgb(181, 177, 177);
    font-weight: 600;
    font-size: 0.9rem;
}

input {
    width: 97%;
    border: none;
    background-color: #f9f9f9;
    border-bottom: 1px solid #ddd;
    padding: 10px;
    font-size: 1rem;
    transition: border-color 0.3s, box-shadow 0.3s;
}

textarea {
    width: 97%;
    min-height: 80px;
    background-color: #f9f9f9;
    border: 2px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
    padding: 10px;
    transition: border-color 0.3s, box-shadow 0.3s;
    overflow: hidden;
}


input:focus,
textarea:focus {
    border-color: #4caf50;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
    outline: none;
}

.add-update-button-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.add-update-button {
    padding: 12px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
}

.add-update-button:hover {
    background-color: #45a049;
}

.error-message {
    color: red;
    font-size: 0.85rem;
    margin-top: 5px;
}

@media (max-width:1024px) {
    .add-update-project-container {
        width: 88%;
    }

    h2 {
        font-size: 1.5rem;
    }
}

@media (max-width:575px) {
    .add-update-project-container {
        width: 82%;
    }
}

@media (max-width:425px) {
    .add-update-project-container {
        width: 79%;
    }
}

@media (max-width:375px) {
    .add-update-project-container {
        width: 75%;
    }
}
</style>