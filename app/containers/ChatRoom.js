/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import * as firebase from 'firebase';
import uuid from 'uuid';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform
} from 'react-native';
import ChatList from '../components/ChatList';
import ChatSender from '../components/ChatSender';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base';

// const firebaseConfig = {
//   apiKey: "AIzaSyBSPdTRcO4ZSxBuA_i9mZRAGze0FPkAI14",
//   authDomain: "showyoulater-929e8.firebaseapp.com",
//   databaseURL: "https://showyoulater-929e8.firebaseio.com",
//   projectId: "showyoulater-929e8",
//   storageBucket: "showyoulater-929e8.appspot.com",
//   messagingSenderId: "789261927228"
// };
// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const messageDatabase = firebase.database().ref('messages');

export default class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = { id: uuid(), messages: [] };
    this.setMessages = this.setMessages.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }
  componentDidMount() {
    messageDatabase.on('value', this.setMessages);
  }
  setMessages(snap) {
    const messages = [];
    snap.forEach(child => {
      messages.push({
        key: child.key,
        val: child.val()
      });
    });
    this.setState({ messages })
  }
  sendMessage(text) {
    messageDatabase.push({ uid: this.state.id, text })
  }
  render() {
    return (
      <Container>
        <Content>
          <ChatList messages={this.state.messages} />
        </Content>
        <Footer>
          <FooterTab>
            <ChatSender sendMessage={this.sendMessage} />
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
