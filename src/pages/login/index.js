import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import api from '../../services/api';
import {login, isAuthenticated} from "../../services/auth";
import './styles.css';

class Login extends Component{

    constructor(props){
        super(props);
        if(isAuthenticated()){
            this.props.history.push("/homepage");
        }
        this.state = {
            username: '',
            password: '',
            error:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async login(){
        const { username, password } = this.state;

        if(!username || !password){
            this.setState({ error: 'Please, fill in all fields for sign in' });
            return;
        }

        try{
            const res = await api.post('/login', { username, password });
            login(res.data.token);
            this.props.history.push("/homepage");
        }catch(err){
            console.log(err);
            this.setState({ error: 'Wrong Credentials' });
            return;
        }
    }

    handleChange = e => (e.target.id === 'username') ? 
                            this.setState({username: e.target.value}) : 
                            this.setState({password: e.target.value});
    
    handleSubmit = e => {
        this.login();
        e.preventDefault();
    };

    render(){
        return(
        <div className="enclauser">
            <div className="container-wrap">
                <form onSubmit={this.handleSubmit} className="container">
                    <div className="title">
                        <h1>Login</h1>
                        {this.state.error && <p>{this.state.error}</p>}
                    </div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" value={this.state.username} onChange={this.handleChange}/>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={this.state.password} onChange={this.handleChange}/>
                    <div className="footer">
                        <button type="submit">Sign in</button>
                    </div>
                    <Link to="/signup">...or sing up!</Link>
                </form>
            </div>
        </div>
        );
    }
}
export default withRouter(Login);