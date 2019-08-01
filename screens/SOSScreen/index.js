import React from 'react'
import { Dimensions, FlatList, Image, Platform, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import i18n from '../../i18n'

import Layout from '../../baseComponents/Layout'
import LoadingHeart from '../../baseComponents/LoadingHeart'
import ErrorMessage from '../../baseComponents/ErrorMessage'
import FadeInView from '../../baseComponents/FadeInView'
import EmptyResult from '../../baseComponents/EmptyResult'

import searchIcon from '../../assets/images/icons/search_icon.png'

import { getSOSResources } from '../../services/SOS'

const { width } = Dimensions.get('window')
const appScope = { scope: "app" }

/**
 * it is supposed that an array of colors should be there,
 * but it never happened
 */
let colors = [
  { bg: '#efeff3', txt: '#9f9fa3' },
]


/**
 * SOS screen component
 *
 * @class SOSScreen
 * @extends {React.Component}
 */
class SOSScreen extends React.Component {

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
   * @memberof SOSScreen
   */
  componentDidMount() {
    getSOSResources()
      .then(res => {
        this.setState({
          media: res.map(item => ({ ...item, color: colors[Math.floor((Math.random() * colors.length - 1) + 1)] })),
          loading: false
        })
      })
      .catch(err => this.setState({
        error: err.message,
        loading: false
      }))
  }

  /**
   * changes to a SOS item screen
   *
   * @param {Object} item
   * @memberof SOSScreen
   */
  navigate = item => {
    this.props.navigation.navigate('SOSItem', { item })
  }


  /**
   * filters the items array when a text search is given
   *
   * @memberof SOSScreen
   */
  filterResult = () => {
    if (this.state.shouldSearch) return this.state.media.filter(mediaData => mediaData.title.toLowerCase().search(this.state.searchText.toLowerCase()) !== -1)
    return this.state.media
  }

  /**
   * get the id of an element
   *
   * @param {Object} item
   * @param {Number} index
   * @memberof SOSScreen
   */
  _keyExtractor = (item, index) => item.id


  /**
   * renders an element of the grid
   *
   * @memberof SOSScreen
   */
  _renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => this.navigate(item)} style={{ flex: 1, padding: 10, alignItems: 'center', justifyContent: 'center' }}>
      <View style={[styles.item, { backgroundColor: this.props.app.theme === 'light' ? '#efeff3' : '#323639', }]}>
        <View style={{ alignItems: 'center', justifyContent: 'center', width: 80, height: 80, borderRadius: 40, overflow: 'hidden', backgroundColor: 'white' }}>
          <Image source={{ uri: item.icon }} style={{ width: 60, height: 60, borderRadius: 40, }} />
        </View>
        <Text style={{ position: 'absolute', bottom: 10, color: '#9f9fa3', fontFamily: 'OpenSans-Bold', color: item.color.txt }} numberOfLines={1}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );


  render() {
    if (this.state.loading) return <LoadingHeart />
    return <Layout sectionName='SOS'>
      {
        this.state.error
          ? <ErrorMessage message={this.state.error} />
          : <FadeInView style={{ flex: 1, paddingHorizontal: 10 }}>
            <View style={styles.searchBar}>
              <Image source={searchIcon} style={{ height: 20, width: 20, marginRight: 5 }} />
              <TextInput
                style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, flex: 1 }}
                placeholder='Busca contenido de tu interés'
                value={this.state.searchText}
                onChangeText={text => this.setState({ searchText: text, shouldSearch: false })}
                onSubmitEditing={() => this.setState({ shouldSearch: true, firstLoad: false })}
              />
            </View>
            {
              this.filterResult().length === 0
                ? <EmptyResult firstLoad={this.state.firstLoad} />
                : <ScrollView>
                  <FlatList
                    data={this.filterResult()}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    numColumns={2}
                  />
                </ScrollView>
            }
          </FadeInView>
      }
    </Layout>
  }
}

const mapStateToProps = state => ({
  app: state.app,
})

export default connect(mapStateToProps)(SOSScreen)

const styles = StyleSheet.create({
  searchBar: {
    alignItems: 'center',
    backgroundColor: '#f3f2f7',
    borderRadius: 50,
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 10,
    padding: Platform.OS === 'ios' ? 10 : 5
  },
  item: {
    alignItems: 'center',
    borderRadius: 20,
    height: (width - 50) / 2,
    justifyContent: 'center',
    padding: 10,
    width: (width - 50) / 2,
  }
})