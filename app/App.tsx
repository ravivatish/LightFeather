/**
 * LightFeather React Native App
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Toast from 'react-native-toast-message';
import Login from './src/screens/Login';





function App(): React.JSX.Element {
  return (
    <>
    <Login />
    <Toast position='top' autoHide={true} />
    </>
  );
}



export default App;
