import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import StartingScreen from '../screens/StartingScreen';
import HomeScreen from '../screens/HomeScreen';
import PodcastScreen from '../screens/PodcastScreen';
import ReproductionScreen from '../screens/ReproductionScreen';
import { createAppContainer } from 'react-navigation';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

//meter Todos/meus entre AuthLoaing e Home
const screens = {
  AuthLoading:{
    screen: AuthLoadingScreen
  },
  Starting:{
    screen: StartingScreen
  },
  Home:{
    screen : HomeScreen
  },
  Podcast:{
    screen: PodcastScreen
  },
  Reproduction:{
    screen: ReproductionScreen
  }
}

const sc = createStackNavigator(screens);

export default createAppContainer(sc);
