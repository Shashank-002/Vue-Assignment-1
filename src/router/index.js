import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Projects",
    component: () => import("../view/TodoProjectList.vue"), 
  },
  {
    path: "/add",
    name: "AddProject",
    component: () => import("../view/TodoAddEditPage.vue"), 
    props: { isEditMode: false },
  },
  {
    path: "/edit/:id",
    name: "EditProject",
    component: () => import("../view/TodoAddEditPage.vue"), 
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
