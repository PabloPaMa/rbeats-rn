import React from 'react'
import { Dimensions, Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import FadeInView from '../baseComponents/FadeInView'
import ImageViewer from 'react-native-image-zoom-viewer'

const { height, width } = Dimensions.get('window')

import backBtn from '../assets/images/icons/back_btn.png'

/**
 * A basic image viewer
 *
 * @param {*} props
 */
const imageVisor = props => {
  const images = [{
    url: props.navigation.getParam('url', 'url'),
  }]
  return <View style={styles.container}>
    <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.closeBtn}>
      <Image source={backBtn} style={{ flex: 1, height: 30, width: 30, }} resizeMode='contain' />
    </TouchableOpacity>
    <FadeInView>
      <ImageViewer saveToLocalByLongPress={false} imageUrls={images} style={{ height, width }} />
    </FadeInView>
  </View>
}

export default imageVisor

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
  },
  closeBtn: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 50,
    height: 40,
    justifyContent: 'center',
    left: 10,
    padding: 10,
    position: 'absolute',
    top: Platform.OS === 'ios' ? 40 : 10,
    width: 40,
    zIndex: 2
  },
})