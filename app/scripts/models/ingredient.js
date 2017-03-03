var Backbone = require('backbone');
var parse = require('../setup');

var Ingredient = Backbone.Model.extend({
  idAttribute: 'objectId',
  defaults: function() {
    return {
    name: 'ingredient',
    units: 'cups',
    unitQuantity: 1
  }
}
})

var IngredientsCollection = Backbone.Collection.extend({
  model: Ingredient,
  url: function(){
    return parse.BASE_API_URL + '/classes/Baty';
  },
  parse: function(data){
    return data.results;
  }
});

module.exports = {
  Ingredient,
  IngredientsCollection
}
