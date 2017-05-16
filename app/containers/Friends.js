import React, { Component } from 'react';
import { Container, Button, Title, Text } from 'native-base';

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
        <Text>{JSON.stringify(this.props.user.friendsDatabase)}</Text>
        <Title>Friends Screen!</Title>
        <Button onPress={() => this.signOut()}>
          <Title>Sign Out</Title>
        </Button>
        <Button onPress={() => navigate('AddFriend', { navigate: this.props.navigation })}>
          <Title>AddFriend</Title>
        </Button>
        <Button onPress={() => navigate('ChatRoom', { navigate: this.props.navigation })}>
          <Title>ChatRoom</Title>
        </Button>
      </Container>
    );
  }
}
