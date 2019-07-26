import React, { Component } from 'react';
import './styles.css';
import logo from '../../assets/logo.png'

export default class Header extends Component{
    render(){
        return(
            <header className="header-main">
                <div className="logo">
                    <img src={logo} alt="leak of legends logo" />
                </div>
                <nav>
                    <ul className="nav-links">
                        <li><a className="nav-link" href="https://br.leagueoflegends.com/pt/">ORIGINAL</a></li>
                        <li><a className="nav-link" href="/signup">SIGN UP</a></li>
                    </ul>
                </nav>
                <div className="login">
                    <a href="/login"><button>Login</button></a>
                </div>
            </header>
        );
    }

}