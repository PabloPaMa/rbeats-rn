import React from 'react'
import { Image, ImageBackground, Platform, StyleSheet, Text, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import i18n from '../i18n'
import AnimatedHeart from '../baseComponents/AnimatedHeart'

import backgroundWhite from '../assets/images/main/bg_white.jpg'
import backgroundDark from '../assets/images/main/bg_dark.jpg'
import backBtn from '../assets/images/icons/back_btn.png'

import chatLogo from '../assets/images/icons/icon_chat.png'
import mediaLogo from '../assets/images/icons/icon_media.png'
import consultaLogo from '../assets/images/icons/icon_consulta.png'
import SOSLogo from '../assets/images/icons/icon_sos.png'

const appScope = { scope: "app" }
const loginScope = { scope: "login" }
const introScope = { scope: "intro" }

let size = Platform.OS === 'ios'
  ? {
    height: 40,
    width: 40
  }
  : {}

/**
 * A about screen used in app screens,
 * it handles actions according to the screen type
 *
 * @param {*} props
 * @returns
 */
const aboutScreen = props => {
  return <View style={styles.container}>
    <SafeAreaView style={[styles.header, { backgroundColor: props.app.theme === 'light' ? '#f2f2f2' : '#222', }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => props.navigation.goBack()} >
          <Image source={backBtn} style={{ height: 30, width: 30 }} />
        </TouchableOpacity>
        <Text
          onPress={() => { if (props.backButton) props.navigation.goBack() }}
          style={styles.headerText}>{i18n.t('about', loginScope)}</Text>
      </View>
      <View style={{ marginRight: Platform.OS === 'ios' ? 20 : 0 }}>
        <AnimatedHeart {...size} />
      </View>
    </SafeAreaView>
    <ImageBackground source={props.app.theme === 'light' ? backgroundWhite : backgroundDark} style={styles.container} resizeMode='cover'>
      <View style={{ flex: 1, }}>
        <ScrollView>
          <Text style={{ color: '#a09fa4', fontSize: 30, marginLeft: '15%', marginTop: 20, marginBottom: 15, fontFamily: 'OpenSans-Bold' }}>Qué es RBeats</Text>
          <Text style={{ color: '#a09fa4', width: '80%', textAlign: 'justify', alignSelf: 'center', marginBottom: 20, fontFamily: 'OpenSans-Regular' }}>RBeats es una aplicación privada desarrollada entre Compliance y Seguridad Corporativa para los empleados de RB. Esta aplicación es una herramienta que brindará soporte, asesoría y canales de comunicación a los colaboradores de RB en sus actividades del día a día</Text>

          <View style={{ flexDirection: 'row', width: '80%', alignSelf: 'center', marginVertical: 15 }}>
            <View style={{ marginRight: 20, height: 80, width: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f4dc60' }}>
              <Image source={chatLogo} style={{ height: 50, width: 50 }} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: '#a09fa4', fontFamily: 'OpenSans-Bold', fontSize: 18 }}>{i18n.t('title_2', introScope)}</Text>
              <Text style={{ color: '#a09fa4', fontFamily: 'OpenSans-Regular' }}>{i18n.t('content_2', introScope)}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', width: '80%', alignSelf: 'center', marginVertical: 15 }}>
            <View style={{ marginRight: 20, height: 80, width: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f4dc60' }}>
              <Image source={mediaLogo} style={{ height: 50, width: 50 }} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: '#a09fa4', fontFamily: 'OpenSans-Bold', fontSize: 18 }}>{i18n.t('title_3', introScope)}</Text>
              <Text style={{ color: '#a09fa4', fontFamily: 'OpenSans-Regular' }}>{i18n.t('content_3', introScope)}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', width: '80%', alignSelf: 'center', marginVertical: 15 }}>
            <View style={{ marginRight: 20, height: 80, width: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f4dc60' }}>
              <Image source={consultaLogo} style={{ height: 50, width: 50 }} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: '#a09fa4', fontFamily: 'OpenSans-Bold', fontSize: 18 }}>{i18n.t('title_4', introScope)}</Text>
              <Text style={{ color: '#a09fa4', fontFamily: 'OpenSans-Regular' }}>{i18n.t('content_4', introScope)}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', width: '80%', alignSelf: 'center', marginVertical: 15 }}>
            <View style={{ marginRight: 20, height: 80, width: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f4dc60' }}>
              <Image source={SOSLogo} style={{ height: 50, width: 50 }} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: '#a09fa4', fontFamily: 'OpenSans-Bold', fontSize: 18 }}>{i18n.t('title_5', introScope)}</Text>
              <Text style={{ color: '#a09fa4', fontFamily: 'OpenSans-Regular' }}>{i18n.t('content_5', introScope)}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
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

export default withNavigation(connect(mapStateToProps)(aboutScreen))

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
    paddingTop: Platform.OS === 'ios' ? 10 : 0
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