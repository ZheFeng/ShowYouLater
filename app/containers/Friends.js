import React, { Component } from 'react';
import { Container, Button, Title, Text, List, ListItem } from 'native-base';
import { observer } from "mobx-react";

@observer
export default class Friends extends Component {
  static navigationOptions = {
    title: 'Friends',
  };
  signOut() {
    this.props.user.signOut();
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Button onPress={() => this.signOut()}>
          <Title>Sign Out</Title>
        </Button>
        <List>{this.props.user.friends.map(friend => (<ListItem><Text>{friend.uid}</Text></ListItem>))}</List>
        <Button onPress={() => navigate('AddFriend', { navigate: this.props.navigation })}>
          <Title>AddFriend</Title>
        </Button>
      </Container>
    );
  }
}
