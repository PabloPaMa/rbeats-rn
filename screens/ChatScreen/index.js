import React from 'react'
import { View, WebView } from 'react-native'
import Layout from '../../baseComponents/Layout'
import LoadingHeart from '../../baseComponents/LoadingHeart'
import i18n from '../../i18n'
import { connect } from 'react-redux'

const sectionScope = { scope: "sections" }

/**
 * Chat screen component
 *
 * @param {*} props
 */
const chatScreen = props => <Layout backButton sectionName={i18n.t('chat', sectionScope)}>
  <View style={{ flex: 1, overflow: 'hidden' }}>
    <WebView
      renderLoading={() => <LoadingHeart />}
      thirdPartyCookiesEnabled
      source={{ uri: 'https://botlers.io/rb' }}
      style={{ flex: 1 }}
      useWebKit={true}
    />
  </View>
</Layout>

const mapStateToProps = state => ({
  app: state.app,
})

export default connect(mapStateToProps)(chatScreen)