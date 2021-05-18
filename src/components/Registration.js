import React, { Component, useState } from 'react';
import AuthForm from './AuthForm';
import {Link, withRouter } from 'react-router-dom'; 


class Registration extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <AuthForm
                title="Регистрация"
                textButton="Зарегистрироваться"
                showMessage = {this.props.showMessage}
                confirm = {this.props.confirm}
                error = {this.props.error}
                onSubmit ={this.props.onSubmit}>
                    <Link to={`/sign-in`} className="enter__caption">Уже зарегистрированы? Войти</Link>
            </AuthForm>
        );
    }
}

export default withRouter(Registration);