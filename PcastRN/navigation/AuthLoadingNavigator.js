import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import { createAppContainer } from 'react-navigation';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});


const screens = {
    AuthLoading:{
      screen : AuthLoadingScreen
    },
}
  
const sc = createStackNavigator(screens);
  
export default createAppContainer(sc);