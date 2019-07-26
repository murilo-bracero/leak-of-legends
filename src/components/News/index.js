import React, { Component } from 'react';
import api from '../../services/api';
import './styles.css';

export default class News extends Component{
    
    state = {
        news: []
    }

    componentDidMount(){
        this.loadNews();
    }

    loadNews = async (page = 0) => {
        const res = await api.get(`/getnews/${page}`);
        this.setState({ news: res.data });
    }

    render(){
        return (
            <div className="news-list">
                <h1>News</h1>
                {this.state.news.map( notice => (
                    <div className="wrapper" key={notice.title}>
                        <article>
                            <div className="article-image">
                                <img src={notice.image} alt={notice.title}/>
                            </div>
                            <div className="article-title">
                                <a href={notice.link}><h3>{notice.title}</h3></a>
                            </div>
                        </article>
                    </div>
                ))}
            </div>
        );
    }
}