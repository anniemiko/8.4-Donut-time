var React = require('react');
var recipe = require('../models/recipe.js');
var IngredientCollection = require('../models/ingredient.js').IngredientCollection;
var RecipeModel = require('../models/recipe.js').Recipe;
var RecipeCollection = require('../models/recipe.js').RecipeCollection;

class RecipeAdjuster extends React.Component {
  constructor(props){
    super(props);

    this.adjustRecipe = this.adjustRecipe.bind(this);;

    This.state = {
      factor: 1
    };
}
adjustRecipe(servings){
  var factor = parseInt(servings)/this.props.recipe.get('servings');
  this.setState({factor: factor})
}
  render(){
    var ingredientList = this.props.recipe.get('ingredients').map((ingredient)=>{
      return (
        <li key={ingredient.cid}>
          {ingredient.qtyDisplay(this.state.factor) + ' '}
          {ingredient.get('units') + ' '}
          {ingredient.get('name')}
        </li>
      )
    });
    return (
      <div>
        <RecipeForm recipe={this.props.recipe} adjustRecipe={this.adjustRecipe}/>
        <ul>
          {ingredientList}
        </ul>
      </div>
    )
  }
}

class RecipeForm extends React.Component {
  constructor(props){
    super(props)
    this.adjustServings = this.adjustServings.bind(this);
    this.handleServingChange = this.handleServingChange.bind(this);

    this.state = {
      servings : this.props.recipe.get('servings')
    }
  }
  handleServingChange(e){
    this.setState({servings: e.target.value})
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.ajustRecipe(this.state.servings)
  }
  render(){
    return (
      <div className="recipe-form">
        <h1>Recipe Card</h1>
        <div className="well">
          <form onSubmit={this.handleSubmit}>
          <span>Makes</span><input onChange={this.handleServingChange} type="text" name="servings"/><span>servings</span><input className="btn" type="radio" value="US"/><input className="btn" type="radio" value="Metric"/><input type="Submit" value="Adjust Recipe"/>
          </form>
        </div>
      </div>
    )
  }
}


module.exports = {
  RecipeAdjuster
}
