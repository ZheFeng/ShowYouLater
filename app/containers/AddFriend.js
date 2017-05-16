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
      email: '',
    }
  }
  addFriend() {
    this.props.user.addFriend(this.state.email);
  }
  render() {
    return (
      <Container padder>
        <Content>
          <Form>
            <Item inlineLabel>
              <Label>Email</Label>
              <Input value={this.state.email} onChangeText={email => this.setState({ email })} />
            </Item>
            <Button block onPress={this.addFriend}>
              <Text>Sign In</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
