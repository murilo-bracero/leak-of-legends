import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Unknow extends Component{
    render(){
        return(
            <h1>Erro 404: página nao encontrada</h1>
        );
    }
}

export default withRouter(Unknow);