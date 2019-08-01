import React from 'react'
import { Text, StyleSheet, ImageBackground } from 'react-native'
import { connect } from 'react-redux'
import i18n from '../i18n'

import AnimatedHeart from './AnimatedHeart'

import backgroundWhite from '../assets/images/main/bg_white.jpg'
import backgroundDark from '../assets/images/main/bg_dark.jpg'

const appScope = { scope: "app" }

/**
 * A loading screen used when data is not available to display
 *
 * @param {Object} props
 */
const loadingHeart = props => <ImageBackground source={props.app.theme === 'light' ? backgroundWhite : backgroundDark} style={styles.container} resizeMode='cover'>
  <AnimatedHeart width={150} height={150} />
  <Text
    style={[styles.text, { color: props.app.theme === 'light' ? '#222' : '#AAA', fontFamily: 'OpenSans-Regular', width: '80%', alignSelf: 'center', textAlign: 'center', fontSize: 20, marginBottom: 20 }]}
  >{props.text ? props.text : i18n.t('laoding', appScope)}</Text>
</ImageBackground>

const mapStateToProps = state => ({
  app: state.app,
})


export default connect(mapStateToProps)(loadingHeart)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    position: 'absolute',
    bottom: 30,
  }
})