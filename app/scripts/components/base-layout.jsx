var React = require('react');

function BaseLayout(props){
  return(
    <div className="container">
      <div className="row">
        <div className="col-md-12">

          <h1>Super Amazing Recipe App</h1>

            {props.children}

        </div>
      </div>
    </div>
  )
}

module.exports = {
  BaseLayout
}
