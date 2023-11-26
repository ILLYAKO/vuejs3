<template>
  <List :items="users" :fields="['username', 'name']">
    <template #item="{ item: user }">
      {{ hello }} {{ user.name }} ({{ user.username }})
    </template>
  </List>
  <hr />
  <List :items="todos" :fields="['title']">
    <template #item="slotProps">
      <my-todo :item="slotProps.item" />
    </template>
  </List>
</template>

<script>
import List from "./components/MyList.vue";
// import User from "./components/MyUser.vue";
import MyTodo from "./components/MyTodo.vue";

import { loadUsers, loadTodos } from "./api.js";
export default {
  name: "App",
  components: {
    List,
    MyTodo,
  },
  data() {
    return { users: [], todos: [], hello: "world" };
  },

  mounted() {
    loadUsers().then((users) => {
      this.users = users;
    });
    loadTodos().then((todos) => {
      this.todos = todos;
    });
  },
};
</script>

