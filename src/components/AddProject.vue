<template>
    <div class="add-project-container">
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="title">Project Title</label>
                <input type="text" id="title" v-model="projectTitle" placeholder="Enter project title" required />
            </div>

            <div class="form-group">
                <label for="details">Project Details</label>
                <textarea id="details" v-model="projectDetails" placeholder="Enter project details" required></textarea>
            </div>

            <button type="submit">Add Project</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'AddProject',
    data() {
        return {
            projectTitle: '',
            projectDetails: ''
        };
    },
    methods: {
        submitForm() {
            // const newProject = {
            //   name: this.projectTitle,
            //   details: this.projectDetails,
            //   status: 'ongoing'
            // };

            this.$router.push('/');
        }
    }
};
</script>

<style scoped>
.add-project-container {
    padding: 20px;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input,
textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    padding: 10px 20px;
    background-color: green;
    color: white;
    border: none;
    cursor: pointer;
}
</style>