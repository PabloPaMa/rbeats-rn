import React from 'react'
import { AsyncStorage, Dimensions, StyleSheet, View, Text, Image, ImageBackground } from 'react-native'
import AppIntroSlider from '../baseComponents/IntroSlider'
import i18n from '../i18n'
//import { DangerZone } from 'expo'
//const { Lottie } = DangerZone
import Lottie from 'lottie-react-native'
import { connect } from 'react-redux'
import { setShowIntro } from '../redux/actions/appState'
import AnimatedHeart from '../baseComponents/AnimatedHeart'

import find_out from '../assets/lottie/find_out.json'
import chat from '../assets/lottie/chat.json'
import check from '../assets/lottie/check.json'
import SOS from '../assets/lottie/sos.json'

import rbLogo from '../assets/images/logo/rb_logo.png'
import rbNameLogo from '../assets/images/logo/rb_name.png'
import backgroundWhite from '../assets/images/main/bg_white.jpg'
import backgroundDark from '../assets/images/main/bg_dark.jpg'

const introScope = { scope: "intro" }

const slides = [
  {
    key: 'intro 1',
    title: i18n.t('title_1', introScope),
    text: i18n.t('content_1', introScope),
    colors: ['#F4DC60', '#D15A96'],
    animation: rbLogo,
    main: true,
  },
  {
    key: 'intro 2',
    title: i18n.t('title_2', introScope),
    text: i18n.t('content_2', introScope),
    colors: ['#D15A96', '#F4DC60'],
    animation: chat,
    main: false,
  },
  {
    key: 'intro 3',
    title: i18n.t('title_3', introScope),
    text: i18n.t('content_3', introScope),
    colors: ['#F4DC60', '#D15A96'],
    animation: find_out,
    main: false,
  },
  {
    key: 'intro 4',
    title: i18n.t('title_4', introScope),
    text: i18n.t('content_4', introScope),
    colors: ['#F4DC60', '#D15A96'],
    animation: check,
    main: false,
  },
  {
    key: 'intro 5',
    title: i18n.t('title_5', introScope),
    text: i18n.t('content_5', introScope),
    colors: ['#F4DC60', '#D15A96'],
    animation: SOS,
    main: false,
  },
]

const { width } = Dimensions.get('screen')

class LottieAnimation extends React.Component {

  componentWillReceiveProps() {
    this.animation.reset()
    this.animation.play()
  }

  render() {
    return <Lottie
      ref={animation => {
        this.animation = animation;
      }}
      style={{
        alignSelf: 'center',
        height: width - 60,
        width: width - 60,
        marginBottom: 20,
      }}
      source={this.props.lottieAsset}
    />
  }
}

/**
 * App intro screen component
 *
 * @class AppIntro
 * @extends {React.Component}
 */
class AppIntro extends React.Component {

  state = {
    changes: 0,
  }

  /**
   * skip the intro app, an go to the app stack
   *
   * @memberof AppIntro
   */
  onSkip = async () => {
    this.props.dispatch(setShowIntro(false))
    await AsyncStorage.setItem('app_settings', JSON.stringify({
      ...this.props.app,
      showIntro: false
    }))
    this.props.navigation.navigate('AppStack')
  }


  /**
   * render an slide screen
   *
   * @memberof AppIntro
   */
  _renderItem = props => {
    return <ImageBackground source={this.props.app.theme === 'light' ? backgroundWhite : backgroundDark} style={styles.container} resizeMode='cover'>
      <View style={{ marginVertical: '20%', marginHorizontal: '10%', flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ color: '#abaaaf', fontFamily: 'OpenSans-Bold', fontSize: 35, textAlign: 'center' }}>{props.title}</Text>
        {
          props.main
            ? <View style={{ width: 200, height: 200, }}>
              <View style={{ width: 100, height: 100, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', }}>
                <AnimatedHeart height={90} width={90} />
              </View>
              <Image source={rbNameLogo} style={{ width: 200, height: 100 }} resizeMode='contain' />
            </View>
            : <View style={{ width: Math.floor(width - 80), height: Math.floor(width - 80), alignItems: 'center', justifyContent: 'center', alignSelf: 'center', }}>
              <LottieAnimation changes={this.state.changes} lottieAsset={props.animation} />
            </View>
        }
        <Text style={{ color: '#abaaaf', fontFamily: 'OpenSans-Regular', fontSize: 20, textAlign: 'center', }}>{props.text}</Text>
      </View>
    </ImageBackground >

  }

  render() {
    return <AppIntroSlider
      buttonTextStyle={{ color: '#abaaaf' }}
      activeDotStyle={{ backgroundColor: '#f4dc60' }}
      skipLabel={i18n.t('skipLabel', introScope)}
      doneLabel={i18n.t('doneLabel', introScope)}
      nextLabel={i18n.t('nextLabel', introScope)}
      prevLabel={i18n.t('prevLabel', introScope)}
      slides={slides}
      renderItem={this._renderItem}
      showPrevButton
      showSkipButton
      onSlideChange={() => { this.setState(prevState => ({ changes: prevState + 1 })) }}
      onDone={this.onSkip}
      onSkip={this.onSkip}
    />
  }
}

const mapStateToProps = state => ({
  app: state.app
})

export default connect(mapStateToProps)(AppIntro)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    width: 320,
    height: 320,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  },
})
