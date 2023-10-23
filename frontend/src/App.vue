<template>
  <div>
    <h1>ToDo приложение</h1>

    <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Добавить задачу" />
    <button @click="addTodo">Добавить</button>
    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        {{ todo.text }}
        <button @click="deleteTodo(index)">Удалить</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTodo: '',
      todos: []
    };
  },
  mounted() {
    this.fetchTodos();
  },
  methods: {
    async fetchTodos() {
      try {
        const response = await fetch('http://localhost:5555/todos'); // Используем правильный путь к вашему API
        if (response.ok) {
          this.todos = await response.json();
        }
      } catch (error) {
        console.error('Ошибка при получении задач:', error);
      }
    },
    async addTodo() {
      if (this.newTodo.trim() === '') return;

      try {
        const response = await fetch('http://localhost:5555/todos', { // Используем правильный путь к вашем API
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ text: this.newTodo })
        });

        if (response.ok) {
          this.newTodo = '';
          this.fetchTodos();
        }
      } catch (error) {
        console.error('Ошибка при добавлении задачи:', error);
      }
    },
    async deleteTodo(index) {
      const todoId = this.todos[index].id; // Используем правильное свойство для идентификации задач

      try {
        const response = await fetch(`http://localhost:5555/todos/${todoId}`, { // Используем правильный путь к вашем API
          method: 'DELETE'
        });

        if (response.ok) {
          this.fetchTodos();
        }
      } catch (error) {
        console.error('Ошибка при удалении задачи:', error);
      }
    }
  }
};
</script>

<style>
/* Можно добавить стили по желанию */
</style>
