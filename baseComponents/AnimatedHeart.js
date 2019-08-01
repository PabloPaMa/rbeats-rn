import React from 'react'
import { Animated, Easing, Image } from 'react-native'

import rbLogo from '../assets/images/logo/rb_isotype.png'


/**
 * Handles the animation of the rb heart logo
 *
 * @export
 * @class AnimatedHeart
 * @extends {React.Component}
 */
export default class AnimatedHeart extends React.Component {
  constructor(props) {
    super(props)
    this.spinValue = new Animated.Value(0)
  }

  componentDidMount() {
    this.spin()
  }

  spin() {
    this.spinValue.setValue(0)
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear
      }
    ).start(() => this.spin())
  }

  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 1.2, 1]
    })
    return <Animated.Image
      style={{
        alignSelf: 'center',
        width: this.props.width ? this.props.width : 50,
        height: this.props.height ? this.props.height : 50,
        transform: [{ scale: spin }]
      }}
      source={rbLogo}
      resizeMode='contain'
    />
  }
}