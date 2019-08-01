import React from 'react'
import { Image, ImageBackground, TouchableOpacity, Text, ScrollView, StyleSheet, View } from 'react-native'

import playIcon from '../../../assets/images/icons/play_btn.png'


/**
 * A grid item component
 *
 * @param {*} props
 * @returns
 */
const grid = props => {
  let gridItems = [...props.grid]
    , gridItemsOrdered = []

  while (gridItems.length >= 4) {
    let array = []
    for (let index = 0; index < 4; index++) array.push(gridItems.shift())
    gridItemsOrdered.push(array)
  }

  if (gridItems.length !== 0) gridItemsOrdered.push(gridItems)

  return <ScrollView>
    {
      gridItemsOrdered.map((item, index) => <View key={index} style={{ width: '100%', overflow: 'hidden', }}>
        <TouchableOpacity onPress={() => props.onPress(item[0])} style={{ marginVertical: 10, borderRadius: 15, width: '100%', height: 230, overflow: 'hidden' }}>
          <ImageBackground
            source={{ uri: item[0].cover }}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}
            resizeMode='cover'
          >
            {
              item[0].hypermedia !== null && item[0].hypermedia[0].type === 'video'
                ? <Image source={playIcon} style={{ height: 50, width: 100 }} resizeMode='contain' />
                : null
            }
            <Text style={styles.text} numberOfLines={1}>{item[0].title}</Text>
          </ImageBackground>
        </TouchableOpacity>

        {
          item.length >= 2
            ? <View style={{ flexDirection: 'row', marginVertical: 10, borderRadius: 15, width: '100%', height: 230, overflow: 'hidden' }}>
              <View style={{ flex: 1, marginRight: 5 }}>
                <TouchableOpacity onPress={() => props.onPress(item[1])} style={{ borderRadius: 15, marginBottom: 5, flex: 1, overflow: 'hidden' }}>
                  <ImageBackground
                    source={{ uri: item[1].cover }}
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}
                    resizeMode='cover'
                  >
                    {
                      item[1].hypermedia !== null && item[1].hypermedia[0].type === 'video'
                        ? <Image source={playIcon} style={{ height: 50, width: 100 }} resizeMode='contain' />
                        : null
                    }
                    <Text style={styles.text} numberOfLines={1}>{item[1].title}</Text>
                  </ImageBackground>
                </TouchableOpacity>

                {
                  item[3]
                    ? <TouchableOpacity onPress={() => props.onPress(item[3])} style={{ borderRadius: 15, marginTop: 5, flex: 1, overflow: 'hidden' }}>
                      <ImageBackground
                        source={{ uri: item[3].cover }}
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}
                        resizeMode='cover'
                      >
                        {
                          item[3].hypermedia !== null && item[3].hypermedia[0].type === 'video'
                            ? <Image source={playIcon} style={{ height: 50, width: 100 }} resizeMode='contain' />
                            : null
                        }
                        <Text style={styles.text} numberOfLines={1}>{item[3].title}</Text>
                      </ImageBackground>
                    </TouchableOpacity>
                    : <View style={{ flex: 1 }}></View>
                }
              </View>
              <View style={{ flex: 1, marginLeft: 5 }}>
                {
                  item[2]
                    ? <TouchableOpacity onPress={() => props.onPress(item[2])} style={{ borderRadius: 15, flex: 1, overflow: 'hidden' }}>
                      <ImageBackground
                        source={{ uri: item[2].cover }}
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}
                        resizeMode='cover'
                      >
                        {
                          item[2].hypermedia !== null && item[2].hypermedia[0].type === 'video'
                            ? <Image source={playIcon} style={{ height: 50, width: 100 }} resizeMode='contain' />
                            : null
                        }
                        <Text style={styles.text} numberOfLines={1}>{item[2].title}</Text>
                      </ImageBackground>
                    </TouchableOpacity>
                    : <View></View>
                }
              </View>
            </View>
            : null
        }
      </View>)
    }
  </ScrollView>
}

export default grid

const styles = StyleSheet.create({
  text: {
    bottom: 15,
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 14,
    left: 15,
    position: 'absolute'
  }
})