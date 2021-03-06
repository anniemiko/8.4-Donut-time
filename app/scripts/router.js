var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var parse = require('./setup');

var LoginContainer = require('./components/login.jsx').LoginContainer;
var RecipeContainer = require('./components/recipe.jsx').RecipeContainer;
var MainContainer = require('./components/main.jsx').MainContainer;
var RecipeCardContainer = require('./components/recipe-card.jsx').RecipeCardContainer;
var RecipeForm = require('./components/recipe-form.jsx').RecipeForm;

var User = require('./models/user').User;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'login',
    'recipes/': 'recipes',
    'main/': 'main',
    'recipes/:id/': 'recipecard',
    'recipes/form/': 'recipeform'
  },
  initialize: function(){
    if(User.current()){
      var user = User.current();
      parse.setup({sessionId: user.get('sessionToken'}));
    }else{
    parse.setup({
      BASE_API_URL: 'https://tiny-parse-server.herokuapp.com'
    });
    }
  },
  login: function(){
    ReactDOM.render(
      React.createElement(LoginContainer),
      document.getElementById('app')
    )
  },
  recipes: function(){
    ReactDOM.render(
      React.createElement(RecipeContainer),
      document.getElementById('app')
    )
  },
  main: function(){
    ReactDOM.render(
      React.createElement(MainContainer),
      document.getElementById('app')
    )
  },
  recipecard: function(id){
    ReactDOM.render(
      React.createElement(RecipeAdjuster, {id: id}),
      document.getElementById('app')
    )
  },
  recipeform: function(id){
    ReactDOM.render(
      React.createElement(RecipeForm, {id: id}),
      document.getElementById('app')
    )
  }
})

var router = new AppRouter();

module.exports = router
