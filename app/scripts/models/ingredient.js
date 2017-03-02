var Backbone = require('backbone');

var Ingredient = Backbone.Model.extend({
  defaults: function() {
    return {
    name: 'ingredient',
    units: 'cups',
    unitQuantity: 1
  }
}
})

var IngredientsCollection = Backbone.Collections.extend({
  model: Ingredient
});

module.exports = {
  Ingredient,
  IngredientsCollection
}
