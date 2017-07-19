(function () {
    'use strict';

    angular.module('todoApp', [])
        .controller('TodoListController', function () {
            var todoList = this;
            
            // Default todos
            todoList.todos = [
                {text: 'learn AngularJS', done: true},
                {text: 'build an AngularJS application', done: false}
            ];

            todoList.addTodo = function () {
                todoList.todos.push({
                    text: todoList.todoText,
                    done: false
                });

                // Reset the todoText
                todoList.todoText = '';
            };

            todoList.remaining = function () {
                var count = 0;
                
                angular.forEach(todoList.todos, function (todo) {
                    count += todo.done ? 1 : 0;
                });
                return count;
            };

            todoList.archive = function () {
                var oldTodos = todoList.todos;
                todoList.todos = [];
                angular.forEach(oldTodos, function (todo) {
                    if (!todo.done) {
                        todoList.todos.push(todo);
                    }
                });
            };
        });
}());