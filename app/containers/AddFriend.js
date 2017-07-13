import React, { Component } from 'react';
import { Container, Title, Content, Form, Item, Input, Label, Button, Text } from 'native-base';

export default class AddFriend extends Component {
  static navigationOptions = {
    title: 'AddFriend',
  };
  constructor(props) {
    super(props);
    this.addFriend = this.addFriend.bind(this);
    this.state = {
      uid: '',
    }
  }
  addFriend() {
    this.props.app.addFriend(this.state.uid);
  }
  render() {
    return (
      <Container padder>
        <Content>
          <Form>
            <Item inlineLabel>
              <Label>User Id</Label>
              <Input value={this.state.uid} onChangeText={uid => this.setState({ uid })} />
            </Item>
            <Button block onPress={this.addFriend}>
              <Text>Add</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
