import React, { Component } from 'react';
import { initializeApp } from 'firebase';
import { Container, Content, Spinner, Button, Title } from 'native-base';
import Login from './containers/Login';
import Register from './containers/Register';
import Friends from './containers/Friends';
import ChatRoom from './containers/ChatRoom';
import AddFriend from './containers/AddFriend';
import { StackNavigator } from 'react-navigation';
import AppStore from './store/App';
import { observer } from "mobx-react";



const firebaseConfig = {
  apiKey: "AIzaSyBSPdTRcO4ZSxBuA_i9mZRAGze0FPkAI14",
  authDomain: "showyoulater-929e8.firebaseapp.com",
  databaseURL: "https://showyoulater-929e8.firebaseio.com",
  projectId: "showyoulater-929e8",
  storageBucket: "showyoulater-929e8.appspot.com",
  messagingSenderId: "789261927228"
};
const firebase = initializeApp(firebaseConfig);
const app = new AppStore(firebase);
// const messageDatabase = firebase.database().ref('messages');


// setTimeout(() => user.login(), 5000);

const mapStoreToProps = (ScreenComponent) => {
  const title = ScreenComponent.navigationOptions ? ScreenComponent.navigationOptions.title : '';
  return class extends Component {
    static navigationOptions = {
      title
    };
    render() {
      return <ScreenComponent app={app} {...this.props} />
    }
  }
}

const Router = StackNavigator({
  Home: { screen: mapStoreToProps(Friends) },
  ChatRoom: { screen: mapStoreToProps(ChatRoom) },
  AddFriend: { screen: mapStoreToProps(AddFriend) },
});
const UnauthRouter = StackNavigator({
  Home: { screen: mapStoreToProps(Login) },
  Register: { screen: mapStoreToProps(Register) },
});

@observer
export default class App extends React.Component {
  render() {
    if (app.checkingAuthState) {
      return <Spinner />
    }
    if (!app.isLoggedIn) {
      return <UnauthRouter test={123} />;
    }
    return (
      <Router />
    );
  }
}
