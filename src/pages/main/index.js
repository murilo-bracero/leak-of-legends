import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Header from '../../components/Header';
import { isAuthenticated } from "../../services/auth";
import './styles.css';
import giftImage from '../../assets/patch82banner.jpg'
import poro from '../../assets/poro.png';

class Main extends Component{
    constructor(props){
        super(props);
        if(isAuthenticated()){
            this.props.history.push("/homepage");
        }
    }
    render(){
        return(
            <div>
                <Header />
                <main>
                    <section>
                        <div className="gift" style={{ backgroundImage: `url(${giftImage})` }}></div>
                        <article className="broad">
                            <h1>Find players. Whatever they are.</h1>
                        </article>
                    </section>
                    <section>
                        <article className="explain">
                            <h1>What is Leak of Legends?</h1>
                            <p>Leak of Legends is a experimental project whose purpose is decrease the gap 
                               between players in different regions, make the game community of all the world
                               more accessible one each other.</p>
                        </article>
                    </section>
                    <section className="use-it" style={{ backgroundImage: `url(${poro})` }}>
                        <article className="explain">
                            <h1>How to use</h1>
                            <p>For join to this world union players, just <Link to="/signup">signup</Link> using 
                               your League of Legends nickname and creating a new password. Try it now, its
                               100% free!</p>
                        </article>
                    </section>
                </main>
            </div>
        );
    }
}

export default withRouter(Main);