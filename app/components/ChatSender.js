import React, { Component } from 'react';
import { TextInput } from 'react-native';
import { Input } from 'native-base';

export default class ChatSender extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.sendMessage = this.sendMessage.bind(this);
  }
  sendMessage() {
    const text = this.state.text.trim();
    if (text) {
      this.props.sendMessage(text);
      this.setState({ text: '' })
    }
  }
  render() {
    return (
      <Input
        placeholder="Type here to send message!"
        onSubmitEditing={this.sendMessage}
        onChangeText={(text) => this.setState({ text })}
        value={this.state.text}
      />
    );
  }
}