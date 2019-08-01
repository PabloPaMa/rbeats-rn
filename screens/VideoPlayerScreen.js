import React from 'react'
import { Dimensions, Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import Video from 'react-native-video'
import FadeInView from '../baseComponents/FadeInView'
const { height, width } = Dimensions.get('window')

import backBtn from '../assets/images/icons/back_btn.png'


/**
 * A basic video player
 *
 * @param {Object} props
 */
const videoVisor = props => <View style={styles.container}>
  <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.closeBtn}>
    <Image source={backBtn} style={{ flex: 1, height: 30, width: 30, }} resizeMode='contain' />
  </TouchableOpacity>
  <FadeInView>
    <Video
      source={{ uri: props.navigation.getParam('url', 'url') }}
      rate={1.0}
      volume={1.0}
      isMuted={false}
      resizeMode="cover"
      shouldPlay
      isLooping
      style={{ width, height: height - 50 }}
      useNativeControls
      resizeMode='contain'
    />
  </FadeInView>
</View>

export default videoVisor

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