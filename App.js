import React, { Component } from 'react'
import { NetInfo, Platform, StatusBar, StyleSheet, View, Text } from 'react-native'
import AppNavigator from './navigation/AppNavigator'

import { Provider } from 'react-redux'
import store from './redux/store'
import { setOnlineStatus } from './redux/actions/appState'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
})

export default class App extends Component {

  state = {
    isLoadingComplete: false,
  }

  componentDidMount() {
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      store.dispatch(setOnlineStatus(connectionInfo.type !== 'none'))
      // store.dispatch(setOnlineStatus(false))
    })
    NetInfo.isConnected.addEventListener('connectionChange', (isConnected) => { store.dispatch(setOnlineStatus(isConnected)) })
  }

  render() {
    return <Provider store={store}>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    </Provider>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
})
