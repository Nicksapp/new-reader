import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

// Tab router 配置 
import Routes from './src/routes'
import Scan from './src/views/Scan'


export default StacksOverTabs = StackNavigator({
  Root: {
    screen: TabNav,
  },
  ScanView: {  // 测试 导航页
    screen: Scan,
    navigationOptions: {
      title: '扫描二维码',
      headerStyle: {
        backgroundColor: '#0096ff'
      },
      headerTintColor: '#ffffff',
    },
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
