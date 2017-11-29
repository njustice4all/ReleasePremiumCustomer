// @flow

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Camera from 'react-native-camera';

type Props = {
  screenProps: Object,
  navigation: Object,
};

export default class CameraSceen extends Component<Props> {
  takePicture = () => {
    this.camera
      .capture()
      .then(data => {
        this.props.screenProps.webview.postMessage(data);
        this.props.navigation.goBack();
      })
      .catch(err => console.error(err));
  };

  render() {
    console.log(this.props.screenProps);
    return (
      <View style={styles.container}>
        <Camera
          ref={cam => (this.camera = cam)}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          playSoundOnCapture={false}
        >
          <Text style={styles.capture} onPress={this.takePicture}>
            [CAPTURE]
          </Text>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40,
  },
});
