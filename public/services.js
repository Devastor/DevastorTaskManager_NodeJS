angular.module('taskManagerApp')
.service('TaskService', function($http) {
    this.getTasks = function() {
        return $http.get('/api/tasks');
        // Получение всех задач с сервера
    };

    this.addTask = function(task) {
        return $http.post('/api/tasks', task);
        // Добавление новой задачи на сервер
    };

    this.updateTask = function(task) {
        return $http.put('/api/tasks/' + task._id, task);
        // Обновление задачи на сервере
    };

    this.deleteTask = function(taskId) {
        return $http.delete('/api/tasks/' + taskId);
        // Удаление задачи с сервера
    };
});
