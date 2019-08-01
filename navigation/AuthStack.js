import { createStackNavigator } from 'react-navigation'

import AuthScreen from '../screens/AuthScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterUserScreen from '../screens/RegisterUserScreen'
import AboutScreen from '../screens/AboutScreen'
import AboutRBScreen from '../screens/AboutRBScreen'

const AuthStack = createStackNavigator({
  Auth: { screen: AuthScreen },
  Login: { screen: LoginScreen },
  RegisterUser: { screen: RegisterUserScreen },
  About: { screen: AboutScreen },
  AboutRB: { screen: AboutRBScreen }
}, {
    headerMode: 'none',
    initialRouteName: 'Auth'
  })

export default AuthStack