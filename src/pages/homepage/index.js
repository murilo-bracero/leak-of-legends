import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import decode from 'jwt-decode';
import api from '../../services/api';
import { getToken, logout } from "../../services/auth";
import News from '../../components/News';
import Profile from '../../components/Profile';
import FindUser from '../../components/FindUser';
import './styles.css';

class Homepage extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            favs:[],
            content: null,
            id: '',
            user: null
        };
        this.logout = this.logout.bind(this);
    }
    
    componentDidMount(){
        this.getuser();
    }

    async getuser(){
        const id = decode(getToken()).id;
        try{
            const user = await api.get(`/getuserbyid/${id}`);
            this.setState({ username: user.data.username, favs: user.data.favs, id: user.data.id, user });
        }catch(err){
            alert('Erro de conexão com o servidor, tente entrar novamente mais tarde ou entre em contato conosco.');
            logout();
            this.props.history.push('/');
        }
    }

    async logout(){
        logout();
        this.props.history.push('/');
    }

    showSidebar = e =>{
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('sidebar-active');
        e.target.classList.toggle('toggle');
    }

    showComponent = e =>{
        switch(e.target.textContent){
            case 'News':
                this.setState({content:News});
            break;
            case 'Profile':
                this.setState({content:Profile});
            break;
            case 'Find User':
                this.setState({content:FindUser});
            break;
            default:
                this.setState({content:News});            
        }
        this.render();
    }

    render(){
        const {username, favs, user} = this.state;
        const Content = (this.state.content == null) ? News : this.state.content;
        return(
            <div className="homepage">
                <nav>
                    <div className="sidebar">
                        <div className="logo">
                            <h1>Homepage</h1>
                        </div>

                        <hr />

                        <div className="username">
                            <p>{username}</p>
                        </div>

                        <p className="text">Favorites Champions</p>
                        <ul className="champ-list">
                            {favs.map( (champ, index) =>(
                                <li key={index}>
                                    {champ}
                                </li>
                            ) )}
                        </ul>
                        <div className="logout" onClick={this.logout}>Logout</div>
                    </div>
                    <div className="sidebar-adapter" onClick={this.showSidebar}>
                        <div className="l1"></div>
                        <div className="l2"></div>
                        <div className="l3"></div>
                    </div>
                </nav>
                <main>
                    <div className="selector">
                        <ul>
                            <li onClick={this.showComponent}>News</li>
                            <li onClick={this.showComponent}>Profile</li>
                            <li onClick={this.showComponent}>Find User</li>
                        </ul>
                    </div>
                    <Content user={user}/>
                </main>
            </div>
        );
    }
}
export default withRouter(Homepage);