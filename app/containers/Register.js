import React, { Component } from 'react';
import { Container, Title, Content, Form, Item, Input, Label, Button, Text } from 'native-base';

export default class Register extends Component {
  static navigationOptions = {
    title: 'Register',
  };
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);
    this.state = {
      email: '',
      password: '',
    }
  }
  register() {
    this.props.app.createUserWithEmailAndPassword(this.state.email, this.state.password);
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
            <Item inlineLabel last>
              <Label>Password</Label>
              <Input secureTextEntry value={this.state.password} onChangeText={password => this.setState({ password })} />
            </Item>
            <Button block onPress={this.register}>
              <Text>Sign Up</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
