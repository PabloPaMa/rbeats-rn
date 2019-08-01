import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import InitialScreen from '../screens/InitialScreen'
import IntroAppScreen from '../screens/IntroAppScreen'
import AuthStack from './AuthStack'
import AppStack from './AppStack'
import LangStack from './LangStack'

export default createAppContainer(createSwitchNavigator({
  Initial: { screen: InitialScreen },
  IntroApp: { screen: IntroAppScreen },
  AuthStack,
  AppStack,
  LangStack,
}))