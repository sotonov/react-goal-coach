import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import Auth from './containers/Auth/Auth';
import Goals from './containers/Goals/Goals';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignin();
  };

  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Redirect to='/auth' />
      </Switch>
    )

    if (this.props.email) {
      console.log(!!this.props.email);
      routes = (
        <Switch>
          {/* <Route path='/auth' component={Auth} /> */}
          <Route path='/goals' component={Goals}/>
          <Redirect to='/goals' />
        </Switch>
        // routes = <Route path='/goals' component={Goals}/>;
      )
    }
    return (
      <div>
          {routes}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.auth.email
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignin: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
