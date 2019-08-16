import React from 'react'
import { AsyncStorage, Image, Platform, Text, TextInput, StyleSheet, View } from 'react-native'
import i18n from '../../i18n'

import Layout from '../../baseComponents/Layout'
import LoadingHeart from '../../baseComponents/LoadingHeart'
import ErrorMessage from '../../baseComponents/ErrorMessage'
import FadeInView from '../../baseComponents/FadeInView'
import Grid from './components/Grid'
import EmptyResult from '../../baseComponents/EmptyResult'
import SecureStorage, { ACCESS_CONTROL, ACCESSIBLE, AUTHENTICATION_TYPE } from 'react-native-secure-storage'

import searchIcon from '../../assets/images/icons/search_icon.png'

import { getMediaResources } from '../../services/media'

import { connect } from 'react-redux'
import { setTheme } from '../../redux/actions/appState'

const sectionScope = { scope: "sections" }
const inputsScope = { scope: "inputs" }
const appScope = { scope: "app" }

const config = {
  accessControl: ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE,
  accessible: ACCESSIBLE.WHEN_UNLOCKED,
  authenticationPrompt: 'auth with yourself',
  service: 'rbeats',
  authenticateType: AUTHENTICATION_TYPE.BIOMETRICS,
}

/**
 * Media grid screen componet
 *
 * @export
 * @class MediaGridScreen
 * @extends {React.Component}
 */
class MediaGridScreen extends React.Component {

  state = {
    media: [],
    loading: true,
    loadingMessage: i18n.t('loading_resources', appScope),
    error: '',
    searchText: '',
    shouldSearch: false,
    firstLoad: true
  }


  /**
   * loads items to display in the grid
   *
   * @memberof MediaGridScreen
   */
  componentDidMount() {
    getMediaResources()
      .then(res => {
        this.setState({
          media: [...res],
          loading: false
        })
      })
      .catch(err => this.setState({
        error: err.message,
        loading: false
      }))
  }


  /**
   * changes to item screen passing the item as parameter
   *
   * @param {Object} item
   * @memberof MediaGridScreen
   */
  navigate = item => {
    this.props.navigation.navigate('MediaItem', { item })
  }



  /**
   * get the id of an element
   *
   * @param {Object} item
   * @param {Number} index
   * @memberof MediaGridScreen
   */
  filterResult = () => {
    let divider = 0

    if (this.state.shouldSearch) return this.state.media
      .filter(mediaData => mediaData.title.toLowerCase().search(this.state.searchText.toLowerCase()) !== -1)
      .map((mediaData, index) => {
        let itemType = (index + 1) - divider
        if ((index + 1) % 4 === 0) divider += 4
        return { ...mediaData, itemType }
      })

    return this.state.media
      .map((mediaData, index) => {
        let itemType = (index + 1) - divider
        if ((index + 1) % 4 === 0) divider += 4
        return { ...mediaData, itemType }
      })
  }

  /**
   * Handles when press the enter button on keyboard,
   * and change the state of the ui
   *
   * @memberof MediaGridScreen
   */
  onSubmitEditing = async () => {
    if (this.state.searchText === 'rb dark mode') {
      let { theme } = this.props.app
      this.props.dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))
      await SecureStorage.setItem('@app:settings', JSON.stringify({
        ...this.props.app,
        theme: theme === 'light' ? 'dark' : 'light'
      }), config)
      this.setState({ searchText: '' })
    } else {
      this.setState({ shouldSearch: true, firstLoad: false })
    }
  }

  render() {
    if (this.state.loading) return <LoadingHeart />
    return <Layout sectionName={i18n.t('info', sectionScope)}>
      {
        this.state.error
          ? <ErrorMessage message={this.state.error} />
          : <FadeInView style={{ flex: 1, paddingHorizontal: 10 }}>
            <View style={styles.searchBar}>
              <Image source={searchIcon} style={{ height: 20, width: 20, marginRight: 5 }} />
              <TextInput
                placeholder={i18n.t('search', inputsScope)}
                value={this.state.searchText}
                onChangeText={text => this.setState({ searchText: text, shouldSearch: false })}
                onSubmitEditing={this.onSubmitEditing}
              />
            </View>
            {
              this.filterResult().length === 0
                ? <EmptyResult firstLoad={this.state.firstLoad} />
                : <Grid onPress={this.navigate} grid={this.filterResult()} />
            }
          </FadeInView>
      }
    </Layout>
  }
}

const mapStateToProps = state => ({
  app: state.app,
  user: state.user
})

export default connect(mapStateToProps)(MediaGridScreen)

const styles = StyleSheet.create({
  searchBar: {
    alignItems: 'center',
    backgroundColor: '#f3f2f7',
    borderRadius: 50,
    flexDirection: 'row',
    marginHorizontal: 20, marginRight: 5,
    marginVertical: 10,
    padding: Platform.OS === 'ios' ? 10 : 5
  }
})