import { createRouter, createWebHashHistory } from 'vue-router';
import Projects from '../view/TodoProjectList.vue';
import AddEditProject from '../view/TodoAddEditPage.vue';

const routes = [
  {
    path: '/',
    name: 'Projects',
    component: Projects,
  },
  {
    path: '/add',
    name: 'AddProject',
    component: AddEditProject,
    props: { isEditMode: false },
  },
  {
    path: '/edit/:index',
    name: 'EditProject',
    component: AddEditProject,
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
