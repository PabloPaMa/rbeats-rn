import React from 'react'
import { Image, ImageBackground, Text, ScrollView, TouchableOpacity, View } from 'react-native'
import i18n from '../../i18n'

import Layout from '../../baseComponents/Layout'
import FadeInView from '../../baseComponents/FadeInView'
import ImageVisor from './components/ImageVisor'
import VideoPlayer from './components/VideoPlayer'

import playIcon from '../../assets/images/icons/play_btn.png'

const sectionScope = { scope: "sections" }

/**
 * Media item screen component
 *
 * @export
 * @class MediaItemScreen
 * @extends {React.Component}
 */
export default class MediaItemScreen extends React.Component {

  state = { showVisor: true }

  onClose = () => { this.props.navigation.goBack() }

  render() {
    const { navigation } = this.props
    const item = navigation.getParam('item', null)

    if (this.state.showVisor && item.hypermedia !== null) return <View style={{ flex: 1, }}>
      {
        item.hypermedia[0].type.search('video') !== -1 ? <VideoPlayer onClose={this.onClose} url={item.hypermedia[0].url} /> : <ImageVisor onClose={this.onClose} url={item.hypermedia[0].url} />
      }
    </View>

    return <Layout backButton sectionName={i18n.t('info', sectionScope)}>
      <FadeInView style={{ flex: 1, }}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 40, paddingBottom: 10 }}>
          {
            item.hypermedia !== null
              ? <TouchableOpacity onPress={() => this.setState({ showVisor: true })} key={item.id} style={{ marginVertical: 10, borderRadius: 15, width: '100%', height: 200, overflow: 'hidden' }}>
                <ImageBackground
                  source={{ uri: item.cover }}
                  style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}
                  resizeMode='cover'
                >
                  {
                    item.hypermedia[0].type === 'video'
                      ? <Image source={playIcon} style={{ height: 50, width: 100 }} resizeMode='contain' />
                      : null
                  }
                </ImageBackground>
              </TouchableOpacity>
              : null
          }
          <Text style={{ color: '#A9A8B2', fontSize: 30, marginBottom: 15, marginTop: 20, fontFamily: 'OpenSans-Bold', }} numberOfLines={3}>{item.title}</Text>
          {
            item.paragraphs.map(paragraph => <View key={paragraph.subtitle}>
              <Text style={{ color: '#d45899', fontFamily: 'OpenSans-Bold', marginBottom: 10, }}>{paragraph.subtitle}</Text>
              <Text style={{ color: '#9f9fa3', fontFamily: 'OpenSans-SemiBold', marginBottom: 10, }}>{paragraph.body}</Text>
            </View>)
          }
        </ScrollView>
      </FadeInView>
    </Layout>
  }
}