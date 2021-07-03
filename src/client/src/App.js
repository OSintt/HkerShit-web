import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import Home from './Components/home';
import Navbar from './Components/navbar'
import Error from './Components/error'
import Post from './Components/post';
import Dxes from './Components/dxes';
import Dx from './Components/dx';
import Register from './Components/register';
import Login from './Components/login';
import verifiySomething from './Components/verifySomething';

export default class App extends React.Component {
  render() {
    return(
      <div>
        <Router>
        <Navbar/>
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route exact path="/post" component={Post}/>
            <Route exact path="/dxes/:id" component={Dx}/>
            <Route exact path="/dxes/page/:id" component={Dxes}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/ola" component={verifiySomething}/>
            <Route path="*"><Error /></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}