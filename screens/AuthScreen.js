import React from 'react'
import { Alert, AsyncStorage, Dimensions, Image, Platform, ImageBackground, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import i18n from '../i18n'
import langLogo from '../assets/images/icons/icon_1.png'

import { setUser } from '../redux/actions/user'

import backgroundWhite from '../assets/images/main/bg_white.jpg'
import backgroundDark from '../assets/images/main/bg_dark.jpg'
import rbLogo from '../assets/images/logo/RB_2012_logo.png'
import aboutImg from '../assets/images/intro/01.jpg'
import brandsImg from '../assets/images/intro/06.jpg'
import innovationImg from '../assets/images/intro/02.jpg'
import responsabilityImg from '../assets/images/intro/03.jpg'
import contactImg from '../assets/images/intro/04.jpg'
import joinImg from '../assets/images/intro/05.jpg'

const { height, width } = Dimensions.get('window')

const loginScope = { scope: "login" }

/**
 * Auth screen component
 *
 * @class AuthScreen
 * @extends {React.Component}
 */
class AuthScreen extends React.Component {

  render() {
    const { navigate } = this.props.navigation

    return <ImageBackground source={this.props.app.theme === 'light' ? backgroundWhite : backgroundDark} style={styles.container} resizeMode='cover' >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View style={[styles.section]}>
            <Image source={rbLogo} style={styles.logo} resizeMode='contain' />
            <TouchableOpacity onPress={() => navigate('LangStack')} style={{ borderRadius: 25, alignItems: 'center', justifyContent: 'center', width: 50, height: 50, position: 'absolute', right: 20, top: 20, backgroundColor: '#f8d847' }}>
              <Image source={langLogo} style={{ width: 30, height: 30, }} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigate('AboutRB', { page: 'about', title: i18n.t('about_title', loginScope) })} style={[styles.option]}>
            <View style={styles.imageContainer}>
              <Image source={aboutImg} style={styles.optionLogo} resizeMode='cover' />
              <View style={{ position: 'absolute', left: 0, width: '100%', height: 100, bottom: -30, }} >
                <LinearGradient style={{ flex: 1, height: 100 }} colors={['transparent', this.props.app.theme === 'light' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.3)']}>
                  <Text style={styles.textSection}>{i18n.t('about_title', loginScope)}</Text>
                </LinearGradient>
              </View>
            </View>
            <Text style={styles.textInfo}>{i18n.t('about_desc', loginScope)} <Text style={{ color: '#a09fa5', fontFamily: 'OpenSans-Bold', }}>{i18n.t('about_bold', loginScope)}</Text></Text>
          </TouchableOpacity>

          <View style={[styles.option, { flexDirection: 'row' }]}>
            <TouchableOpacity onPress={() => navigate('AboutRB', { page: 'brand', title: i18n.t('brand_title', loginScope) })} style={{ flex: 1, height: '100%', marginRight: 10 }}>
              <View style={styles.imageContainer}>
                <Image source={brandsImg} style={styles.optionLogoSingle} />
                <View style={{ position: 'absolute', left: 0, width: '100%', height: 100, bottom: -30, }} >
                  <LinearGradient style={{ flex: 1, height: 100 }} colors={['transparent', this.props.app.theme === 'light' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.3)']}>
                    <Text style={styles.textSection}>{i18n.t('brand_title', loginScope)}</Text>
                  </LinearGradient>
                </View>
              </View>
              <Text style={styles.textInfo}>{i18n.t('brand_desc', loginScope)} <Text style={{ color: '#a09fa5', fontFamily: 'OpenSans-Bold', }}>{i18n.t('brand_bold', loginScope)}</Text></Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate('AboutRB', { page: 'inn', title: i18n.t('inn_title', loginScope) })} style={{ flex: 1, marginLeft: 10 }}>
              <View style={styles.imageContainer}>
                <Image source={innovationImg} style={styles.optionLogoSingle} />
                <View style={{ position: 'absolute', left: 0, width: '100%', height: 100, bottom: -30, }} >
                  <LinearGradient style={{ flex: 1, height: 100 }} colors={['transparent', this.props.app.theme === 'light' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.3)']}>
                    <Text style={styles.textSection}>{i18n.t('inn_title', loginScope)}</Text>
                  </LinearGradient>
                </View>
              </View>
              <Text style={styles.textInfo}>{i18n.t('inn_desc', loginScope)} <Text style={{ color: '#a09fa5', fontFamily: 'OpenSans-Bold', }}>{i18n.t('inn_bold', loginScope)}</Text></Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.option, { flexDirection: 'row' }]}>
            <TouchableOpacity onPress={() => navigate('AboutRB', { page: 'resp', title: i18n.t('resp_title', loginScope) })} style={{ flex: 1, marginRight: 10 }}>
              <View style={styles.imageContainer}>
                <Image source={responsabilityImg} style={styles.optionLogoSingle} />
                <View style={{ position: 'absolute', left: 0, width: '100%', height: 100, bottom: -30, }} >
                  <LinearGradient style={{ flex: 1, height: 100 }} colors={['transparent', this.props.app.theme === 'light' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.3)']}>
                    <Text style={styles.textSection}>{i18n.t('resp_title', loginScope)}</Text>
                  </LinearGradient>
                </View>
              </View>
              <Text style={styles.textInfo}>{i18n.t('resp_desc', loginScope)} <Text style={{ color: '#a09fa5', fontFamily: 'OpenSans-Bold', }}>{i18n.t('resp_bold', loginScope)}</Text></Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              Linking.canOpenURL(`mailto:consumer.relations-latam@rb.com&subject=Hola&body=body`).then(supported => {
                if (supported) Linking.openURL(`mailto:consumer.relations-latam@rb.com&subject=Hola`)
                else Alert.alert('Error', 'No se pudo ejecutar esta acción')
              })
            }} style={{ flex: 1, marginLeft: 10 }}>
              <View style={styles.imageContainer}>
                <Image source={contactImg} style={styles.optionLogoSingle} />
                <View style={{ position: 'absolute', left: 0, width: '100%', height: 100, bottom: -30, }} >
                  <LinearGradient style={{ flex: 1, height: 100 }} colors={['transparent', this.props.app.theme === 'light' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.3)']}>
                    <Text style={styles.textSection}>{i18n.t('contact_title', loginScope)}</Text>
                  </LinearGradient>
                </View>
              </View>
              <Text style={styles.textInfo}>{i18n.t('contact_desc', loginScope)} <Text style={{ color: '#a09fa5', fontFamily: 'OpenSans-Bold', }}>{i18n.t('contact_bold', loginScope)}</Text></Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigate('AboutRB', { page: 'join', title: i18n.t('join_title', loginScope) })} style={[styles.option]}>
            <View style={styles.imageContainer}>
              <Image source={joinImg} style={styles.optionLogo} resizeMode='cover' />
              <View style={{ position: 'absolute', left: 0, width: '100%', height: 100, bottom: -30, }} >
                <LinearGradient style={{ flex: 1, height: 100 }} colors={['transparent', this.props.app.theme === 'light' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.3)']}>
                  <Text style={styles.textSection}>{i18n.t('join_title', loginScope)}</Text>
                </LinearGradient>
              </View>
            </View>
            <Text style={styles.textInfo}>{i18n.t('join_desc', loginScope)} <Text style={{ color: '#a09fa5', fontFamily: 'OpenSans-Bold', }}>{i18n.t('join_bold', loginScope)}</Text></Text>
          </TouchableOpacity>
        </ScrollView>
        <Text onPress={() => navigate('Login')} style={styles.loginBtn}>
          {i18n.t('ask', loginScope)} <Text style={{ color: '#fbc836', fontFamily: 'OpenSans-Bold', }}>{i18n.t('login', loginScope)}</Text>
        </Text>
      </SafeAreaView>
    </ImageBackground>
  }
}

const mapStateToProps = state => ({
  app: state.app,
})

export default connect(mapStateToProps)(AuthScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    alignItems: 'center',
    height: 130,
    justifyContent: 'flex-end',
  },
  logo: {
    height: 100,
  },
  option: {
    margin: 20,
  },
  optionLogo: {
    height: 200,
  },
  imageContainer: {
    alignItems: 'center',
    borderRadius: 20,
    flex: 1,
    justifyContent: 'center',
    maxWidth: '100%',
    marginBottom: 10,
    overflow: 'hidden',
    maxHeight: 200,
  },
  optionLogoSingle: {
    height: 200,
    maxHeight: 200,
    width: width / 2,
  },
  textSection: {
    top: 35,
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    position: 'absolute',
    left: 10
  },
  textInfo: {
    color: '#9f9fa3',
    fontFamily: 'OpenSans-SemiBold',
    paddingLeft: 10,
  },
  loginBtn: {
    backgroundColor: '#a1a0a6',
    color: '#d8d7de',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 15,
    padding: 15,
    textAlign: 'center',
  }
})

/*

        <View style={[styles.form]}>
          <View style={{ flex: 1, justifyContent: 'flex-start' }}>
            <TouchableOpacity onPress={() => navigate('Login')} style={[styles.button, { backgroundColor: '#F4DC60', }]}>
              <Text style={[styles.text, { color: 'white' }]}>Login</Text>
            </TouchableOpacity>

            <LinearGradient
              start={[1, 0]}
              colors={['transparent', this.props.app.theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.2)']}
              style={styles.button}
              onPress={() => navigate('Login')}
            >
              <TouchableOpacity onPress={() => navigate('AboutRB')}>
                <Text style={styles.text}>{i18n.t('about_RB', loginScope)}</Text>
              </TouchableOpacity>
            </LinearGradient>

            <LinearGradient
              start={[1, 0]}
              colors={['transparent', this.props.app.theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.2)']}
              style={styles.button}
              onPress={() => navigate('Login')}
            >
              <TouchableOpacity onPress={() => navigate('About')}>
                <Text style={styles.text}>{i18n.t('about', loginScope)}</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>

        */