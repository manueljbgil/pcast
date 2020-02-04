import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import PodcastScreen from '../screens/PodcastScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { createAppContainer } from 'react-navigation';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const screens = {
    Profile:{
      screen: ProfileScreen
    }
}
  
const sc = createStackNavigator(screens);
  
export default createAppContainer(sc);