import React, { Component } from 'react';
import { BackHandler, Alert, Platform, WebView, View, StatusBar, Linking } from 'react-native';
import { AppInstalledChecker } from 'react-native-check-app-install';
import ImagePicker from 'react-native-image-crop-picker';

const ANDROID_STORE = 'market://details?id=com.nice.appcard';
const IOS_STORE = 'https://itunes.apple.com/kr/app/apple-store/id1146369440?mt=8';

export default class App extends Component {
  state = {
    backPressTime: 0,
    url: 'http://192.168.10.53:3000/franchise/addShop',
    currentOS: Platform.OS,
  };

  componentDidMount = async () => {
    ImagePicker.clean();
    Linking.getInitialURL()
      .then(url => {
        if (url) {
          console.log(`Initial url is: ${url}`);
          this.setState({ url: 'http://192.168.10.53:3000/result' });
        }
      })
      .catch(err => console.error('An error occurred', err));

    if (this.state.currentOS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.backHandler);
    }

    // Linking.addEventListener('url', this._handleOpenURL);
  };

  componentWillUnmount = () => {
    // Linking.removeEventListener('url', this._handleOpenURL);
    if (this.state.currentOS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.backHandler);
    }
  };

  _handleOpenURL = event => {
    console.log(event.url);
  };

  backHandler = () => {
    const now = new Date();
    // double press on android back button
    if (now.getTime() - this.state.backPressTime < 350) {
      Alert.alert(
        '단골프리미엄',
        '종료하시겠습니까?',
        [{ text: '취소' }, { text: '종료', onPress: () => BackHandler.exitApp() }],
        { cancelable: false }
      );

      return true;
    }

    this.setState({ backPressTime: now.getTime() });

    this.webview.goBack();
    return true;
  };

  imageHandler = type => {
    const options = {
      width: 1200,
      height: 800,
      cropping: true,
      hideBottomControls: true,
      includeBase64: true,
    };

    if (type === 'camera') {
      ImagePicker.openCamera(options)
        .then(image => {
          this.webview.postMessage(image.data);
        })
        .catch(e => console.log(e));
    } else {
      ImagePicker.openPicker(options)
        .then(image => {
          console.log(image);
          this.webview.postMessage(JSON.stringify(image));
        })
        .catch(e => console.log(e));
    }
  };

  onMessage = event => {
    const { data } = event.nativeEvent;
    // this.imageHandler(data);

    // const { currentOS } = this.state;
    // let url = null;
    // if (currentOS === 'android') {
    //   url = ANDROID_STORE;
    // } else {
    //   url = IOS_STORE;
    // }

    // AppInstalledChecker.checkURLScheme('niceappcard').then(isInstalled => {
    //   if (isInstalled) {
    //     Linking.openURL('niceappcard://payment');
    //   } else {
    //     Linking.openURL(url);
    //   }
    // });
  };

  render() {
    const { url } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <StatusBar />
        <WebView
          ref={webview => (this.webview = webview)}
          source={{ uri: url }}
          startInLoadingState
          scalesPageToFit
          javaScriptEnabled
          bounces={false}
          style={{ flex: 1 }}
          onMessage={this.onMessage}
        />
      </View>
    );
  }
}
