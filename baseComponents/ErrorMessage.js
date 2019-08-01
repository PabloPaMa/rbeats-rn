import React from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import i18n from '../i18n'

import backgroundWhite from '../assets/images/main/bg_white.jpg'
import backgroundDark from '../assets/images/main/bg_dark.jpg'

const appScope = { scope: "app" }

/**
 * It renders a screen called when there is a request failure
 *
 * @param {*} props
 */
const erroMessage = props => <ImageBackground source={props.app.theme === 'light' ? backgroundWhite : backgroundDark} style={styles.container} resizeMode='cover'>
  <Text style={[styles.primaryText, { color: props.app.theme === 'light' ? '#222' : '#AAA' }]}>{i18n.t('error', appScope)}</Text>
  {
    props.message.split('|').map(message => <Text key={message} style={{ color: props.app.theme === 'light' ? '#222' : '#AAA' }}>{message}</Text>)
  }
</ImageBackground>

const mapStateToProps = state => ({
  app: state.app,
})

export default connect(mapStateToProps)(erroMessage)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  primaryText: {
    fontSize: 24
  }
})

