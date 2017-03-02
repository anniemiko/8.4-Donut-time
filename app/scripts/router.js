var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var LOGIN_URL = require('./models/user').LOGIN_URL;
var LoginContainer = require('./components/login.jsx').LoginContainer;

LOGIN_URL = 'https://tiny-parse-server.herokuapp.com'

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'login',

  },
  login: function(){
    ReactDOM.render(
      React.createElement(LoginContainer),
      document.getElementById('app')
    )
  }
})

var router = new AppRouter();

module.exports = router
