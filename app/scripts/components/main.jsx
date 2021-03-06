var React = require('react');
var recipe = require('../models/recipe.js');

var RecipeCollection = require('../models/recipe.js').RecipeCollection;


class MainContainer extends React.Component {
  constructor(props){
    super(props);
    var recipeList = new RecipeCollection();
    recipeList.fetch().then(()=> {
      this.setState({recipeList});
    });

    this.addNewRecipe = this.addNewRecipe.bind(this);

    this.state = {
      recipeList
    }

    // recipeList.get('ingredients').add([
    //   {name: 'cake', servings: '8', image: 'https://www.bbcgoodfood.com/sites/default/files/styles/category_retina/public/chocolate-avocado-cake.jpg?itok=E2eWE_Dx'},
    //   {name: 'cookies', servings: '12', image: 'http://images.media-allrecipes.com/userphotos/250x250/00/69/35/693521.jpg'},
    //   {name: 'donuts', servings: '12', image: 'https://duckdonuts.com/wp-content/uploads/2015/11/Dozen-Assorted-Donuts21.jpg'},
    //   {name: 'biscuits', servings: '8', image: 'http://fusionchurch.net/wp-content/uploads/2014/07/buttermilk-biscuits-61.jpg'}
    // ])
  }
  addNewRecipe(recipe){
    this.state.recipeList.create(recipe, {success: ()=>{
      this.setState({recipeList: this.state.recipeList});
    }})
  },
  addButton(){
    Backbone.navigate.history()
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
              <input type="submit" className="btn btn-primary" value="Add Recipe"/>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
        <div className="col-md-7 col-md-push-1">
            <RecipeBoxContainer collection={this.state.recipeList}/>
        </div>
      </div>
    )
  }
};

class RecipeBoxContainer extends React.Component {
  render(){
    var recipeList = this.props.collection.map((recipe)=>{
      return(
          <div key={recipe.get('objectId')} className="row recipe">
            <div className="col-md-3">
              <a href={'recipes/' + recipe.get('objectId') + "/"} className="thumbnail">
                <img src={recipe.get('image')} alt=""/>
              </a>
            </div>
          </div>
      )
    });
    return(
      <div className="col-md-3">
        {recipeList}
      </div>
    )
  }
}

module.exports = {
  MainContainer
}
