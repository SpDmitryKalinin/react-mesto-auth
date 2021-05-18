import React from 'react';
import AuthForm from './AuthForm';
import {withRouter } from 'react-router-dom'; 

class Login extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <AuthForm
                title="Вход"
                textButton="Войти"
                onSubmit = {this.props.onSubmit}
                status  = {this.props.status}
                setMailHeader = {this.props.setMailHeader}
            >
            </AuthForm>
        );
    }
}

export default withRouter(Login); 