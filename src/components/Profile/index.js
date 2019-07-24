import React, { Component } from 'react';
import './styles.css';
import api from '../../services/api';

export default class Profile extends Component{
    state = {
        champName: '',
        favs: this.props.user.data.favs
    }

    showModal = e => {
        var modal = document.getElementById('modal');
        if(e.target.id === 'open'){
            modal.style.display = 'block';
            window.scrollTo(0,0);
        }
            
        else
            modal.style.display = 'none';
    }

    handleChanges = e => this.setState({champName: e.target.value});
    handleSubmit = e => {
        this.addChamp();
        e.preventDefault();
    }

    addChamp = async () => {
        const {champName, favs} = this.state;

        if(champName == null || champName === '') return;
        if(favs.length >= 10){
            alert('Você já possui o limite de favoritos.');
            return;
        }

        var load = document.querySelector('#modal-spinner');
        load.style.display = 'block';

        await api.put('/addchamp', {
            favs:favs,
            champName:champName
        }).then( res =>{
            load.style.display = 'none';
            this.showModal({ target: { id: 'close' } });
            this.setState({ favs: res.data.favs });
            this.render();
        } )
        .catch( err => alert('Ocorreu um erro na conexão'));
    }

    async removeChamp(champName){
        const { favs } = this.state;
        var spinner = document.querySelector('#champs-spinner');
        spinner.style.display = 'block';

        await api({
            method: 'DELETE',
            url: '/removechamp',
            data:{ favs, champName }
        }).then(res => {
            spinner.style.display = 'none';
            this.setState({ favs: res.data.favs });
            this.render();
        }).catch( err => {
            spinner.style.display = 'none';
            console.log(err);
            alert('Erro de conexão');
        });
    }

    render(){
        return(
            <div className="profile">
                <div className="username">
                    <h2>{this.props.user.data.username}</h2>
                </div>
                <section className="favs">
                    <div id="champs-spinner" className="load-spinner"></div>
                    {this.state.favs.map( (champ, index) => (
                        <article key={index}>
                            <div className="champ-img">
                                <img 
                                src={`https://www.mobafire.com/images/avatars/${champ.toLowerCase().replace(' ','-').replace("'","")}-classic.png`} 
                                alt={champ}/>
                            </div>
                            <div className="champ-info">
                                <h3>{champ}</h3>
                                <button 
                                    onClick={() => this.removeChamp(champ)} 
                                    className="remove">&times;</button>
                            </div>
                        </article>
                    ) )}
                    <button id="open" onClick={this.showModal} className="add-champ">Add a Favourite Champion</button>
                </section>
                <div className="modal" id="modal">
                    <div className="modal-header">
                        <h3>Add Champion to Favourites</h3>
                        <span onClick={this.showModal} id="close" className="close">&times;</span>
                    </div>
                    <div className="modal-content">
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" value={this.state.champName} onChange={this.handleChanges} />
                            <button type="submit">Adicionar</button>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <div id="modal-spinner" className="load-spinner"></div>
                    </div>
                </div>
            </div>
        );
    }
}