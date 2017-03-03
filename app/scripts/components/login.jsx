var React = require('react');
var Backbone = require('backbone');

var BaseLayout = require('./base-layout.jsx').BaseLayout;
var User = require('../models/user').User;

class LoginContainer extends React.Component {
  constructor(props){
    super(props);
    this.login = this.login.bind(this);
  }
  login(creds){
    User.login(creds, function(user){
      Backbone.history.navigate('recipe/', {trigger: true});
    });
  }
  createAccount(creds){
    User.signup(creds);
    Backbone.history.navigate('recipe/', {trigger: true});
  }
  render(){
    return (
      <BaseLayout>
        <h1>Login</h1>
        <LoginForm action={this.login} SubmitBtn="Login"/>
        <h1>Sign Up</h1>
        <SignupForm action={this.createAccount} SubmitBtn="Create Account"/>
      </ BaseLayout>
    )
  }
};

class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      username: '',
      password: ''
    };
  }
  handleEmailChange(e){
    this.setState({username: e.target.value});
  }
  handlePasswordChange(e){
    this.setState({password: e.target.value})
  }
  handleSubmit(e){
      e.preventDefault();
      // console.log(this.props);
      this.props.action(this.state);
  }
  render(){
    console.log('test', this.props.action);
    return(
      <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email-login">Email address</label>
            <input onChange={this.handleEmailChange} className="form-control" name="email" id="email-login" type="email" placeholder="Enter email here" />
          </div>

          <div className="form-group">
            <label htmlFor="password-login">Password</label>
            <input onChange={this.handlePasswordChange} className="form-control" name="password" id="password-login" type="password" placeholder="Password please" />
          </div>

          <input className="btn btn-primary" type="submit" value={this.props.SubmitBtn}/>
        </form>
    )
  }
};

class SignupForm extends LoginForm {
  render(){
    return(
      <LoginForm action={this.props.action} />
    )
  }
}

module.exports = {
  LoginContainer
}
