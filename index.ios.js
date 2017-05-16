/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import ShowYouLater from './app/';

export default class ShowYouLaterApp extends Component {
  render() {
    return (
      <ShowYouLater />
    );
  }
}

AppRegistry.registerComponent('ShowYouLater', () => ShowYouLaterApp);
