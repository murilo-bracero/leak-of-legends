import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './services/auth';
import Login from './pages/login';
import Main from './pages/main';
import Homepage from './pages/homepage';
import Signup from './pages/signup';
import Unknow from './pages/unknow';

//se o usuario nao estiver autenticado, vai pro login
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} 
    render={ props => 
        isAuthenticated() ? ( <Component {...props} /> ) : 
        ( <Redirect to={{ pathname: "/login", state: {from: props.location} }}/> )
    }/>
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component = {Main} />
            <Route path="/login" component = {Login} />
            <Route path="/signup" component = {Signup} />
            <PrivateRoute path="/homepage" component = {Homepage} />
            <Route path="*" component={Unknow} />
        </Switch>
    </BrowserRouter>
);

export default Routes;