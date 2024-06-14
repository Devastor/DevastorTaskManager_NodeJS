angular.module('taskManagerApp', ['ngRoute'])
.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'tasks.html',
            controller: 'TaskController'
        })
        // Настройка маршрутов приложения, указываем какой шаблон и контроллер использовать для корневого URL.
        .otherwise({
            redirectTo: '/'
        });
        // Если маршрут не найден, перенаправляем на корневой URL.
});
