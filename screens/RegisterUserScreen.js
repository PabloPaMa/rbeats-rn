import React from 'react'
import { Alert, Image, Dimensions, ImageBackground, Keyboard, KeyboardAvoidingView, Linking, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import PickerSelect from 'react-native-picker-select'
import i18n from '../i18n'

import LoadingHeart from '../baseComponents/LoadingHeart'
import AnimatedHeart from '../baseComponents/AnimatedHeart'
import ErrorMessage from '../baseComponents/ErrorMessage'

import { getFormValues } from '../services/form'

import backgroundWhite from '../assets/images/main/bg_white.jpg'
import backgroundDark from '../assets/images/main/bg_dark.jpg'
import rbLogo from '../assets/images/logo/rb_logo.png'

const { height, width } = Dimensions.get('window')
const loginScope = { scope: "login" }
const inputsScope = { scope: "inputs" }
const appScope = { scope: "app" }


/**
 * Register user screen component
 * not used due to flow changes
 *
 * @class RegisterUserScreen
 * @extends {React.Component}
 */
class RegisterUserScreen extends React.Component {

  state = {
    email: '',
    confirmPassword: '',
    country: '',
    countries: [],
    job: '',
    jobs: [],
    loading: true,
    password: '',
    formWarnings: [],
    error: '',
    isKeyboard: false
  }

  openLink = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) Linking.openURL(url)
      else console.log("Don't know how to open URI: " + this.props.url)
    })
  }

  registerUser = () => {
    let { email, confirmPassword, country, job, password } = this.state
    let warnings = []
      , emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      , emailDomainRegex = /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(alucinastudio|rb)\.com$/

    if (
      email.trim() === '' ||
      confirmPassword.trim() === '' ||
      country.trim() === '' ||
      job.trim() === '' ||
      password.trim() === ''
    ) {
      warnings.push({ title: i18n.t('incomplete_form', loginScope), type: 0 })
    }
    if (emailRegex.exec(email) === null) {
      warnings.push({ title: i18n.t('invalid_email', loginScope), type: 0 })
    }
    if (emailDomainRegex.exec(email) === null) {
      warnings.push({ title: i18n.t('no_a_rb_email', loginScope), type: 1 })
    }
    if (password !== confirmPassword) {
      warnings.push({ title: i18n.t('passwords_do_not_match', loginScope), type: 0 })
    }

    if (warnings.length !== 0) {
      if (warnings[0].type === 0) Alert.alert('Error', warnings[0].title)
      if (warnings[0].type === 1) Alert.alert(
        'Advertecia',
        warnings[0].title,
        [
          { text: 'Ir al sitio', onPress: () => this.openLink('https://www.rb.com/'), style: 'cancel' },
          { text: 'Aceptar', onPress: () => { } },
        ],
        { cancelable: false }
      )
    }
  }

  keyboardDidShow = () => { this.setState({ isKeyboard: true }) }

  keyboardDidHide = () => { this.setState({ isKeyboard: false }) }

  componentDidMount() {
    getFormValues()
      .then(res => {
        this.setState({ countries: res.countries, jobs: res.jobs, loading: false })
        this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
        this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
      })
      .catch(err => { this.setState({ error: err.message, loading: false }) })
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove()
    this.keyboardDidHideSub.remove()
  }

  render() {
    if (this.state.loading) return <LoadingHeart text={i18n.t('wait_a_moment', appScope)} />
    return this.state.error
      ? <ErrorMessage message={this.state.error} />
      : <React.Fragment>
        <KeyboardAvoidingView style={styles.container}>
          <ImageBackground source={this.props.app.theme === 'light' ? backgroundWhite : backgroundDark} style={styles.container} resizeMode='cover' >
            <View style={styles.section}>
              {
                this.state.isKeyboard
                  ? <AnimatedHeart height={height > 650 ? 100 : 80} width={height > 650 ? 100 : 80} />
                  : <Image source={rbLogo} style={styles.logo} resizeMode='contain' />
              }
            </View>
            <View style={[styles.form,]}>
              <View style={{ flex: 1, justifyContent: 'center', }}>
                <TextInput
                  autoCapitalize='none'
                  keyboardType='email-address'
                  onChangeText={email => this.setState({ email })}
                  onSubmitEditing={() => this._password.focus()}
                  placeholder={i18n.t('email', inputsScope)}
                  placeholderTextColor='#979797'
                  style={styles.textInput}
                  value={this.state.name}
                />
                <TextInput
                  autoCapitalize='none'
                  onChangeText={password => this.setState({ password })}
                  onSubmitEditing={() => this._confirmPassword.focus()}
                  placeholder={i18n.t('password', inputsScope)}
                  placeholderTextColor='#979797'
                  ref={password => this._password = password}
                  secureTextEntry
                  style={styles.textInput}
                  value={this.state.password}
                />
                <TextInput
                  autoCapitalize='none'
                  onChangeText={confirmPassword => this.setState({ confirmPassword })}
                  onSubmitEditing={() => this._confirmPassword.focus()}
                  placeholder={i18n.t('confirm_password', inputsScope)}
                  placeholderTextColor='#979797'
                  ref={confirmPassword => this._confirmPassword = confirmPassword}
                  secureTextEntry
                  style={styles.textInput}
                  value={this.state.confirmPassword}
                />
                <PickerSelect
                  placeholderTextColor='#979797'
                  placeholder={{ label: i18n.t('country', inputsScope), value: '', }}
                  items={this.state.countries}
                  onValueChange={country => { this.setState({ country }) }}
                  style={pickerStyles}
                  value={this.state.country}
                  hideIcon={false}
                />
                <PickerSelect
                  placeholderTextColor='#979797'
                  placeholder={{ label: i18n.t('job', inputsScope), value: '', }}
                  items={this.state.jobs}
                  onValueChange={job => { this.setState({ job }) }}
                  style={pickerStyles}
                  value={this.state.job}
                  hideIcon={false}
                />

              </View>
              {
                !this.state.isKeyboard
                  ? <View>
                    <TouchableOpacity onPress={this.registerUser} style={[styles.button, { backgroundColor: '#F4DC60', }]}>
                      <Text style={[styles.text, { color: 'white' }]}>{i18n.t('create', loginScope)}</Text>
                    </TouchableOpacity>
                    <Text
                      onPress={() => { this.props.navigation.goBack() }}
                      style={[styles.text, { color: '#F4DC67', fontFamily: 'OpenSans-Regular', }]}
                    >{i18n.t('go_back', loginScope)}</Text>
                  </View>
                  : null
              }
            </View>
          </ImageBackground>
        </KeyboardAvoidingView>
        {
          this.state.isKeyboard
            ? <TouchableOpacity onPress={this.registerUser} style={styles.keyboardButton}>
              <Text style={[styles.text, { color: 'white' }]}>{i18n.t('create', loginScope)}</Text>
            </TouchableOpacity>
            : null
        }
        {
          this.state.isKeyboard
            ? <Text
              onPress={() => { this.props.navigation.goBack() }}
              style={[
                styles.text,
                { color: '#F4DC67', fontFamily: 'OpenSans-Regular', position: 'absolute', top: 20, left: 20 }
              ]}
            >{i18n.t('go_back', loginScope)}</Text>
            : null
        }
      </React.Fragment>
  }
}

const mapStateToProps = state => ({
  app: state.app,
})

export default connect(mapStateToProps)(RegisterUserScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  form: {
    flex: 2,
    justifyContent: 'space-between',
    paddingBottom: height > 650 ? 20 : 10,
    paddingHorizontal: '15%',
    paddingVertical: 20,

  },
  logo: {
    height: height > 650 ? 200 : 150,
    width: height > 650 ? 200 : 150
  },
  text: {
    color: '#AAA',
    fontFamily: 'OpenSans-Bold',
    textAlign: 'center'
  },
  button: {
    borderRadius: 20,
    padding: height > 650 ? 15 : 10,
    marginBottom: 10
  },
  keyboardButton: {
    backgroundColor: '#F4DC60',
    borderRadius: 20,
    padding: height > 650 ? 15 : 10,
    position: 'absolute',
    top: 10,
    right: 10
  },
  textInput: {
    backgroundColor: '#f3f2f7',
    borderRadius: 20,
    fontFamily: 'OpenSans-Regular',
    fontSize: 15,
    height: 40,
    padding: height > 650 ? 10 : 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  }
})

const pickerStyles = StyleSheet.create({
  viewContainer: {
    backgroundColor: '#f3f2f7',
    borderRadius: 20,
    fontSize: 15,
    height: 40,
    justifyContent: 'center',
    marginBottom: 10,
    paddingLeft: 6,
    overflow: 'hidden',
  },
  inputIOS: {
    borderRadius: 10,
    fontFamily: 'OpenSans-Bold',
    fontSize: 15,
    height: 40,
    paddingLeft: 6,
  },
  icon: {
    marginTop: -4,
  }
})