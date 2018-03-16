import React from 'react';
import { StyleSheet, Text, View, Button, Image, Platform, StatusBar } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import Storage from 'react-native-storage'; // 本地持久存储的封装
import { AsyncStorage } from 'react-native';

import RootNavigation from './src/navigation/RootNavigation';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' &&
            <View style={styles.statusBarUnderlay} />}
          <RootNavigation />
        </View>
      );
    }
  }

  componentWillMount() {
    this._setStorage();
  }

  _setStorage = () => {
    let storage = new Storage({
      size: 1000,
      storageBackend: AsyncStorage,
      // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
      defaultExpires: 1000 * 3600 * 24 * 7, // 过期时间 7天
      // 读写时在内存中缓存数据。默认启用。
      enableCache: true,
      // 如果storage中没有相应数据，或数据已过期，
      // 则会调用相应的sync方法，无缝返回最新数据。
      // sync方法的具体说明会在后文提到
      // 你可以在构造函数这里就写好sync的方法
      // 或是在任何时候，直接对storage.sync进行赋值修改
      // 或是写到另一个文件里，这里require引入
      // sync: require('你可以另外写一个文件专门处理sync')  
    })
    global.storage = storage;
  }

  _loadResourcesAsync = async () => {
    // return Promise.all([
    //   // Asset.loadAsync([
    //   //   require('./assets/images/robot-dev.png'),
    //   //   require('./assets/images/robot-prod.png'),
    //   // ]),
    //   Font.loadAsync([
    //     // This is the font that we are using for our tab bar
    //     Ionicons.font,
    //     // We include SpaceMono because we use it in HomeScreen.js. Feel free
    //     // to remove this if you are not using it in your app
    //     // { 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf') },
    //   ]),
    // ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
