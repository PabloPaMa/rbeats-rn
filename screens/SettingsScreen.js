import React from 'react'
import { Text, StyleSheet, TouchableOpacity, Switch, View } from 'react-native'
import PickerSelect from 'react-native-picker-select'
import { connect } from 'react-redux'
import { setTheme, setLang, setShowIntro } from '../redux/actions/appState'
import { setUserCountryCode } from '../redux/actions/user'
import i18n from '../i18n'
import SecureStorage, { ACCESS_CONTROL, ACCESSIBLE, AUTHENTICATION_TYPE } from 'react-native-secure-storage'

import Layout from '../baseComponents/Layout'

const settingScope = { scope: "settings" }
const sectionScope = { scope: "sections" }

const config = {
  accessControl: ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE,
  accessible: ACCESSIBLE.WHEN_UNLOCKED,
  authenticationPrompt: 'auth with yourself',
  service: 'rbeats',
  authenticateType: AUTHENTICATION_TYPE.BIOMETRICS,
}

/**
 * Settings screen component
 * used for testing porpuses
 * not released for users
 *
 * @class SettingsScreen
 * @extends {React.Component}
 */
class SettingsScreen extends React.Component {

  state = {
    lang: '',
    langs: [{ label: '', value: 'es' }, { label: '', value: 'en' }, { label: '', value: 'pt' }],
    countryCode: '',
    countryCodes: [{ label: 'MX', value: 'MX' }, { label: 'BR', value: 'BR' }, { label: 'US', value: 'US' }],
  }

  onChangeTheme = async () => {
    let { theme } = this.props.app
    this.props.dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))
    await SecureStorage.setItem('@app:settings', JSON.stringify({
      ...this.props.app,
      theme: theme === 'light' ? 'dark' : 'light'
    }), config)
  }

  onChangeLang = async (lang) => {
    if (lang !== '') {
      this.props.dispatch(setLang(lang))
      i18n.locale = lang
      this.setState({
        lang,
        langs: this.state.langs.map(lang => ({ ...lang, label: i18n.t(lang.value, settingScope) }))
      }, async () => {
        await SecureStorage.setItem('app_settings', JSON.stringify({
          ...this.props.app,
          lang
        }), config)
      })
    }
  }

  onChangeCountryCode = async (countryCode) => {
    if (countryCode !== '') {
      console.log('countryCode', countryCode)
      this.props.dispatch(setUserCountryCode(countryCode))
      this.setState({
        countryCode,
      }, async () => {
        SecureStorage.setItem('app_settings', JSON.stringify({
          ...this.props.user,
          countryCode
        }), config)
      })
    }
  }

  onChangeShowInto = async () => {
    let { showIntro } = this.props.app
    this.props.dispatch(setShowIntro(!showIntro))
    await SecureStorage.setItem('app_settings', JSON.stringify({
      ...this.props.app,
      showIntro: !showIntro
    }), config)
  }

  componentDidMount() {
    this.onChangeLang(this.props.app.lang)
    this.onChangeCountryCode(this.props.user.countryCode)
  }

  render() {
    return <Layout backButton sectionName={i18n.t('settings', sectionScope)}>
      <TouchableOpacity onPress={this.onChangeTheme} style={styles.simpleOption}>
        <Text numberOfLines={1} style={styles.text}>{i18n.t('dark_mode', settingScope)}</Text>
        <Switch
          value={this.props.app.theme === 'dark'}
          onValueChange={this.onChangeTheme}
          backgroundActive={'#f4dc60'}
          backgroundInactive={'#f4dc60'}
          circleActiveColor={'#FFF'}
          circleInactiveColor={'#000'}
        />
      </TouchableOpacity>
      <View style={styles.simpleOption}>
        <Text numberOfLines={1} style={styles.text}>{i18n.t('lang', settingScope)}</Text>
        <PickerSelect
          placeholderTextColor='#979797'
          placeholder={{ label: i18n.t('lang', settingScope), value: '', }}
          items={this.state.langs}
          onValueChange={lang => this.onChangeLang(lang)}
          style={pickerStyles}
          value={this.state.lang}
          hideIcon={false}
        />
      </View>
      <TouchableOpacity onPress={this.onChangeShowInto} style={styles.simpleOption}>
        <Text numberOfLines={1} style={styles.text}>{i18n.t('showIntro', settingScope)}</Text>
        <Switch
          value={this.props.app.showIntro}
          onValueChange={this.onChangeShowInto}
          backgroundActive={'#f4dc60'}
          backgroundInactive={'#f4dc60'}
          circleActiveColor={'#FFF'}
          circleInactiveColor={'#000'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { this.props.navigation.navigate('IntroApp') }} style={styles.simpleOption}>
        <Text numberOfLines={1} style={styles.text}>{i18n.t('showIntroBtn', settingScope)}</Text>
      </TouchableOpacity>
      <View style={styles.simpleOption}>
        <Text numberOfLines={1} style={styles.text}>{i18n.t('countryCode', settingScope)}</Text>
        <PickerSelect
          placeholderTextColor='#979797'
          items={this.state.countryCodes}
          onValueChange={countryCode => this.onChangeCountryCode(countryCode)}
          style={pickerStyles}
          value={this.state.countryCode}
          hideIcon={false}
        />
      </View>
    </Layout >
  }
}

const mapStateToProps = state => ({
  app: state.app,
  user: state.user
})

export default connect(mapStateToProps)(SettingsScreen)

const styles = StyleSheet.create({
  simpleOption: {
    alignItems: 'center',
    borderBottomColor: '#D15A96',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  text: {
    color: '#9f9fa3',
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
  }
})

const pickerStyles = StyleSheet.create({
  viewContainer: {
    backgroundColor: '#f3f2f7',
    borderRadius: 20,
    fontSize: 15,
    height: 40,
    justifyContent: 'center',
    paddingLeft: 6,
    overflow: 'hidden',
    width: 200
  },
  inputIOS: {
    borderRadius: 10,
    fontFamily: 'OpenSans-Bold',
    fontSize: 15,
    height: 40,
    paddingLeft: 6,
    width: 40
  },
  icon: {
    marginTop: -4,
  }
})