import {StyleSheet} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import TestScreen from './src/screens/TestScreen';

export default function App() {
  return (
    <Provider store={store}>
      <TestScreen />
    </Provider>
  );
}

const styles = StyleSheet.create({});
