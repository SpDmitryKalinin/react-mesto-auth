import React, { Component, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Registration from './Registration';
import InfoToolTip from './InfoTooltip';
import {CurrentUserContext} from './../contexts/CurrentUserContext.js';
import { Route, Switch, withRouter } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import {getContent} from '../utils/auth';
import auth from '../utils/auth';


class App extends React.Component{
    static contextType = CurrentUserContext;
    constructor(props){
        super(props);
        this.state = {
            isEditProfilePopupOpen: false,
            isAddPlacePopupOpen: false,
            isEditAvatarPopupOpen: false,
            isTooltipPopupOpen: false,
            windowType: false,
            selectedCard: {},
            currentUser: {},
            cards: [],
            loggedIn: false,
            mail: '',
            history: ''
        }
        this.handleSetMail = this.setMail.bind(this);
        this.tokenCheck = this.tokenCheck.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    
    closeAllPopups(){
        this.setState({ 
            isEditProfilePopupOpen:false, 
            isAddPlacePopupOpen: false, 
            isEditAvatarPopupOpen: false, 
            selectedCard: {}, 
            isTooltipPopupOpen: false, 
        });
    }

    setMail(email){
        this.setState({mail: email});
    }

    setCardInfo(card){
        this.setState({selectedCard: card});
    }

    componentDidMount(){
        this.handleInitProfile();
        this.handleInitCards();
        this.tokenCheck();
    }

    handleLogin(){
        this.setState({
            loggedIn: true
        })
    }

    handlerLoginOut(){
        this.setState({
            loggedIn: false
        })
    }

    handleSignIn(e){
        e.preventDefault();
        auth(this.state.login, this.state.password, '/signin')
        .then(res =>{
            if(res.token){
                this.props.setMailHeader(this.state.login);
                this.props.status();
                const jwt = res.token;
                localStorage.setItem('jwt', jwt);
                this.props.history.push('/');
            } 
        })
        .catch(res =>{
            console.log(res);
        })
    }

    handleRegistration(e){
        e.preventDefault();
        auth(this.state.login, this.state.password, '/signup').then(res =>{
            this.props.confirm();
            this.props.showMessage();
            this.props.history.push('/sign-in');
        })
        .catch(res =>{
            console.log(res);
            this.props.error();
            this.props.showMessage();
        })
    }

    tokenCheck () {
        const jwt = localStorage.getItem('jwt');
        if(jwt){
            getContent(jwt).then((res) =>{
                if(res){
                    this.setState({mail: res.data.email});
                    this.handleLogin();
                    this.props.history.push('/');
                }
            })
            .catch(res =>{
                console.log(res);
            })
        }
      } 

    handleUpdateUser(name, about){
        api.patchProfileInfo(name, about).then(res => {
            this.setState({currentUser: res});
            this.closeAllPopups()
        })
        .catch(res =>{
            console.log(res);
        })
    }

    handleUpdateAvatar(inputValue){
        api.patchProfileAvatar(inputValue).then(res =>{
            this.setState({currentUser: res});
            this.closeAllPopups();
        })
        .catch(res =>{
            console.log(res);
        })
    }

    handleInitCards(){
        api.getCards().then(res =>{
            this.setState({cards: res});
        })
        .catch(res =>{
            console.log(res)
        });
    }

    handleInitProfile()
    {
        api.getProfileInfo().then(res =>{
            this.setState({currentUser: res});
        })
        .catch(res =>{
            console.log(res);
        })
    }

    handleCardLike(card){
        const isLiked = card.likes.some(i => i._id === this.state.currentUser._id);
        if(isLiked){
            api.deleteLike(card._id).then(res=>{
                this.setState(state =>{
                    return{
                        cards: state.cards.map((item)=> item._id === card._id ? res : item)
                    }
                })
            })
            .catch(res =>{
                console.log(res);
            })
        }
        else{
            api.putLike(card._id).then(res=>{
                this.setState(state =>{
                    return{
                        cards: state.cards.map((item)=> item._id === card._id ? res : item)
                    }
                })
            })
            .catch(res =>{
                console.log(res);
            })
        }
    }

    handleCardDelete(card){
        api.deleteCard(card._id).then(()=>{
            this.setState(state =>{
                return{
                    cards: state.cards.filter((item)=>{
                        if(item._id!==card._id){
                            return item;
                        }
                    })
                }
            })
        })
        .catch(res =>{
            console.log(res);
        }) 
    }

    handleAddCard(name, link, handleSetName, handleSetLink){
        api.postCards(name,link).then(res =>{
            this.setState(state =>{
                return{
                    cards: [res, ...state.cards]
                }
            })
            handleSetName('');
            handleSetLink('');
            this.closeAllPopups();
        })
        .catch(res =>{
            console.log(res);
        })
    }
    
    render(){
        return(
        <CurrentUserContext.Provider value={this.state.currentUser}>
            <div className="page">
                <Header status = {this.state.loggedIn} mail = {this.state.mail} logout ={this.handlerLoginOut.bind(this)}/>
                <Switch>
                <Route path="/sign-in">
                    <Login status ={this.handleLogin} onSubmit = {this.handleSignIn} setMailHeader = {this.handleSetMail}/>
                </Route>
                <Route path="/sign-up">
                    <Registration 
                        showMessage = {() => this.setState({isTooltipPopupOpen: true})}
                        confirm = {() => this.setState({windowType:true})}
                        error = {() => this.setState({windowType:false})}
                        onSubmit={this.handleRegistration}/>
                </Route>

                <ProtectedRoute exact path="/" 
                    component = {Main} 
                    loggedIn = {this.state.loggedIn}
                    onCardClick = {this.setCardInfo.bind(this)} 
                    onEditProfile ={() => this.setState({isEditProfilePopupOpen: true})}
                    onAddPlace ={() => this.setState({isAddPlacePopupOpen: true})}
                    onEditAvatar ={() => this.setState({isEditAvatarPopupOpen: true})}
                    cards ={this.state.cards}
                    onCardLike = {this.handleCardLike.bind(this)}
                    onCardDelete = {this.handleCardDelete.bind(this)}
                    initCards ={this.handleInitCards.bind(this)}>     
                </ProtectedRoute>
                </Switch>
                <Footer/>
                
                <AddPlacePopup 
                    onAddPlace ={this.handleAddCard.bind(this)} 
                    onClose = {() => this.closeAllPopups()} 
                    isOpen = {this.state.isAddPlacePopupOpen}/>

                <EditProfilePopup 
                    onClose = {() => this.closeAllPopups()} 
                    isOpen = {this.state.isEditProfilePopupOpen} 
                    onUpdateUser ={this.handleUpdateUser.bind(this)}/>

                <EditAvatarPopup 
                    onUpdateAvatar = {this.handleUpdateAvatar.bind(this)} 
                    onClose = {() => this.closeAllPopups()} 
                    isOpen = {this.state.isEditAvatarPopupOpen}/> 

                <PopupWithForm 
                    name="confirm" 
                    title="Вы уверены?" 
                    isOpen = {false}/>

                <ImagePopup 
                    card = {this.state.selectedCard} 
                    onClose = {() => this.closeAllPopups()}/> 
                
                <InfoToolTip
                    isOpen ={this.state.isTooltipPopupOpen}
                    name={'tooltip'}
                    type={this.state.windowType}
                    onClose={()=> this.closeAllPopups()}/>
            </div>
        </CurrentUserContext.Provider>
        );
    }
}



export default withRouter(App);
