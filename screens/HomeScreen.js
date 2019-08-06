import React from 'react'
import {
  Animated,
  Alert,
  AsyncStorage,
  FlatList,
  Dimensions,
  Easing,
  Image,
  ImageBackground,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  CameraRoll,
  Modal,
  Platform
} from 'react-native'
// import { ImagePicker, Permissions } from 'expo'
import { connect } from 'react-redux'
import i18n from '../i18n'


import backgroundWhite from '../assets/images/main/bg_white.jpg'
import backgroundDark from '../assets/images/main/bg_dark.jpg'
import rbLogo from '../assets/images/logo/rb_logo.png'
import chatLogo from '../assets/images/icons/icon_chat.png'
import mediaLogo from '../assets/images/icons/icon_media.png'
import consultaLogo from '../assets/images/icons/icon_consulta.png'
import SOSLogo from '../assets/images/icons/icon_sos.png'
import speakupLogo from '../assets/images/icons/icon_speakup.png'
import settingsLogo from '../assets/images/icons/Settings.png'
import logoutLogo from '../assets/images/icons/logout.png'
import backBtn from '../assets/images/icons/back_btn.png'

import profileMask from '../assets/images/profile/profile_mask.png'
import profileMaskFlare from '../assets/images/profile/profile_mask_flare.png'
import fakeUser from '../assets/images/profile/no_image.jpg'

import { resetAppState } from '../redux/actions/appState'
import { resetUserState } from '../redux/actions/user'

const { height, width } = Dimensions.get('window')
const sectionScope = { scope: "sections" }
const appScope = { scope: "app" }


/**
 * Home screen component
 *
 * @class HomeScreen
 * @extends {React.Component}
 */
class HomeScreen extends React.Component {

  state = {
    profilePic: '',
    pressed: '',
    photos: [],
    modalVisible: false,
  }

  /**
   * opens the user gallery to select one as profile pic
   *
   * @memberof HomeScreen
   */
  _pickImage = async () => {
    if (Platform.OS === 'ios') this._loadPhotos()
    else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            'title': 'Rbeats',
            'message': 'Necesita acceso a las fotos'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this._loadPhotos()
        } else {
          console.log("Camera permission denied", granted)
        }

      } catch (err) { console.log("Error", err) }
    }
  }

  /**
   * opens the user gallery to select one as profile pic
   *
   * @memberof HomeScreen
   */
  _loadPhotos = async () => {
    const photos = await CameraRoll.getPhotos({ first: 1000, assetType: 'Photos', })
    if (photos.edges.length) {
      console.log(photos.edges)
      this.setState({ photos: photos.edges, modalVisible: true })
    } else {
      Alert.alert(i18n.t('empty_gallery', appScope))
    }
  }

  setProfilePic = async (photo) => {
    await AsyncStorage.setItem('app_user', JSON.stringify({ ...this.props.user, profilePic: photo }))
    this.setState({ profilePic: photo, modalVisible: false, photos: [] })
  }

  /**
   * launch a url out of the app
   *
   * @memberof HomeScreen
   */
  onSpeakOut = () => {
    Linking.canOpenURL('https://secure.ethicspoint.eu/domain/media/en/gui/102030/index.html').then(supported => {
      if (supported) Linking.openURL('https://secure.ethicspoint.eu/domain/media/en/gui/102030/index.html')
      else Alert.alert('Error', 'No se pudo ejecutar esta acción')
    })
  }

  _onHideUnderlay = () => { this.setState({ pressed: '' }) }

  _onShowUnderlay = pressed => { this.setState({ pressed }) }


  /**
   * Handles the logout flow
   *
   * @memberof HomeScreen
   */
  _onLogout = async () => {
    await AsyncStorage.removeItem('app_user')
    await AsyncStorage.removeItem('app_settings')
    this.props.dispatch(resetAppState())
    this.props.dispatch(resetUserState())
    this.props.navigation.navigate('Initial')
  }

  spinValue = new Animated.Value(0)
  spinValue2 = new Animated.Value(0)
  opacityValue = new Animated.Value(0)


  spin = this.spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  spin2 = this.spinValue2.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg']
  })

  opacity = this.opacityValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0]
  })

  async componentDidMount() {
    Animated.parallel([
      Animated.loop(Animated.timing(
        this.spinValue,
        {
          toValue: 1,
          duration: 8000,
          easing: Easing.linear,
          useNativeDriver: true
        }
      )),
      Animated.loop(Animated.timing(
        this.spinValue2,
        {
          toValue: 1,
          duration: 8000,
          easing: Easing.linear,
          useNativeDriver: true
        }
      )),
      Animated.loop(Animated.timing(
        this.opacityValue,
        {
          toValue: 1,
          duration: 8000,
          easing: Easing.linear,
          useNativeDriver: true
        }
      ))
    ]).start()

    try {
      const user = await AsyncStorage.getItem('app_user')
      if (user !== null) {
        let userInfo = JSON.parse(user)
        this.setState({ profilePic: userInfo.profilePic })
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { navigate } = this.props.navigation
    const { pressed, profilePic } = this.state

    return <ImageBackground source={this.props.app.theme === 'light' ? backgroundWhite : backgroundDark} style={styles.container} resizeMode='cover' >
      <SafeAreaView style={{ flex: 1 }}>
        {
          !this.props.app.isOnline
            ? <Text style={styles.offlineMessage}>{i18n.t('offline_message', appScope)}</Text>
            : null
        }
        <SafeAreaView style={[styles.section]}>
          {
            __DEV__
              ? <TouchableHighlight onPress={() => navigate('Settings')} style={[styles.settings, { left: 0, }]} underlayColor='transparent'>
                <Image source={settingsLogo} style={styles.settingsIcon} resizeMode='contain' />
              </TouchableHighlight>
              : null
          }
          <TouchableHighlight onPress={this._onLogout} style={[styles.settings, { height: 40, width: 40, right: 0, backgroundColor: '#f4dc60', borderRadius: 50, padding: 10 }]} underlayColor='transparent'>
            <Image source={logoutLogo} style={{ width: 30, height: 30 }} resizeMode='contain' />
          </TouchableHighlight>
          <View style={[styles.section]}>
            <Image source={rbLogo} style={styles.logo} resizeMode='contain' />
          </View>
        </SafeAreaView>

        <View style={[styles.form]}>
          <View style={{ flex: 2, alignContent: 'center', justifyContent: 'center', overflow: 'hidden', }}>
            <TouchableHighlight underlayColor='transparent' onPress={this._pickImage} style={{ alignSelf: 'center', alignContent: 'center', justifyContent: 'center', width: 150 }}>
              <React.Fragment>
                <View style={styles.profilePic}>
                  <Image source={profilePic ? { uri: profilePic } : fakeUser} style={styles.profilePic} resizeMode='cover' />
                </View>
                <Animated.Image source={profileMask} style={[styles.profileMask, { transform: [{ rotate: this.spin }] }]} resizeMode='contain' />
                <Animated.Image source={profileMaskFlare} style={[styles.profileMaskFlare, { opacity: this.opacity, transform: [{ rotate: this.spin2 }] }]} resizeMode='contain' />
              </React.Fragment>
            </TouchableHighlight>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <TouchableHighlight
              onHideUnderlay={this._onHideUnderlay}
              onShowUnderlay={() => this._onShowUnderlay('chat')}
              underlayColor='transparent'
              onPress={() => navigate('Chat')}
              style={{ flex: 1 }}>
              <View style={styles.menuOption}>
                <View style={[styles.IconContainer, pressed === 'chat' ? { backgroundColor: '#d15a96' } : {}]}>
                  <Image source={chatLogo} style={styles.iconMenu} resizeMode='contain' />
                </View>
                <Text style={styles.menuText}>{i18n.t('chat', sectionScope)}</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onHideUnderlay={this._onHideUnderlay}
              onShowUnderlay={() => this._onShowUnderlay('media')}
              underlayColor='transparent'
              onPress={() => navigate('MediaGrid')}
              style={{ flex: 1 }}>
              <View style={styles.menuOption}>
                <View style={[styles.IconContainer, pressed === 'media' ? { backgroundColor: '#d15a96' } : {}]}>
                  <Image source={mediaLogo} style={styles.iconMenu} resizeMode='contain' />
                </View>
                <Text style={styles.menuText}>{i18n.t('info', sectionScope)}</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onHideUnderlay={this._onHideUnderlay}
              onShowUnderlay={() => this._onShowUnderlay('consulta')}
              underlayColor='transparent'
              onPress={() => navigate('Consulta')}
              style={{ flex: 1 }}>
              <View style={styles.menuOption}>
                <View style={[styles.IconContainer, pressed === 'consulta' ? { backgroundColor: '#d15a96' } : {}]}>
                  <Image source={consultaLogo} style={styles.iconMenu} resizeMode='contain' />
                </View>
                <Text style={styles.menuText}>{i18n.t('guide', sectionScope)}</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onHideUnderlay={this._onHideUnderlay}
              onShowUnderlay={() => this._onShowUnderlay('sos')}
              underlayColor='transparent'
              onPress={() => navigate('SOS')}
              style={{ flex: 1 }}>
              <View style={styles.menuOption}>
                <View style={[styles.IconContainer, pressed === 'sos' ? { backgroundColor: '#d15a96' } : {}]}>
                  <Image source={SOSLogo} style={styles.iconMenu} resizeMode='contain' />
                </View>
                <Text style={styles.menuText}>SOS</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onHideUnderlay={this._onHideUnderlay}
              onShowUnderlay={() => this._onShowUnderlay('speak')}
              underlayColor='transparent'
              onPress={this.onSpeakOut}
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View style={styles.menuOption}>
                <View style={[styles.IconContainer, pressed === 'speak' ? { backgroundColor: '#d15a96' } : {}]}>
                  <Image source={speakupLogo} style={styles.iconMenu} resizeMode='contain' />
                </View>
                <Text style={styles.menuText}>Speak up</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { this.setState({ modalVisible: false }) }}>
          <View style={{ marginTop: 22 }}>
            <SafeAreaView style={[styles.header, { backgroundColor: this.props.app.theme === 'light' ? '#f2f2f2' : '#222', }]}>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => { this.setState({ modalVisible: false }) }} >
                <Image source={backBtn} style={{ height: 30, width: 30 }} />
                <Text
                  style={styles.headerText}>{i18n.t('go_back', appScope)}</Text>
              </TouchableOpacity>
            </SafeAreaView>
            <View>
              <FlatList
                numColumns={3}
                data={this.state.photos}
                renderItem={({ item }) => <TouchableOpacity onPress={() => this.setProfilePic(item.node.image.uri)} style={{ flex: 1, margin: 5, }}>
                  <Image source={{ uri: item.node.image.uri }} style={{ width: width / 3 - 10, height: width / 3 - 10 }} />
                </TouchableOpacity>}
              />

            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  }
}

const mapStateToProps = state => ({
  app: state.app,
  user: state.user
})

export default connect(mapStateToProps)(HomeScreen)

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 60 : 50,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    maxWidth: '100%'
  },
  headerText: {
    color: '#9f9fa3',
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
  },
  settings: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 20,
    zIndex: 2,
  },
  settingsIcon: {
    height: 40,
    width: 40,
  },
  container: {
    flex: 1,
  },
  section: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  form: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  logo: {
    height: '70%'
  },
  text: {
    color: '#AAA',
    textAlign: 'center'
  },
  button: {
    borderRadius: 20,
    padding: 15,
    marginBottom: 10
  },
  menuOption: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  menuText: {
    color: '#9f9fa3',
    fontFamily: 'OpenSans-Bold',
    fontSize: 12
  },
  IconContainer: {
    alignItems: 'center',
    backgroundColor: '#F4DC60',
    borderRadius: 100,
    height: (width - 100) / 5,
    justifyContent: 'center',
    width: (width - 100) / 5
  },
  iconMenu: {
    width: 30,
  },
  profileMask: {
    alignItems: 'center',
    alignSelf: 'center',
    height: height > 700 ? 200 : 190,
    width: height > 700 ? 200 : 190,
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 2,
  },
  profileMaskFlare: {
    alignItems: 'center',
    alignSelf: 'center',
    height: height > 700 ? 210 : 200,
    width: height > 700 ? 210 : 200,
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 2,
  },
  profilePic: {
    alignSelf: 'center',
    borderRadius: height > 700 ? 70 : 60,
    height: height > 700 ? 140 : 120,
    marginTop: -5,
    overflow: 'hidden',
    width: height > 700 ? 140 : 120,
    zIndex: -3
  },
  offlineMessage: {
    backgroundColor: '#d15a96',
    color: '#f4dc60',
    fontFamily: 'OpenSans-Bold',
    fontSize: 15,
    textAlign: 'center'
  }
})