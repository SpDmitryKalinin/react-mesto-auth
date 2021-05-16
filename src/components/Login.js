import React, { Component, useState } from 'react';
import Enter from './Enter';
import auth from './../utils/Auth.js'
import { Link, withRouter } from 'react-router-dom'; 

class Login extends React.Component{
    constructor(props){
        super(props);
    }
    onSubmit(e){
        e.preventDefault();
        auth(this.loginRef.current.value, this.passwordRef.current.value, '/signin')
        .then(res =>{
            this.props.status();
            const jwt = res.token;
            localStorage.setItem('jwt', jwt);
            this.props.history.push('/');
        })
        .catch(res =>{
            console.log(res);
        })
    }
    render(){
        return(
            <Enter
                title="Вход"
                textButton="Войти"
                onSubmit = {this.onSubmit}
                status  = {this.props.status}
            >
            </Enter>
        );
    }
}

export default withRouter(Login); 