var Backbone = require('backbone');
var IngredientCollection = require('./ingredient').IngredientCollection;

var Recipe = Backbone.Model.extend({
  defaults: function() {
    return {
    name: 'recipe',
    servings: 1,
    ingredients: new IngredientCollection()
  }
}
})
