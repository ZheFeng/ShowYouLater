import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base';

export default class ChatList extends Component {
  render() {
    return (
      <Container>
        {this.props.messages.map(msg => (<Text key={msg.key}>{msg.val.text}</Text>))}
      </Container>
    );
  }
}

