import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import i18n from '../i18n'

import noResults from '../assets/images/icons/no_results.png'

const appScope = { scope: "app" }

/**
 * It renders a screen called when there is no results
 *
 * @param {Object} props
 */
const emptyResult = props => <View style={styles.container}>
  {
    props.firstLoad
      ? <React.Fragment>
        <Image source={noResults} style={styles.img} />
        <Text style={styles.primaryText}>{i18n.t('empty_load', appScope)}</Text>
        <Text style={styles.text}>{i18n.t('try_later', appScope)}</Text>
      </React.Fragment>
      : <React.Fragment>
        <Image source={noResults} style={styles.img} />
        <Text style={styles.primaryText}>{i18n.t('empty_search', appScope)}</Text>
        <Text style={styles.text}>{i18n.t('try_new_search', appScope)}</Text>
      </React.Fragment>
  }
</View>

export default emptyResult

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingTop: 100
  },
  img: {
    height: 100,
    marginBottom: 10,
    width: 100
  },
  primaryText: {
    color: '#cf488d',
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    textAlign: 'center',
  },
  text: {
    color: '#c1c1c1',
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    textAlign: 'center',
  }
})