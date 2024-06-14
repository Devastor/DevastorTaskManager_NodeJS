angular.module('taskManagerApp')
.controller('TaskController', function($scope, TaskService) {
    $scope.tasks = [];
    // Инициализация пустого массива задач
    $scope.newTask = { completed: false };
    // Инициализация новой задачи с состоянием "невыполнена"

    $scope.loadTasks = function() {
        TaskService.getTasks().then(function(response) {
            $scope.tasks = response.data;
            // Загрузка задач с сервера и сохранение в scope
            setTimeout(function() {
                // Добавление класса для анимации после загрузки задач
                document.querySelectorAll('.task').forEach(function(taskElement) {
                    taskElement.classList.add('show');
                });
            }, 100);
        });
    };

    $scope.addTask = function() {
        if ($scope.newTask.title) {
            TaskService.addTask($scope.newTask).then(function() {
                $scope.loadTasks();
                // Перезагрузка списка задач после добавления новой
                $scope.newTask = { completed: false };
                // Сброс формы новой задачи
            });
        }
    };

    $scope.updateTask = function(task) {
        TaskService.updateTask(task).then(function() {
            $scope.loadTasks();
            // Перезагрузка списка задач после обновления
        });
    };

    $scope.deleteTask = function(task) {
        // Анимация перед удалением задачи
        const taskElement = document.getElementById(task._id);
        taskElement.classList.remove('show');
        taskElement.classList.add('hide');
        
        setTimeout(function() {
            TaskService.deleteTask(task._id).then(function() {
                $scope.loadTasks();
                // Перезагрузка списка задач после удаления
            });
        }, 200); // Задержка перед удалением для анимации
    };

    $scope.loadTasks();
    // Загрузка задач при инициализации контроллера
});
