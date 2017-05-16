import React, { Component } from 'react';
import { Container, Title, Content, Form, Item, Input, Label, Button, Text } from 'native-base';

export default class Login extends Component {
  static navigationOptions = {
    title: 'Login',
  };
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.state = {
      email: '',
      password: '',
    }
  }
  login() {
    this.props.user.signInWithEmailAndPassword(this.state.email, this.state.password);
  }
  render() {
    const { navigate } = this.props.navigation
    return (
      <Container padder>
        <Content>
          <Form>
            <Button onPress={() => navigate('Register')}>
              <Title>Register</Title>
            </Button>
            <Item inlineLabel>
              <Label>Email</Label>
              <Input value={this.state.email} onChangeText={email => this.setState({ email })} />
            </Item>
            <Item inlineLabel last>
              <Label>Password</Label>
              <Input secureTextEntry value={this.state.password} onChangeText={password => this.setState({ password })} />
            </Item>
            <Button block onPress={this.login}>
              <Text>Sign In</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
