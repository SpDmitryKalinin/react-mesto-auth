import React, { Component, useState } from 'react';
import { currentUserContext } from "../contexts/CurrentUserContext";
import { Link, withRouter } from 'react-router-dom';

class Enter extends React.Component{
    constructor(props){
        super(props);
        this.loginRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    render(){
        return(
            <section className={`enter`}>
                <h2 className="enter__title">{this.props.title}</h2>
                <form onSubmit={this.props.onSubmit.bind(this)} className="enter__form">
                    <input ref={this.loginRef} type="text" className="enter__input" placeholder="Email"></input>
                    <input ref={this.passwordRef} type="password" className="enter__input" placeholder="Пароль"></input>
                    <button type="submit" className="enter__submit">{this.props.textButton}</button>
                    {this.props.children}
                </form>
            </section>
        );
    }
}

export default withRouter(Enter);