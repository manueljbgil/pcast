import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthenticationNavigator from './AuthenticationNavigator';
import AuthLoadingNavigator from './AuthLoadingNavigator';
import ProfileNavigator from './ProfileNavigator';
import MyPodcastsNavigator from './MyPodcastsNavigator';

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    
    //AuthLoad: AuthLoadingNavigator,
    Main: MainTabNavigator,
    MyPodcasts: MyPodcastsNavigator,
    Auth: AuthenticationNavigator,
    Profile: ProfileNavigator,
  },
  {
    initialRouteName: 'Main',
  }
  )
);
