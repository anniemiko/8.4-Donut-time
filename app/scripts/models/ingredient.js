var Backbone = require('backbone');
var parse = require('../setup');
var Fraction = require('fraction.js')

var Ingredient = Backbone.Model.extend({
  idAttribute: 'objectId',
  qtyDisplay: function(factor){
    factor = factor || 1;
    var qtyDisplay = Fraction(factor * this.get('qty'))
    return qtyDisplay.toFraction(true);
  },
  defaults: function() {
    return {
    name: 'ingredient',
    units: 'cups',
    unitQuantity: 1
  }
}
})

var IngredientCollection = Backbone.Collection.extend({
  model: Ingredient,
  url: function(){
    return parse.BASE_API_URL + '/Baty';
  },
  parse: function(data){
    return data.results;
  }
});

module.exports = {
  Ingredient,
  IngredientCollection
}
