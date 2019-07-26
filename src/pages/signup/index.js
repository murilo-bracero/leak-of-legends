import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

class Signup extends Component{
    state = {
        username: '',
        password: '',
        country: '',
        error: '',
    };

    handleChange = e => (e.target.id === 'username') ? 
                            this.setState({username: e.target.value}) : 
                            this.setState({password: e.target.value});

    Signup = async () => {
        const { username, password, country } = this.state;

        if(!username || !password || !country){
            this.setState({ error:'Please, fill in all fields for sign in' });
            return;
        }

        try{
            await api.post('/signup', {
                username, password, country
            });

            this.props.history.push('/login');
        }catch(err){
            console.log(err);
            if(err.message.includes('404')){
                this.setState({error: 'User doesnt exists in League of Legends database. If you think that we are wrong, please contact us.'});
                return;
            }
            if(err.message.includes('400')){
                this.setState({error: 'User already exists in our database. If you think that we are wrong, please contact us.'});
                return;
            }
            return;
        }
    }

    handleSubmit = e => {
        this.Signup();
        e.preventDefault();
    };

    render(){
        return(
        <div className="enclauser">
            <div className="container-wrap">
                <form onSubmit={this.handleSubmit} className="container">
                    <div className="title">
                        <h1>Sign up, its free!</h1>
                        {this.state.error && <p>{this.state.error}</p>}
                    </div>
                    <label htmlFor="username">Username <br /> inb4.: Your username must be the same as League of Legends nickname</label>
                    <input type="text" id="username" value={this.state.username} onChange={this.handleChange}/>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={this.state.password} onChange={this.handleChange}/>
                    <label htmlFor="country">Region</label>
                    <select id="country" 
                        value={this.state.value} 
                        onChange={ e => this.setState({country: e.target.value})}>
                        <option value=""></option>
                        <option value="br">Brazil</option>
                        <option value="www">Korea</option>
                        <option value="jp">Japan</option>
                        <option value="na">North America</option>
                        <option value="euw">Europe West</option>
                        <option value="eune">Europe Nordic and East</option>
                        <option value="oce">Oceania</option>
                        <option value="las">LAS</option>
                        <option value="lan">LAN</option>
                        <option value="ru">Russia</option>
                        <option value="tr">Turkey</option>
                    </select>
                    <div className="footer">
                        <button type="submit">Sign up</button>
                    </div>
                    <Link to="/login">Already have an account? Sign in</Link>
                </form>
            </div>
        </div>
        );
    }
}

export default withRouter(Signup);