import React from 'react'
import { Alert, Clipboard, AsyncStorage, Dimensions, Image, ImageBackground, Linking, SafeAreaView, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import i18n, { getLanguageByCountryCode } from '../i18n'
import LoadingHeart from '../baseComponents/LoadingHeart'
import { fetch } from 'react-native-ssl-pinning'

import { setUser } from '../redux/actions/user'

import backgroundWhite from '../assets/images/main/bg_white.jpg'
import backgroundDark from '../assets/images/main/bg_dark.jpg'
import rbLogo from '../assets/images/logo/rb_logo.png'
import backBtn from '../assets/images/icons/back_btn.png'

const { height, width } = Dimensions.get('window')

const loginScope = { scope: "login" }
const inputsScope = { scope: "inputs" }
const appScope = { scope: "app" }


/**
 * Login screen component
 *
 * @class LoginScreen
 * @extends {React.Component}
 */
class LoginScreen extends React.Component {

  state = {
    cancelled: false,
    isAuthFlow: false,
    isTesting: false,
    isInvalidCode: false,
    isCodeSent: false,
    email: '',
    code: '',
    message: '',
    validData: null
  }


  /**
   * Sends an email as parameter,
   * if email exists, we get an 8 digit code verification,
   * we persist that code and the email we sent to compare with the same code
   * that the user receives in his/her inbox, finally we chage the UI in order to catch
   * the code verification
   * 
   * if an email is used for testing we set a temporal user in redux,
   * user internally for test the app,
   *
   * @memberof LoginScreen
   */
  onLogin = async () => {
    let { email } = this.state
    let warnings = []
      , emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (emailRegex.exec(email) === null) warnings.push({ title: i18n.t('invalid_email', loginScope), type: 0 })

    if (warnings.length !== 0) {
      if (warnings[0].type === 0) Alert.alert('Error', warnings[0].title)
      return
    }

    let data = new FormData()
    data.append('email', email)

    console.log('fetch', await fetch('https://rbeats.alucinastudio.com/access', {
      method: 'POST',
      body: {
        formData: data
      },

    }))

    fetch('https://rbeats.alucinastudio.com/access', {
      method: 'POST',
      body: {
        formData: data
      },
      sslPinning: {
        certs: ["rbeats_cert"]
      },
    })
      .then(res => res.json())
      .then(async (res) => {
        console.log('res', res)
        if (res.message === 'Apple testing') {
          this.setState({ isTesting: true, message: 'loading_testing' }, () => {
            setTimeout(async () => {
              this.props.dispatch(setUser({ email: 'testing@rbeats.com', username: 'Testing', countryCode: 'MX' }))
              await AsyncStorage.setItem('app_user', JSON.stringify({ email: 'testing@rbeats.com', username: 'Testing', countryCode: 'MX' }))
              this.props.navigation.navigate('AppStack')
            }, 2000)
          })
        } else {
          await AsyncStorage.setItem('app_tempData', JSON.stringify({ email, code: res.message }))
          this.setState({ isCodeSent: true, message: 'code_sent', validData: { email, code: res.message }, })
        }
      })
      .catch(err => {
        this.setState({ cancelled: true })
        console.log('err', err)
      })
  }


  /**
   * Listen an handles the input code verification
   * if code verification match with the store in the app
   * we ask for user information
   *
   * @memberof LoginScreen
   */
  onTextCodeChange = code => {
    let cleanCode = code.trim()
    if (cleanCode.length <= 8) this.setState({ code: cleanCode })
    if (cleanCode.length === 8) {
      if (cleanCode === this.state.validData.code) {
        this.setState({ isAuthFlow: true, message: 'loading_user' })
        let data = new FormData()
        data.append('email', this.state.validData.email)
        data.append('token', this.state.validData.code)
        fetch('https://rbeats.alucinastudio.com/userData', {
          method: 'POST',
          body: {
            formData: data
          },
          sslPinning: {
            certs: ["rbeats_cert"]
          },
        })
          .then(res => res.json())
          .then(async (res) => {
            if (res.name) {
              await AsyncStorage.removeItem('app_tempData')
              await AsyncStorage.setItem('app_user', JSON.stringify({ email: res.email, username: res.name, countryCode: res.countryCode }))
              await AsyncStorage.setItem('app_settings', JSON.stringify({ ...this.props.app, lang: getLanguageByCountryCode(res.countryCode) }))
              i18n.locale = getLanguageByCountryCode(res.countryCode)
              this.props.dispatch(setUser({ email: res.email, username: res.name, countryCode: res.countryCode }))
              if (this.props.app.showIntro)
                this.props.navigation.navigate('IntroApp')
              else
                this.props.navigation.navigate('AppStack')
            }
          })
          .catch(err => console.log(err))
      }
      else this.setState({ isInvalidCode: true, message: 'invalid_authCode', code: '' })
    }
  }


  /**
   * resets the flow auth to the first step
   *
   * @memberof LoginScreen
   */
  onSendEmail = () => {
    this.setState({ isCodeSent: false, email: this.state.validData.email })
  }

  async componentDidMount() {
    let code = await AsyncStorage.getItem('@app:tempData')
    if (code) {
      this.setState({ validData: JSON.parse(code), isCodeSent: true, message: 'code_sent', })
    }
  }

  render() {
    const { message, isAuthFlow, isTesting, isInvalidCode, isCodeSent } = this.state
    const { navigate } = this.props.navigation

    if (isAuthFlow || isTesting) return <LoadingHeart text={i18n.t(message, appScope)} />

    return <ImageBackground source={this.props.app.theme === 'light' ? backgroundWhite : backgroundDark} style={styles.container} resizeMode='cover' >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <View style={[styles.section]}>
            <TouchableOpacity style={{ position: 'absolute', left: 10, top: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.goBack()} >
              <Image source={backBtn} style={{ height: 30, width: 30 }} />
              <Text style={[styles.text, { color: '#d15a96', fontFamily: 'OpenSans-Regular', }]}>{i18n.t('go_back', loginScope)}</Text>
            </TouchableOpacity>
            <Image source={rbLogo} style={styles.logo} resizeMode='contain' />
          </View>
          <View style={[styles.form]}>
            {
              !isCodeSent
                ? <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                  <TextInput
                    placeholder={i18n.t('email', inputsScope)}
                    style={styles.textInput}
                    onChangeText={email => this.setState({ email })}
                    onSubmitEditing={this.onLogin}
                    keyboardType='email-address'
                    autoCapitalize='none'
                    value={this.state.email}
                    onSelectionChange={() => { console.log('selected', Clipboard.getString()); Clipboard.setString(''); }}
                  />
                  {
                    this.state.cancelled
                      ? <Text style={[styles.text, { marginBottom: 15 }]}>{i18n.t('auth_flow_cancelled', loginScope)}</Text>
                      : null
                  }
                  <TouchableOpacity onPress={this.onLogin} style={[styles.button, { backgroundColor: '#F4DC60', }]}>
                    <Text style={[styles.text, { color: 'white' }]}>{i18n.t('send', inputsScope)}</Text>
                  </TouchableOpacity>
                </View>
                : <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                  {
                    this.state.message
                      ? <Text style={[styles.text, { marginBottom: 15 }]}>{i18n.t(message, appScope)}</Text>
                      : null
                  }
                  <TextInput
                    placeholder={i18n.t('code', inputsScope)}
                    style={styles.textInput}
                    onChangeText={this.onTextCodeChange}
                    onSubmitEditing={this.onLogin}
                    keyboardType='email-address'
                    autoCapitalize='none'
                    value={this.state.code}
                    onSelectionChange={() => { Clipboard.setString(''); console.log('selected', Clipboard.getString()); }}
                  />
                  <TouchableOpacity onPress={this.onSendEmail} style={[styles.button, { backgroundColor: '#F4DC60', }]}>
                    <Text style={[styles.text, { color: 'white' }]}>{i18n.t('resend', inputsScope)}</Text>
                  </TouchableOpacity>
                </View>
            }
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  }
}

const mapStateToProps = state => ({
  app: state.app,
})

export default connect(mapStateToProps)(LoginScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: '15%',
  },
  form: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 40,
    paddingVertical: 20,
    paddingHorizontal: '15%',
  },
  logo: {
    height: '70%'
  },
  text: {
    color: '#AAA',
    fontFamily: 'OpenSans-Bold',
    textAlign: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 15,
    marginBottom: 10
  },
  textInput: {
    backgroundColor: '#f3f2f7',
    borderRadius: 20,
    fontFamily: 'OpenSans-Regular',
    padding: height > 650 ? 10 : 5,
    paddingHorizontal: 10,
    marginBottom: 30
  }
})