import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../../components/Header';
import { isAuthenticated } from "../../services/auth";

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
                    <h1>This is the main content</h1>
                </main>
            </div>
        );
    }
}

export default withRouter(Main);