var Backbone = require('backbone');
var parse = require('../setup');
var IngredientCollection = require('./ingredient').IngredientCollection;

var Recipe = Backbone.Model.extend({
  idAttribute: 'objectId',
  defaults: function() {
    return {
    name: 'recipe',
    servings: 1,
    ingredients: new IngredientCollection(),
    image: 'https://unsplash.it/300/300'
  }
}
})


var RecipeCollection = Backbone.Collection.extend({
  model: Recipe,
  url: function(){
    return parse.BASE_API_URL + '/classes/Baty';
  },
  parse: function(data){
    return data.results;
  }
});

module.exports = {
  Recipe,
  RecipeCollection
}
