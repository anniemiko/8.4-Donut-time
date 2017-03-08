var React = require('react');
var recipe = require('../models/recipe.js');
var IngredientCollection = require('../models/ingredient.js').IngredientCollection;
var RecipeModel = require('../models/recipe.js').Recipe;
var RecipeCollection = require('../models/recipe.js').RecipeCollection;

class RecipeCardContainer extends React.Component {
  constructor(props){
    super(props);

    var currentRecipe = new RecipeModel();
    var recipeCollection = new RecipeCollection();
    recipeCollection.fetch().then(()=>{
      currentRecipe = recipeCollection.findWhere({objectId: this.props.id});
      this.setState({currentRecipe, recipeCollection});
    })


    var ingredientList = new IngredientCollection();
    ingredientList.add([
      {name: 'flour', units: 'cup', unitQuantity: 2},
      {name: 'sugar', units: 'cup', unitQuantity: 0.5},
      {name: 'salt', units: 'tsp', unitQuantity: 1},
      {name: 'soymilk', units: 'cup', unitQuantity: 1}
    ])
    ingredientList.fetch().then(()=> {
      this.setState({ingredientList});
    });
    this.state = {
      ingredientList,
      currentRecipe,
      recipeCollection
    }
  }
  render(){
    return (
      <div>
        <RecipeCard recipe={this.state.recipe}/>
        <IngredientList collection={this.state.ingredientList}/>
      </div>
    )
  }
}

class RecipeCard extends React.Component {
  constructor(props){
    super(props)
    this.adjustServings = this.adjustServings.bind(this);
    this.handleServingChange = this.handleServingChange.bind(this);

    this.state = {
      servings : this.state.recipe.get('servings')
    }
  }
  handleServingChange(e){
    this.setState({servings: e.target.value})
  }
  adjustServings(e){
    e.preventDefault();
  }
  render(){
    return (
      <div className="recipe-form">
        <h1>Recipe Card</h1>
        <div className="well">
          <form onSubmit={this.adjustServings}>
          <span>Makes</span><input onChange={this.handleServingChange} type="text" name="servings"/><span>servings</span><input className="btn" type="radio" value="US"/><input className="btn" type="radio" value="Metric"/><input type="Submit">Adjust Recipe</input>
          </form>
        </div>
      </div>
    )
  }
}

class IngredientList extends React.Component {
  render(){
    var recipeList = this.props.collection.map((recipe)=>{
      return(
        <li key={recipe.get('objectId')} className='list-group-item'><span>{recipe.get('name')}</span><span>{recipe.get('unitQuantity')}</span><span>{recipe.get('units')}</span></li>
      )
    })
    return (
      <ul className="list-group">
        {recipeList}
      </ul>
    )
  }
}

module.exports = {
  RecipeCardContainer
}
