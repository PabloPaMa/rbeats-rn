import React from 'react'
import { View } from 'react-native'
import i18n from '../i18n'
import { WebView } from 'react-native-webview'
import Layout from '../baseComponents/Layout'
import LoadingHeart from '../baseComponents/LoadingHeart'

const sectionScope = { scope: "sections" }

/**
 * Browser in app component
 * Not used in the app :(
 *
 * @export
 * @class BrowserScreen
 * @extends {React.Component}
 */
export default class BrowserScreen extends React.Component {

  state = {
    showVisor: false
  }

  componentDidMount() {
    this.setState({
      showVisor: true
    })
  }

  render() {
    const url = this.props.navigation.getParam('url', null)

    return <Layout backButton sectionName={i18n.t('guide', sectionScope)}>
      <View style={{ flex: 1, overflow: 'hidden' }}>
        {
          this.state.showVisor
            ? <WebView
              useWebKit={true}
              renderLoading={() => <LoadingHeart />}
              source={{ uri: url }}
            />
            : null
        }
      </View>
    </Layout>
  }
}