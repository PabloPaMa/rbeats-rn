import { createStackNavigator } from 'react-navigation'

import HomeScreen from '../screens/HomeScreen'
import MediaGridScreen from '../screens/MediaGridScreen'
import ConsultaScreen from '../screens/ConsultaScreen'
import SOSScreen from '../screens/SOSScreen'
import MediaItemScreen from '../screens/MediaItemScreen'
import ConsultaItemScreen from '../screens/ConsultaItemScreen'
import SOSItemScreen from '../screens/SOSItemScreen'
import ChatScreen from '../screens/ChatScreen'
import SettingsScreen from '../screens/SettingsScreen'
import BrowserScreen from '../screens/BrowserView'
import VideoPlayerScreen from '../screens/VideoPlayerScreen'
import ImageVisorScreen from '../screens/ImageVisorScreen'

const AppStack = createStackNavigator({
  Home: { screen: HomeScreen },
  MediaGrid: { screen: MediaGridScreen },
  Consulta: { screen: ConsultaScreen },
  SOS: { screen: SOSScreen },
  MediaItem: { screen: MediaItemScreen },
  ConsultaItem: { screen: ConsultaItemScreen },
  SOSItem: { screen: SOSItemScreen },
  Chat: { screen: ChatScreen },
  Settings: { screen: SettingsScreen },
  Browser: { screen: BrowserScreen },
  VideoPlayer: { screen: VideoPlayerScreen },
  ImageVisor: { screen: ImageVisorScreen }
}, {
    headerMode: 'none',
    initialRouteName: 'Home'
  })

export default AppStack