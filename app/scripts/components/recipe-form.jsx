var Backbone = require('backbone');
var react = require('react');

var BaseLayout = require('./base-layout.jsx').BaseLayout;
var Recipe = require('../models/recipe').Recipe;
var User = require('../models/user').User;

class RecipeContainer extends React.Component {
  constructor(props){
      super(props);

      this.saveRecipe = this.saveRecipe.bind(this);
    }
  saveRecipe(formData){
    var recipe = new Recipe();
    var user = User.current();

    recipe.set({
      'name': formData.name,
      'servings': parseInt(formData.servings)
    });

    recipe.setPointer('owner', '_User', user.get('objectId'));

    recipe.save().then(function){
      Backbone.history.navigate('recipes/', {trigger: true});
    });
  }
  render(){
    return(
      <BaseLayout>
        <div className="row">
          <div className="col-md-12">
            <h1>Add Recipe</h1>
            <RecipeForm saveRecipe = {this.saveRecipe} />
          </div>
        </div>
      </BaseLayout>
    )
  }
}

class RecipeForm extends React.Component {
  constructor(props){
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleServingsChange = this.handleServingsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      name: '',
      servings: ''
    };
  }
  handleNameChange(e){
    this.setState({name: e.target.value});
  }
  handleServingChange(e){
    this.setState({servings: e.target.value});
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.saveRecipe(this.state);
  }
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
            <label className="col-md-4 control-label" for="name">Recipe Name</label>
            <input onChange={this.handleNameChange} name="recipe-name" type="text" placeholder="Recipe Name" className="form-control" />
        </div>

        <div className="form-group">
            <label className="col-md-4 control-label" for="servings">Serving Size</label>
            <input onChange={this.handleServingChange} name="serving" type="text" placeholder="Serving Size" className="form-control" />
        </div>

        <input className="btn btn-primary" type="submit" value="Save" />

      </form>
    )
  }
}

module.exports = {
  RecipeContainer
}
