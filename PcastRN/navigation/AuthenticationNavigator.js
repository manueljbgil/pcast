import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { createAppContainer } from 'react-navigation';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});


const screens = {
    SignIn:{
      screen : SignInScreen
    },
    SignUp:{
      screen : SignUpScreen
    }
}
  
const sc = createStackNavigator(screens);
  
export default createAppContainer(sc);