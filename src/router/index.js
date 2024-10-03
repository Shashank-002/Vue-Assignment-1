import { createRouter, createWebHashHistory } from 'vue-router';
import Projects from '../components/TodoProjectManagement.vue';
import AddProject from '../components/AddProject.vue';

const routes = [
  {
    path: '/',
    name: 'Projects',
    component: Projects,
  },
  {
    path: '/add',
    name: 'AddProject',
    component: AddProject,
    props: { isEditMode: false },
  },
  {
    path: '/edit/:index',
    name: 'EditProject',
    component: AddProject,
    props: route => ({
      isEditMode: true,
      index: parseInt(route.params.index)
    }),
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
