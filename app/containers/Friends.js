import React, { Component } from 'react';
import { Container, Button, Title, Text, List, ListItem } from 'native-base';
import { observer } from "mobx-react";

@observer
export default class Friends extends Component {
  static navigationOptions = {
    title: 'Friends',
  };
  constructor(props) {
    super(props);
    this.renderRoom = this.renderRoom.bind(this);
  }
  signOut() {
    this.props.app.signOut();
  }
  showRoom() {

  }
  renderRoom(room) {
    return (
      <ListItem>
        <Text>{room.key}</Text>
      </ListItem>
    )
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Button onPress={() => this.signOut()}>
          <Title>Sign Out</Title>
        </Button>
        <List>{this.props.app.rooms.map(this.renderRoom)}</List>
        <Button onPress={() => navigate('AddFriend', { navigate: this.props.navigation })}>
          <Title>AddFriend</Title>
        </Button>
      </Container>
    );
  }
}
