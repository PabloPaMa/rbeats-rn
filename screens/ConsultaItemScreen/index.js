import React from 'react'
import { Alert, Image, Linking, Platform, Text, ScrollView, TouchableOpacity, View, WebView } from 'react-native'
import i18n from '../../i18n'

import Layout from '../../baseComponents/Layout'
import FadeInView from '../../baseComponents/FadeInView'

import consultaLogo from '../../assets/images/icons/icon_consulta.png'

const sectionScope = { scope: "sections" }
const appScope = { scope: "app" }


/**
 * Consulta item screen component
 *
 * @export
 * @class MediaItemScreen
 * @extends {React.Component}
 */
export default class ConsultaItemScreen extends React.Component {

  state = {
    showVisor: false
  }


  /**
   * changes the modal state to false
   *
   * @memberof MediaItemScreen
   */
  onClose = () => { this.setState({ showVisor: false }) }

  /**
   * tries to open an link according to OS platform,
   * due to problems with default app that handles pdf on Android, 
   * it launch the resource on google chrome
   *
   * @param {String} url
   * @memberof MediaItemScreen
   */
  openLink = url => {
    // this.props.navigation.navigate('Browser', { url })
    if (Platform.OS === 'android')
      Linking.canOpenURL(`googlechrome://navigate?url=${url}`).then(supported => {
        if (supported) Linking.openURL(`googlechrome://navigate?url=${url}`)
        else Alert.alert('Error', 'No se pudo ejecutar esta acción')
      })
    else
      Linking.canOpenURL(url).then(supported => {
        if (supported) Linking.openURL(url)
        else Alert.alert('Error', 'No se pudo ejecutar esta acción')
      })
  }


  /**
   * if 'video' is detected lauch a Video player else launch a Image visor
   *
   * @memberof ConsultaItemScreen
   */
  onNavigate = item => {
    let { url, type } = item[0]
      , visor = type.search('video') !== -1 ? 'VideoPlayer' : 'ImageVisor'
    this.props.navigation.navigate(visor, { url: url.trim() })
  }

  render() {
    const { navigation } = this.props
    const item = navigation.getParam('item', null)
    let banner = item.cover

    return <Layout backButton sectionName={i18n.t('guide', sectionScope)}>
      <FadeInView style={{ flex: 1, }}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 40, paddingBottom: 50 }}>
          <View style={{ paddingTop: 10, }}>
            <TouchableOpacity onPress={() => this.openLink(item.url)} style={{ marginRight: 10, height: 50, width: 50, borderRadius: 50, backgroundColor: '#f4dc60', alignItems: 'center', justifyContent: 'center' }}>
              <Image style={{ height: 40, width: 40 }} source={consultaLogo} />
            </TouchableOpacity>
          </View>
          <Text style={{ color: '#A9A8B2', fontSize: 30, marginVertical: 20, fontFamily: 'OpenSans-Bold', }}>{item.title}</Text>
          <View key={item.id} style={{ marginVertical: 10, borderRadius: 15, width: '100%', height: 200, overflow: 'hidden' }}>
            <Image
              source={{ uri: banner }}
              style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-end', padding: 20 }}
              resizeMode='cover'
            />
          </View>
          {
            item.paragraphs.map(paragraph => <View key={paragraph.subtitle}>
              <Text style={{ color: '#9f9fa3', marginBottom: 10, fontFamily: 'OpenSans-SemiBold' }}>{paragraph.body}</Text>
            </View>)
          }
          {
            item.hypermedia
              ? <Text onPress={() => this.onNavigate(item.hypermedia)} style={{ color: '#d45899', fontFamily: 'OpenSans-Bold' }}>
                {i18n.t('see_more', appScope)}
              </Text>
              : null
          }
        </ScrollView>
      </FadeInView>
    </Layout>
  }
}