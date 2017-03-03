var React = require('react');
var recipe = require('../models/recipe.js');
var IngredientsCollection = require('../models/ingredient.js').IngredientsCollection;

class RecipeContainer extends React.Component {
  constructor(props){
    super(props);
    var ingredientList = new IngredientsCollection();
    // ingredientList.add([
    //   {name: flour, units: cup, unitQuantity: 2},
    //   {name: sugar, units: cup, unitQuantity: 1/2},
    //   {name: salt, units: tsp, unitQuantity: 1},
    //   {name: soymilk, units: cup, unitQuantity: 1}
    // ])
    ingredientList.fetch().then(()=> {
      this.setState({ingredientList});
    });
    this.state = {
      ingredientList
    }
  }
  render(){
    return (
      <div>
        <RecipeForm />
        <RecipeList />
      </div>
    )
  }
}

class RecipeForm extends React.Component {
  render(){
    return (
      <div class="recipe-form">
        <h1>Recipe Form</h1>
        <div class="well">
          <span>Makes</span><input type="number"/><span>servings</span><input className="btn" type="radio" value="US"/><input className="btn" type="radio" value="Metric"/><button>Adjust Recipe</button>
        </div>
        <ul></ul>
      </div>
    )
  }
}

class RecipeList extends React.Component {
  render(){
    return (
      <div></div>
    )
  }
}

module.exports = {
  RecipeContainer
}
