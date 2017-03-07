var React = require('react');
var recipe = require('../models/recipe.js');
var IngredientCollection = require('../models/ingredient.js').IngredientCollection;
var RecipeModel = require('../models/recipe.js').Recipe;
var RecipeCollection = require('../models/recipe.js').RecipeCollection;

class RecipeContainer extends React.Component {
  constructor(props){
    super(props);
    var currentRecipe = new RecipeModel();
    var recipeCollection = new RecipeCollection();
    recipeCollection.fetch().then(()=>{
      currentRecipe = recipeCollection.findWhere({objectId: this.props.id});
      this.setState({currentRecipe, recipeCollection});
    })

    var ingredientList = new IngredientCollection();

    ingredientList.fetch().then(()=> {
      this.setState({ingredientList});
    });
    this.state = {
      ingredientList
    }
  }
  render(){
    return (
      <div className="container">
        <div className="col-md-12">
          <div className="row">
            <div className="header">
              <span>The kitchen is yours!</span>
              <h4>Batch Maker</h4>
              <button>+</button>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
        <div className="col-md-7 col-md-push-1">
            <Recipe collection={this.state.ingredientList}/>
        </div>
      </div>
    )
  }
}

class Recipe extends React.Component {
  render(){
    return (
      <div className="recipe">
        <h1>Basic info</h1>
        <div className="recipe-listing">
          <img src="" alt=""/>
          <input className="recipe-name" type="text" placeholder="Recipe Name"/>
          <input className="recipe-author" type="text" placeholder="By"/>
        </div>
        <ul></ul>
      </div>
    )
  }
}

class Ingredients extends React.Component {
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
  RecipeContainer,
  Recipe
}
