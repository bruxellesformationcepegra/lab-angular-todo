var app = angular.module("todoApp", []);

app.controller("TodoController", function(){
    var todoController = this;
    todoController.newTaskText = "";
    todoController.todos = [
        {text:'apprendre Angular', done:true},
        {text:'faire un projet avec Angular', done:false}];
    todoController.remaining = function(){
        var count = 0;
        angular.forEach(todoController.todos, function(todo){
            count += todo.done ? 0 : 1; 
        });
        return count;
    };
    todoController.add = function(){
        if(todoController.newTaskText){
            var newTask = {
                text: todoController.newTaskText,
                done: false
            };
            todoController.todos.push(newTask);
            todoController.newTaskText = "";
        }
    };
    todoController.archive = function(){
         var oldTodos = todoController.todos;
         todoController.todos = [];
         angular.forEach(oldTodos, function(task){
            if(!task.done){
                todoController.todos.push(task);
            }
         });
    };
});

