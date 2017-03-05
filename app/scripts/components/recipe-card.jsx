var React = require('react');
var recipe = require('../models/recipe.js');
var IngredientCollection = require('../models/ingredient.js').IngredientCollection;

class RecipeCardContainer extends React.Component {
  constructor(props){
    super(props);
    var ingredientList = new IngredientCollection();
    ingredientList.add([
      {name: 'flour', units: 'cup', unitQuantity: 2},
      {name: 'sugar', units: 'cup', unitQuantity: 1/2},
      {name: 'salt', units: 'tsp', unitQuantity: 1},
      {name: 'soymilk', units: 'cup', unitQuantity: 1}
    ])
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
        <RecipeCard />
        <IngredientList collection={this.state.ingredientList}/>
      </div>
    )
  }
}

class RecipeCard extends React.Component {
  render(){
    return (
      <div className="recipe-form">
        <h1>Recipe Form</h1>
        <div className="well">
          <span>Makes</span><input type="number"/><span>servings</span><input className="btn" type="radio" value="US"/><input className="btn" type="radio" value="Metric"/><button>Adjust Recipe</button>
        </div>
        <ul></ul>
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
