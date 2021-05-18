import React from 'react';
import Card from './Card.js';
import {CurrentUserContext} from './../contexts/CurrentUserContext.js'

export default class Main extends React.Component{
    static contextType = CurrentUserContext;
    constructor(props){
        super(props);
    }
    
    render(){
        return (
        <main className="main">
            <section className="profile">
                <div className="profile__avatar-container">
                    <button className="profile__avatar-edit-button" onClick={this.props.onEditAvatar}></button>
                    <img className="profile__avatar" src={this.context.avatar} alt="Аватар"/>
                </div>
                <div className="profile__info">
                    <div className="profile__item">
                        <h1 className="profile__title">{this.context.name}</h1>
                        <button type="button" className="profile__edit-button" onClick={this.props.onEditProfile}></button>
                    </div>
                    <p className="profile__subtitle">{this.context.about}</p>
                </div>
                <button type="button" className="profile__add-button" onClick={this.props.onAddPlace}></button>
            </section>
            <section className="elements">
                {
                    this.props.cards.map((item => {
                        return (<Card 
                            onCardDelete = {this.props.onCardDelete} 
                            onCardLike = {this.props.onCardLike} 
                            onCardClick ={this.props.onCardClick} 
                            card={item} key={item._id}/>)
                    }))
                }
                
            </section>
        </main>);
    }
}


