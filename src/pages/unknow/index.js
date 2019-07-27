import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Unknow extends Component{
    render(){
        return(
            <div className="unknow">
                <h1>EeRrOoR 404</h1>
                <p>Well, looks like you've tried to access a page that no longer exists in our website. We sorry :(</p>
            </div>
        );
    }
}
export default withRouter(Unknow);