import { createStackNavigator } from 'react-navigation'

import ChooseLangScreen from '../screens/ChooseLang'


const LangStack = createStackNavigator({
  ChooseLang: { screen: ChooseLangScreen },
}, {
    headerMode: 'none',
    initialRouteName: 'ChooseLang'
  })

export default LangStack