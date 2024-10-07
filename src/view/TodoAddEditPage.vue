<template>
    <div class="add-update-project-container bg-white mt-16 mb-10 p-3 md:p-10 rounded-md">
        <form @submit.prevent="submitForm">
            <div class="form-group py-6">
                <label for="title" class="text-gray-400 font-semibold text-xs uppercase md:text-md lg:text-base ">Title</label>
                <input type="text" id="title" v-model="project.name" @input="validateField('name')"
                    placeholder="Enter project title"
                    class="w-full border-b border-gray-300 p-2 focus:border-green-500 focus:outline-none text-sm" />
                <p v-if="errors.title" class="text-red-500 text-sm mt-1">{{ errors.title }}</p>
            </div>

            <div class="form-group">
                <label for="details" class="text-gray-400 font-semibold text-xs md:text-md uppercase lg:text-base">Details</label>
                <textarea id="details" v-model="project.details" placeholder="Enter project details"
                    @input="resizeTextarea, validateField('details')" ref="detailsTextarea"
                    class="w-full min-h-[100px] bg-transparent border-2 border-gray-300 rounded-lg p-2 focus:border-green-500 focus:outline-none text-sm"></textarea>
                <p v-if="errors.details" class="text-red-500 text-sm mt-1">{{ errors.details }}</p>
            </div>

            <div class="add-update-button-container flex justify-center mt-4">
                <button type="submit"
                    class="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-md text-sm md:text-lg">{{
                        isEditMode ? 'Update Project' : 'Add Project' }}</button>
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
                    projects.push(newProject);
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
        this.id = this.$route.params.id !== undefined ? Number(this.$route.params.id) : null;

        if (this.id !== null) {
            const projects = JSON.parse(localStorage.getItem('projects')) || [];
            const projectToEdit = projects.find(project => project.id === this.id); // Find the project by id
            if (projectToEdit) {
                this.project = { ...projectToEdit };
                this.isEditMode = true;
            } else {
                alert(`Project not found.`);
                this.$router.push('/');
            }
        }

        this.$nextTick(() => {
            if (this.$refs.detailsTextarea) {
                this.resizeTextarea();
            }
        });
    },
    watch: {
        'project.details'() {
            this.resizeTextarea();
        }
    }
};
</script>
