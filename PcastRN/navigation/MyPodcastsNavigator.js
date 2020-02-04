import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import MyStartingScreen from '../screens/MyStartingScreen';
import MyHomeScreen from '../screens/MyHomeScreen';
import MyPodcastScreen from '../screens/MyPodcastScreen';
import MyReproductionScreen from '../screens/MyReproductionScreen';
import { createAppContainer } from 'react-navigation';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

//meter Todos/meus entre AuthLoaing e Home
const screens = {
  MyHome:{
    screen : MyHomeScreen
  },
  MyPodcast:{
    screen: MyPodcastScreen
  },
  MyReproduction:{
    screen: MyReproductionScreen
  }
}

const sc = createStackNavigator(screens);

export default createAppContainer(sc);
