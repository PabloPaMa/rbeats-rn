import React from 'react'
import { Alert, Image, Linking, Text, ScrollView, TouchableOpacity, View } from 'react-native'

import Layout from '../../baseComponents/Layout'
import FadeInView from '../../baseComponents/FadeInView'

import callLogo from '../../assets/images/icons/icon_call.png'
import mailLogo from '../../assets/images/icons/icon_mail.png'


/**
 * SOS item screen component
 *
 * @export
 * @class SOSItemScreen
 * @extends {React.Component}
 */
export default class SOSItemScreen extends React.Component {

  state = {
    showVisor: false
  }


  /**
   * launchs the phone caller app
   *
   * @param {String} phone
   * @memberof SOSItemScreen
   */
  openLink = phone => {
    Linking.canOpenURL(`tel:${phone}`).then(supported => {
      if (supported) Linking.openURL(`tel:${phone}`)
      else Alert.alert('Error', 'No se pudo ejecutar esta acción')
    })
  }


  /**
   * launchs the default email client
   *
   * @param {String} mail
   * @memberof SOSItemScreen
   */
  openMail = mail => {
    Linking.canOpenURL(`mailto:${mail}&subject=abcdefg&body=body`).then(supported => {
      if (supported) Linking.openURL(`mailto:${mail}`)
      else Alert.alert('Error', 'No se pudo ejecutar esta acción')
    })
  }

  render() {
    const { navigation } = this.props
    const item = navigation.getParam('item', null)
    let banner = item.cover

    return <Layout backButton sectionName='SOS'>
      <FadeInView style={{ flex: 1, }}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 40, paddingBottom: 50 }}>
          <View style={{ flexDirection: 'row', paddingTop: 10 }}>
            <TouchableOpacity onPress={() => this.openLink(item.phone)} style={{ marginRight: 10, height: 50, width: 50, borderRadius: 50, backgroundColor: '#f4dc60', alignItems: 'center', justifyContent: 'center' }}>
              <Image style={{ height: 40, width: 40 }} source={callLogo} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.openMail(item.email)} style={{ height: 50, width: 50, borderRadius: 50, backgroundColor: '#f4dc60', alignItems: 'center', justifyContent: 'center' }}>
              <Image style={{ height: 40, width: 40 }} source={mailLogo} />
            </TouchableOpacity>
          </View>
          <Text style={{ color: '#A9A8B2', fontSize: 30, marginVertical: 20, fontFamily: 'OpenSans-Bold', }} numberOfLines={3}>{item.title}</Text>
          <View key={item.id} style={{ marginVertical: 10, borderRadius: 15, width: '100%', height: 200, overflow: 'hidden' }}>
            <Image
              source={{ uri: banner }}
              style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-end', padding: 20 }}
              resizeMode='cover'
            />
          </View>
          {
            item.paragraphs.map(paragraph => <View key={paragraph.subtitle}>
              <Text style={{ color: '#9f9fa3', marginBottom: 10, fontFamily: 'OpenSans-SemiBold', }}>{paragraph.body}</Text>
            </View>)
          }
        </ScrollView>
      </FadeInView>
    </Layout>
  }
}