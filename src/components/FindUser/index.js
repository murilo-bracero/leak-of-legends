import React, { Component } from 'react';
import api from '../../services/api';
import './styles.css';

export default class FindUser extends Component {
    state = {
        playername: '',
        username:'',
        favs: [],
        error:''
    }

    handleChange = e => this.setState({playername: e.target.value});
    handleSubmit = e => {
        this.search();
        e.preventDefault();
    }

    search = async () => {
        var userDetails = document.querySelector('.user-details');
        var loading = document.querySelector('.load-spinner');
        loading.style.display = 'block';
        await api.get(`/getuser/${this.state.playername}`)
            .then( res => {
                this.setState({ favs: res.data.favs, username: res.data.username, error: '' });
                userDetails.style.display = 'block';
                loading.style.display = 'none';
            }).catch( err => {
                if(err.message.includes('404')){
                    this.setState({ error: "User doesn't exists in our database." });
                    loading.style.display = 'none';
                    return;
                }
                alert('Connection error');
                loading.style.display = 'none';
            });
    }

    render(){
        const { username, favs } = this.state;
        return(
            <div className="find-user">
                <section className="search-user">
                    <h1>Find Players and maybe make new friends</h1>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" 
                            value={this.state.playername} 
                            onChange={this.handleChange} 
                            placeholder="Username"/>
                        <button type="submit">Find</button>
                    </form>
                    <div className="exception">
                        {this.state.error && <p>{this.state.error}</p>}
                    </div>
                    <div className="loading">
                        <div className="load-spinner"></div>
                    </div>
                </section>
                <hr />
                <section className="user-details">
                    <h1>{username}</h1>
                    {favs.map( (champ, index) => (
                        <article key={index}>
                            <div className="champ-img">
                                <img 
                                    src={`https://www.mobafire.com/images/avatars/${champ.toLowerCase().replace(' ','-').replace("'","")}-classic.png`}
                                    alt={champ}/>
                            </div>
                            <div className="champ-info">
                                <h3>{champ}</h3>
                            </div>
                        </article>
                    ) )}
                </section>
            </div>
        )
    }

}