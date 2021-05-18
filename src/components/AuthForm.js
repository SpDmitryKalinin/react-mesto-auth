import React, { Component, useState } from 'react';
import { currentUserContext } from "../contexts/CurrentUserContext";
import { Link, withRouter } from 'react-router-dom';

class AuthForm extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            login: '',
            password: ''
        }
    }
    
    changeLogin(e){
        this.setState({
            login: e.target.value
        })
    }
    changePassword(e){
        this.setState({
            password: e.target.value
        })
    }

    render(){
        return(
            <section className={`enter`}>
                <h2 className="enter__title">{this.props.title}</h2>
                <form onSubmit={this.props.onSubmit.bind(this)} className="enter__form">
                    <input onChange={this.changeLogin.bind(this)} type="text" className="enter__input" placeholder="Email"></input>
                    <input onChange={this.changePassword.bind(this)} type="password" className="enter__input" placeholder="Пароль"></input>
                    <button type="submit" className="enter__submit">{this.props.textButton}</button>
                    {this.props.children}
                </form>
            </section>
        );
    }
}

export default withRouter(AuthForm);