// @flow

import React, { Component } from 'react';
import { Platform, WebView, View, StatusBar } from 'react-native';
import WebViewAndroid from 'react-native-webview-android';

type Props = {
  screenProps: Object,
  navigation: Object,
};

export default class WebviewScreen extends Component<Props> {
  componentDidMount = () => {
    const { setWebviewReference } = this.props.screenProps;
    setWebviewReference(this.webview);
  };

  render() {
    const { navigation, screenProps } = this.props;
    const url = 'http://192.168.10.53:3000';
    // const url = 'http://van.aty.kr';

    // if (Platform.OS !== 'ios') {
    //   return (
    //     <View style={{ flex: 1 }}>
    //       <StatusBar backgroundColor="#fe931f" barStyle="light-content" hidden />
    //       <WebView
    //         ref={webview => (this.webview = webview)}
    //         source={{ uri: url }}
    //         startInLoadingState
    //         scalesPageToFit
    //         javaScriptEnabled
    //         bounces={false}
    //         style={{ flex: 1 }}
    //         onMessage={event => screenProps.onMessage(event, navigation)}
    //       />
    //     </View>
    //   );
    // }

    // return (
    //   <View style={{ flex: 1 }}>
    //     <StatusBar barStyle="light-content" />
    //     <WebViewAndroid
    //       ref={webview => (this.webview = webview)}
    //       javaScriptEnabled
    //       onMessage={event => screenProps.onMessage(event, navigation)}
    //       source={{ uri: url }}
    //       style={{ flex: 1 }}
    //     />
    //   </View>
    // );
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#fe931f" barStyle="light-content" hidden />
        <WebView
          ref={webview => (this.webview = webview)}
          source={{ uri: url }}
          startInLoadingState
          scalesPageToFit
          javaScriptEnabled
          bounces={false}
          style={{ flex: 1 }}
          onMessage={event => screenProps.onMessage(event, navigation)}
        />
      </View>
    );
  }
}
