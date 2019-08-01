import React from 'react'
import { AsyncStorage, ImageBackground, Platform, StyleSheet, Text, } from 'react-native'
import AnimatedHeart from '../baseComponents/AnimatedHeart'
/* import RNIsDeviceRooted from 'react-native-is-device-rooted'
*/
import JailMonkey from 'jail-monkey'

import { connect } from 'react-redux'
import { setTheme, setLang, setShowIntro } from '../redux/actions/appState'
import { setUser } from '../redux/actions/user'

import store from '../redux/store'
import { getLanguage } from '../i18n'
import i18n from '../i18n'

import backgroundWhite from '../assets/images/main/bg_white.jpg'
import backgroundDark from '../assets/images/main/bg_dark.jpg'

const appScope = { scope: "app" }

/**
 * Initial screen component
 *
 * @class InitialScreen
 * @extends {React.Component}
 */
class InitialScreen extends React.Component {

  state = {
    isDeviceRooted: false,
    mode: 'light',
    error: null,
  }

  loadAppData = async () => {
    let user = await AsyncStorage.getItem('app_user')

    if (user !== null) {
      let appSettings = await AsyncStorage.getItem('app_settings')
        , appUser = await AsyncStorage.getItem('app_user')
      if (appSettings) {
        appSettings = JSON.parse(appSettings)
        this.setState({ mode: appSettings.theme })
        this.props.dispatch(setTheme(appSettings.theme))
        this.props.dispatch(setLang(appSettings.lang))
        this.props.dispatch(setShowIntro(appSettings.showIntro))
        this.props.dispatch(setUser(JSON.parse(appUser)))
        i18n.locale = appSettings.lang
        setTimeout(() => {
          if (this.props.app.showIntro)
            this.props.navigation.navigate('IntroApp')
          else
            this.props.navigation.navigate('AppStack')
        }, 500)
      } else {
        setTimeout(() => {
          this.props.dispatch(setLang(getLanguage()))
          this.props.dispatch(setUser(JSON.parse(appUser)))
          i18n.locale = getLanguage()
          if (this.props.app.showIntro)
            this.props.navigation.navigate('IntroApp')
          else
            this.props.navigation.navigate('AppStack')
        }, 2000)
      }
    } else {
      setTimeout(() => {
        this.props.dispatch(setLang(getLanguage()))
        i18n.locale = getLanguage()
        this.props.navigation.navigate('LangStack')
      }, 2000)
    }
  }

  /**
   * If logged loads user and app data, changes the flow to app stack
   * if not logged changes the flow to login stack
   *
   * @memberof InitialScreen
   */
  async componentDidMount() {
    this.loadAppData()
    if (Platform.OS === 'android') {
      /* try {
        const isDeviceRooted = await RNIsDeviceRooted.isDeviceRooted()
        if (!isDeviceRooted) {
          this.loadAppData()
        } else {
          i18n.locale = getLanguage()
          this.setState({ isDeviceRooted })
        }

      } catch (e) {
        this.loadAppData()
        console.error('device Root error', e)
      } */
    } else {
      if (!JailMonkey.isJailBroken()) {
        this.loadAppData()
      } else {
        i18n.locale = getLanguage()
        this.setState({ isDeviceRooted })
      }
      this.loadAppData()
    }
  }

  render() {
    return this.state.isDeviceRooted
      ? <ImageBackground source={this.state.mode === 'light' ? backgroundWhite : backgroundDark} style={styles.container} resizeMode='cover' >
        <AnimatedHeart height={150} width={150} />
        <Text style={styles.text}>{i18n.t(`root_message_${Platform.OS}`, appScope)}</Text>
      </ImageBackground>
      : <ImageBackground source={this.state.mode === 'light' ? backgroundWhite : backgroundDark} style={styles.container} resizeMode='cover' >
        <AnimatedHeart height={150} width={150} />
      </ImageBackground>
  }
}


const mapStateToProps = state => ({
  app: state.app,
})

export default connect(mapStateToProps)(InitialScreen)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    marginHorizontal: 40,
    color: '#f4dc60',
    fontFamily: 'OpenSans-Bold',
    fontSize: 15,
    textAlign: 'center'
  }
})