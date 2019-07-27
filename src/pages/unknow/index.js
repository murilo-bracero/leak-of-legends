import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import sadPoro from '../../assets/poro-sad.png'
import './styles.css';

class Unknow extends Component{
    render(){
        return(
            <div className="unknow">
                <section>
                    <h1>EeRrOoR 404</h1>
                    <p>Well, looks like you've tried to access a page that no longer exists in our website. 
                       We sorry :(</p>
                    <img src={sadPoro} alt="sad poro"/>
                </section>
            </div>
        );
    }
}
export default withRouter(Unknow);