# Ma todo list

Débuter avec le modèle MVC et AngularJS avec cette todo list toute simple ! Vous allez découvrir le principe du *data-binding*, un système très puissant qui permet de mettre à jour l'HTML quand les données de l'application changent et de mettre à jour les données quand il y a des interactions avec l'HTML.

Vous partez d'une page HTML à dynamiser avec Angular 1.X;

##Tâches à réaliser

### Charger AngularJS

Dans le`head`, rajoutez

```javascript
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular.min.js"></script>
```

### ng-app

Dites à Angular d'être actif dans cette portion de page en mettant l'attribut `ng-app` sur la balise `<html>`

```
ng-app="todoApp"
```

### Le premier module

Nous allons devoir créer notre premier [module](https://docs.angularjs.org/guide/module). Un module est une sorte de "conteneur" pour les différentes partie de votre application. Ici, notre application ne fait qu'une chose donc nous allons faire un module. 

Passez dans `todo.js` pour faire le module todoApp.

```javascript
var todoAppModule = angular.module('todoApp', []);
```

Le nom "todoApp" est le même que celui indiqué dans l'attribute `ng-app`.
Les `[]` servent à indiquer une liste de **dépendances** dont le module a besoin - ici, rien.

### MVC ?

[MVC](https://fr.wikipedia.org/wiki/Mod%C3%A8le-vue-contr%C3%B4leur) signifie **M**odèle **V**ue **C**ontrolleur. Dans ce type d'architecture d'application, on sépare 3 domaines différent pour mieux structurer et maintenir l'application: 
- Le **modèle** ça représente les données, ici, les tâches. Les tâches ont une description et un statut (faite/pas faite)
- La **vue** c'est la représentation graphique des données. Ici, les tâches seront affichées sous forme de `<li>`
- Le **controlleur** est le *chef d'orchestre*, c'est le code qui se cache derrière la vue, il va donner les modèles à la vue et gérer les événements déclenchés depuis la vue.

### Le premier controlleur

Nous allons donc créer un [controlleur](https://docs.angularjs.org/guide/controller) pour cette application.

```javascript
  todoAppModule.controller('TodoListController', function() {
    
  });
```

Il faut maintenant attacher le controlleur au DOM

```
<div ng-controller="TodoListController as todoList">
```

### Ajoutons quelques données

On va maintenant créer quelques données (modèles) pour notre application. Dans le corps du controlleur `TodoListController` dans `todo.js`, rajoutez

```javascript
var todoList = this; //this, c'est le controlleur
todoList.todos = [
  {text:'apprendre Angular', done:true},
  {text:'faire un projet avec Angular', done:false}];
```

### Le premier *data binding*

Maintenant qu'on a des données on va pouvoir dynamiser la liste de tâches dans la page HTML. Ne mettez qu'un seul `<li>` dans la liste et ajoutez lui la *directive* **ng-repeat** 

```
<li ng-repeat="todo in todoList.todos">
```

Cela veut dire que pour chaque objet dans `todos`, Angular va créer une copie de l'élement `<li>`. Qui plus est, quand les données seront modifiées (nouvelle tâche ou tâche effacée) la liste se mettra à jour automatiquement !

`todo in todoList.todos` veut dire que lors de chaque répétition, nous aurons accès aux données de la tâche courante via `todo`. Nous pouvons donc compléter le code du`<li>` en lui donnant le nom de la tâche et son statut (qui aura une influence sur son style) de cette manière 

```
<span class="done-{{todo.done}}">{{todo.text}}</span>
```

Il manque une chose, le fait de pouvoir lier la checkbox qui se trouve en face de la tâche, à la tâche elle-même. De cette manière, quand on cochera la checkbox, la tâche sera considérée comme faite (et inversément). 
De manière similaire, si la tâche est considérée dès le départ comme faite, la checkbox s'affichera cochée.

Pour cela il faut lier le contrôle, la checkbox, à un modèle, la tâche. On va utiliser la directive **ng-model** sur l'`input` et dire qu'on lie la valeur de l'input à la propriété `done`de la tâche.

```
<input type="checkbox" ng-model="todo.done">
```

### La première propriété calculée

Une propriété calculée c'est généralement une propriété dont la valeur renvoyée dépend de valeurs d'autres propriétés. Ici, l'idée c'est de faire une propriété calculée qui va renvoyer le nombre de tâches encore à faire.
Dans la pratique, c'est une fonction. On va donc rajouter une fonction `remaining` au controlleur.

```javascript
todoList.remaining = function() {
  var count = 0;
  angular.forEach(todoList.todos, function(todo) {
    count += todo.done ? 0 : 1;
  });
  return count;
};
```

Et on va l'utiliser maintenant dans l'HTML

```
<span>{{todoList.remaining()}} sur {{todoList.todos.length}} restantes</span>
```

### Le premier submit

Bon ça serait quand même cool de pouvoir rajouter une tâche ! 

De la même manière que précédemment, on va rajouter une fonction dans le controlleur qui va nous permettre de rajouter une tâche à la liste de tâches qu'il possède.

```javascript
todoList.addTodo = function() {
  todoList.todos.push({text:todoList.todoText, done:false});
  todoList.todoText = '';
};
```

Cette fonction va rajouter une nouvelle tâche à `todos`, initialisée à non faite et dont le texte provient de la propriété `todoText` du controlleur. D'où vient cette propriété ? Elle est définie comme modèle du champ texte du formulaire via `ng-model`.

```
<input type="text" size="30" ng-model="todoList.todoText" placeholder="ajouter une nouvelle tâche">
```

Il manque une chose pour que ça marche, il faut dire au formulaire que le submit doit déclencher la méthode `addTodo` via la directive **ng-submit**

```
<form ng-submit="todoList.addTodo()">
```

### La première action au click

Allez, encore un petit pour la route. Il s'agit ici de déclencher du code au click sur un lien pour archiver (effacer) toutes les tâches faites histoire de pouvoir faire de la place.

On va encore rajouter une méthode au controlleur:

```javascript
todoList.archive = function() {
  var oldTodos = todoList.todos;
  todoList.todos = [];
  angular.forEach(oldTodos, function(todo) {
    if (!todo.done) todoList.todos.push(todo);
  });
};
```

Et pour appeler cette méthode il faut utiliser la directive **ng-click** dans le code HTML

```
[ <a href="" ng-click="todoList.archive()">archive</a> ]
```


