import React, { Component, useState } from 'react';
import Enter from './Enter';
import auth from './../utils/Auth.js'
import {Link, withRouter } from 'react-router-dom'; 


class Registration extends React.Component{
    constructor(props){
        super(props);
    }
    onSubmit(e){
        e.preventDefault();
        auth(this.loginRef.current.value, this.passwordRef.current.value, '/signup').then(res =>{
            this.props.confirm();
        })
        .catch(res =>{
            console.log(res);
            this.props.error();
        })
        .finally(()=>{
            this.props.showMessage();
            this.props.history.push('/sign-in');
        })
    }
    render(){
        return(
            <Enter
                title="Регистрация"
                textButton="Зарегистрироваться"
                onSubmit = {this.onSubmit}
                showMessage = {this.props.showMessage}
                confirm = {this.props.confirm}
                error = {this.props.error}
                children={
                    <Link to={`/sign-in`} className="enter__caption">Уже зарегистрированы? Войти</Link>}
                >
            </Enter>
        );
    }
}

export default withRouter(Registration);