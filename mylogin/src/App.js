import React, { Component } from 'react';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import LogIn from './route/login/components/LogIn'
import Register from './route/login/components/Register'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Home from './route/login/components/Home'

class App extends Component {
  render() {
    const {loggedIn} = this.props
    return (
      <MuiThemeProvider theme={ createMuiTheme({ typography: { useNextVariants: true,} })} >
        <div className="App">
          <BrowserRouter>
          <Switch>
            {
              !loggedIn && <Route path ='/login' component={LogIn} />
            }
            {
              !loggedIn && <Route path ='/register' component={Register} />
            }
            {
              loggedIn && <Route path="/home" component={Home}/>
            }
            <Redirect to={loggedIn?"/home":"/login"}/>
          </Switch>
          </BrowserRouter>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: state.rootReducer.login
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
