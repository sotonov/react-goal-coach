import * as React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import Auth from './containers/Auth/Auth';
import Goals from './containers/Goals/Goals';
import * as actions from './store/actions/index';

interface AppProps {
  email: string;
  onTryAutoSignin: () => void;
}

class App extends React.Component<AppProps> {
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
      routes = (
        <Switch>
          <Route path='/goals' component={Goals}/>
          <Redirect to='/goals' />
        </Switch>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App) as any);
