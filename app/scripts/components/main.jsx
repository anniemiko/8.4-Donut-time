var React = require('react');
var recipe = require('../models/recipe.js');

var RecipeCollection = require('../models/recipe.js').RecipeCollection;


class MainContainer extends React.Component {
  constructor(props){
    super(props);
    var recipeList = new RecipeCollection();
    recipeList.add([
      {name: 'cake', servings: '8', image: 'https://www.bbcgoodfood.com/sites/default/files/styles/category_retina/public/chocolate-avocado-cake.jpg?itok=E2eWE_Dx'},
      {name: 'cookies', servings: '12', image: 'http://images.media-allrecipes.com/userphotos/250x250/00/69/35/693521.jpg'},
      {name: 'donuts', servings: '12', image: 'https://duckdonuts.com/wp-content/uploads/2015/11/Dozen-Assorted-Donuts21.jpg'},
      {name: 'biscuits', servings: '8', image: 'http://fusionchurch.net/wp-content/uploads/2014/07/buttermilk-biscuits-61.jpg'}
    ])
    recipeList.fetch().then(()=> {
      this.setState({recipeList});
    });
    this.state = {
      recipeList
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
          <div key={recipe.get('objectId')} className="recipe">
            <img src={recipe.get('image')} alt=""/>
          </div>
      )
    })
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
