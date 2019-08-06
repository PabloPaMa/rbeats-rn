import React from 'react'
import { Image, ImageBackground, Linking, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import i18n from '../i18n'
// import oktaAuth from '../oktaAuth'

const appScope = { scope: "app" }

import AnimatedHeart from './AnimatedHeart'
import Menu from './Menu'

import backgroundWhite from '../assets/images/main/bg_white.jpg'
import backgroundDark from '../assets/images/main/bg_dark.jpg'
import chatLogo from '../assets/images/icons/icon_chat.png'
import mediaLogo from '../assets/images/icons/icon_media.png'
import consultaLogo from '../assets/images/icons/icon_consulta.png'
import SOSLogo from '../assets/images/icons/icon_sos.png'
import speakupLogo from '../assets/images/icons/icon_speakup.png'
import backBtn from '../assets/images/icons/back_btn.png'
import logoutLogo from '../assets/images/icons/logout.png'

/**
 * A layout base used in app screens,
 * it handles actions according to the screen type
 *
 * @param {*} props
 * @returns
 */
const layout = props => {

  const actionButtons = [
    {
      title: 'Chatea',
      onPress: () => { props.navigation.navigate('Chat') },
      icon: chatLogo
    },
    {
      title: 'Entérate',
      onPress: () => { props.navigation.navigate('MediaGrid') },
      icon: mediaLogo
    },
    {
      title: 'Consulta',
      onPress: () => { props.navigation.navigate('Consulta') },
      icon: consultaLogo
    },
    {
      title: 'SOS',
      onPress: () => { props.navigation.navigate('SOS') },
      icon: SOSLogo
    },
    {
      title: 'Speak up',
      onPress: () => {
        Linking.canOpenURL('https://secure.ethicspoint.eu/domain/media/en/gui/102030/index.html').then(supported => {
          if (supported) Linking.openURL('https://secure.ethicspoint.eu/domain/media/en/gui/102030/index.html')
          else console.log("Don't know how to open URI: https://secure.ethicspoint.eu/domain/media/en/gui/102030/index.html")
        })
      },
      icon: speakupLogo
    },
    {
      title: 'Close',
      onPress: async () => {
        // await oktaAuth.signOut()
        props.navigation.navigate('Initial')
      },
      icon: logoutLogo
    },
  ]

  let size = Platform.OS === 'ios'
    ? {
      height: 40,
      width: 40
    }
    : {}

  return <View style={styles.container}>
    <SafeAreaView style={[styles.header, { backgroundColor: props.app.theme === 'light' ? '#f2f2f2' : '#222', }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20, }}>
        {
          props.backButton
            ? <TouchableOpacity onPress={() => props.navigation.goBack()} >
              <Image source={backBtn} style={{ height: 30, width: 30 }} />
            </TouchableOpacity>
            : null
        }
        <Text
          onPress={() => { if (props.backButton) props.navigation.goBack() }}
          style={styles.headerText}>{props.sectionName ? props.sectionName : 'Sección'}</Text>
      </View>
      <TouchableOpacity style={{ marginRight: Platform.OS === 'ios' ? 20 : 0 }} onPress={() => props.navigation.navigate('Home')}>
        <AnimatedHeart {...size} />
      </TouchableOpacity>
    </SafeAreaView>
    <ImageBackground source={props.app.theme === 'light' ? backgroundWhite : backgroundDark} style={styles.container} resizeMode='cover'>
      <View style={{ flex: 1, }}>
        {props.children}
      </View>
      {
        props.backButton
          ? null
          : <Menu buttonColor='#f4dc60' >
            {
              actionButtons.map(action => {
                let color = action.title === 'Close' ? '#a1a0a6' : '#f4dc60'
                return <Menu.Item
                  key={action.title}
                  buttonColor={color}
                  onPress={action.onPress}>
                  <Image source={action.icon} style={{ height: 40, width: 40 }} resizeMode='contain' />
                </Menu.Item>
              })
            }
          </Menu>
      }
      {
        !props.app.isOnline
          ? <Text style={styles.offlineMessage}>{i18n.t('offline_message', appScope)}</Text>
          : null
      }
    </ImageBackground>
  </View>
}


const mapStateToProps = state => ({
  app: state.app,
})

export default withNavigation(connect(mapStateToProps)(layout))

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 100 : 80,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    maxWidth: '100%'
  },
  headerText: {
    color: '#9f9fa3',
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
  },
  offlineMessage: {
    backgroundColor: '#d15a96',
    color: '#f4dc60',
    fontFamily: 'OpenSans-Bold',
    fontSize: 15,
    textAlign: 'center'
  }
})