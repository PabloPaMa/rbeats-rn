import React from 'react'
import { Image, ImageBackground, Linking, Platform, StyleSheet, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import i18n from '../i18n'
import AnimatedHeart from '../baseComponents/AnimatedHeart'
import LoadigHeart from '../baseComponents/LoadingHeart'
import { WebView } from 'react-native-webview'
import backgroundWhite from '../assets/images/main/bg_white.jpg'
import backgroundDark from '../assets/images/main/bg_dark.jpg'
import backBtn from '../assets/images/icons/back_btn.png'

const appScope = { scope: "app" }
const loginScope = { scope: "login" }


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
 * @param {*} this.props
 * @returns
 */
class AboutRBScreen extends React.Component {

  state = {
    loading: true,
    canGoBack: false
  }

  render() {
    let site = this.props.navigation.getParam('page', 'none')
      , title = this.props.navigation.getParam('title', 'RBeats')

    let urls = {
      'about': {
        'es': 'https://www.rb.com/about-us/who-we-are/',
        'en': 'http://www.rb.com/us/about-us/',
        'pt': 'https://www.rb.com/br/sobre-nos/'
      },
      'brand': {
        'es': 'https://www.rb.com/brands/',
        'en': 'http://www.rb.com/us/brands/',
        'pt': 'https://www.rb.com/br/marcas/'
      },
      'inn': {
        'es': 'https://www.rb.com/innovation/',
        'en': 'http://www.rb.com/us/innovation/',
        'pt': 'https://www.rb.com/br/inovacao/'
      },
      'resp': {
        'es': 'https://www.rb.com/responsibility/',
        'en': 'http://www.rb.com/us/responsibility/',
        'pt': 'https://www.rb.com/br/responsabilidade/'
      },
      'contact': {
        'es': 'https://www.rb.com/about-us/contact-us/',
        'en': 'http://www.rb.com/us/about-us/contact',
        'pt': 'https://www.rb.com/br/sobre-nos/contato/'
      },
      'join': {
        'es': 'https://www.rb.com/careers/',
        'en': 'http://www.rb.com/us/careers/',
        'pt': 'https://www.rb.com/br/carreiras/'
      }
    }
    let siteUrl = urls[site][this.props.app.lang]

    return <View style={styles.container}>
      <SafeAreaView style={[styles.header, { backgroundColor: this.props.app.theme === 'light' ? '#f2f2f2' : '#222', }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => {
            if (this.state.canGoBack) { this.webview.goBack() }
            else { this.props.navigation.goBack() }
          }} >
            <Image source={backBtn} style={{ height: 30, width: 30 }} />
          </TouchableOpacity>
          <Text
            onPress={() => { if (this.props.backButton) this.props.navigation.goBack() }}
            style={styles.headerText}>{title}</Text>
        </View>
        <View style={{ marginRight: Platform.OS === 'ios' ? 20 : 0 }}>
          <AnimatedHeart {...size} />
        </View>
      </SafeAreaView>
      <ImageBackground source={this.props.app.theme === 'light' ? backgroundWhite : backgroundDark} style={styles.container} resizeMode='cover'>
        <View style={{ flex: 1, overflow: 'hidden' }}>
          <WebView
            useWebKit={true}
            onLoad={() => { setTimeout(() => { this.setState({ loading: false }) }, 500) }}
            ref={ref => this.webview = ref}
            source={{ uri: siteUrl }}
            injectedJavaScript={`
              function hideHead(){ 
                setTimeout(function(){ 
                  var footers = document.getElementsByTagName("FOOTER")
                  document.getElementsByTagName("NAV")[0].style.display = "none"; 
                  for (var i = 0; i < footers.length; i++) footers[i].style.display = "none";
                  document.getElementsByClassName("breadcrumb")[0].style.display = "none"; 
                  var data = Array.from(document.getElementsByClassName('copy copy--white'))

                  data.map(node => {
                    var classNode = null
                    for (var i = 0; i < node.childNodes.length; i++) {
                      if (node.childNodes[i].className === "wrapper") {
                        classNode = node.childNodes[i];
                        break;
                      }        
                    }
                    return classNode
                  })
                  .forEach(function(node) {
                    var nodes = Array.from(node.childNodes)
                    nodes = nodes.filter(node => node.nodeName === 'SCRIPT')
                    var isEvil = nodes.length !== 0
                    if (isEvil) node.parentNode.removeChild(node)
                  })
                }, 0)
              };
              hideHead();
            `}
            onNavigationStateChange={(event) => {
              this.setState({ canGoBack: event.canGoBack })
              if (event.url.search('www.rb.com/') === -1) {
                this.webview.stopLoading();
                Linking.openURL(event.url);
              }
              if (event.url.search('.pdf') !== -1) {
                this.webview.stopLoading();
                Linking.openURL(event.url);
              }
            }}
          />
          {
            this.state.loading
              ? <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <LoadigHeart />
              </View>
              : null
          }
        </View>
        {
          !this.props.app.isOnline
            ? <Text style={styles.offlineMessage}>{i18n.t('offline_message', appScope)}</Text>
            : null
        }
      </ImageBackground>

    </View>

  }
}


const mapStateToProps = state => ({
  app: state.app,
  user: state.user
})

export default withNavigation(connect(mapStateToProps)(AboutRBScreen))

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
