import React from 'react'
import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { connect } from 'react-redux'
import i18n from '../i18n'
import { setLang } from '../redux/actions/appState'
import backgroundWhite from '../assets/images/main/bg_white.jpg'
import backgroundDark from '../assets/images/main/bg_dark.jpg'
import rbLogo from '../assets/images/logo/rb_logo.png'

const appScope = { scope: "app" }


/**
 * A basic UI that handles the app language defined by user
 *
 * @param {*} props
 */
const chooseLang = props => <ImageBackground source={props.app.theme === 'light' ? backgroundWhite : backgroundDark} style={styles.container} resizeMode='cover'>
  <SafeAreaView>
    <ScrollView contentContainerStyle={{ alignItems: 'center', width: '100%' }}>
      <View style={[styles.section]}>
        <Image source={rbLogo} style={[styles.logo]} resizeMode='contain' />
      </View>
      <View style={{ flex: 1, alignItems: 'center', maxWidth: '90%', width: '90%' }}>
        <Text style={[styles.text, { color: '#a09fa5' }]}>{i18n.t('choose_lang', appScope)}</Text>
        <TouchableOpacity onPress={() => { props.dispatch(setLang('es')); i18n.locale = 'es'; props.navigation.navigate('Auth') }} style={styles.button}>
          <View style={{ flex: 1, paddingRight: 10, alignItems: 'flex-end', marginLeft: '-20%' }}>
            <Image source={{ uri: 'https://www.countryflags.io/MX/flat/64.png' }} style={styles.image} />
          </View>
          <Text style={[styles.text, { flex: 1, textAlign: 'left' }]}>Español</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { props.dispatch(setLang('pt')); i18n.locale = 'pt'; props.navigation.navigate('Auth') }} style={styles.button}>
          <View style={{ flex: 1, paddingRight: 10, alignItems: 'flex-end', marginLeft: '-20%' }}>
            <Image source={{ uri: 'https://www.countryflags.io/BR/flat/64.png' }} style={styles.image} />
          </View>
          <Text style={[styles.text, { flex: 1, textAlign: 'left' }]}>Português</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { props.dispatch(setLang('en')); i18n.locale = 'en'; props.navigation.navigate('Auth') }} style={styles.button}>
          <View style={{ flex: 1, paddingRight: 10, alignItems: 'flex-end', marginLeft: '-20%' }}>
            <Image source={{ uri: 'https://www.countryflags.io/US/flat/64.png' }} style={styles.image} />
          </View>
          <Text style={[styles.text, { flex: 1, textAlign: 'left' }]}>English</Text>
        </TouchableOpacity>
        <Text style={{ textAlign: 'center', marginTop: 20, marginBottom: 10, color: '#9f9fa3', fontFamily: 'OpenSans-SemiBold', fontSize: 15 }}>{i18n.t('introLang', appScope)}</Text>
      </View>
    </ScrollView>
  </SafeAreaView>
</ImageBackground>

const mapStateToProps = state => ({
  app: state.app,
})

export default connect(mapStateToProps)(chooseLang)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    height: 24,
    width: 30
  },
  text: {
    color: '#c6c5cb',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 18,
    textAlign: 'center',
  },
  section: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 10
  },
  logo: {
    height: 180,
    marginTop: 30,
    width: 180,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#f1f0f6',
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    margin: 10,
    width: '80%'
  }
})
