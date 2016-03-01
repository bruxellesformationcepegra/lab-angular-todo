# Ma todo list

Débuter avec le modèle MVC et AngularJS avec cette todo list toute simple ! Vous allez découvrir le principe du *data-binding*, un système très puissant qui permet de mettre à jour l'HTML quand les données de l'application changent et de mettre à jour les données quand il y a des interactions avec l'HTML.

Vous partez d'une page HTML à dynamiser avec Angular 1.X;

##Tâches à réaliser

1. Chargez AngularJS

```javascript
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular.min.js"></script>
```

2. Dites à Angular d'être actif dans cette portion de page en mettant l'attribut `ng-app` sur la balise HTML

```
ng-app="todoApp"
```

3. Nous allons devoir créer notre premier [module](https://docs.angularjs.org/guide/module). Un module est une sorte de "conteneur" pour les différentes partie de votre application. Ici, notre application ne fait qu'une chose donc nous allons faire un module. 

Passez dans `todo.js` pour faire le module todoApp.

```javascript
var todoAppModule = angular.module('todoApp', []);
```

Le nom "todoApp" est le même que celui indiqué dans l'attribute `ng-app`.
Les [] servent à indiquer une liste de **dépendances** dont le module a besoin - ici, rien.

3. [MVC](https://fr.wikipedia.org/wiki/Mod%C3%A8le-vue-contr%C3%B4leur) signifie **M**odèle **V**ue **C**ontrolleur. Dans ce type d'architecture d'application, on sépare 3 domaines différent pour mieux structurer et maintenir l'application: 
- Le **modèle** ça représente les données, ici, les tâches. Les tâches ont une description et un statut (faite/pas faite)
- La **vue** c'est la représentation graphique des données. Ici, les tâches seront affichées sous forme de `<li>`
- Le **controlleur** est le *chef d'orchestre*, c'est le code qui se cache derrière la vue, il va donner les modèles à la vue et gérer les événements déclenchés depuis la vue.

Nous allons donc créer un [controlleur](https://docs.angularjs.org/guide/controller) pour cette application.

```javascript
  todoAppModule.controller('TodoListController', function() {
    
  });
```

4. Il faut maintenant attacher le controlleur au DOM

```
<div ng-controller="TodoListController as todoList">
```

