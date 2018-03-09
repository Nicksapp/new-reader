import React from 'react';
import { Platform, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeView from './views/Home' // 主页
import FindView from './views/Find' // 发现
import NoteView from './views/Note' // 笔记
import ProfileView from './views/Profile' // 我的

// 底部 Tab 标签导航
export default TabNav = TabNavigator(
    {
        MainTab: {
            screen: HomeView,
            path: '/',
            navigationOptions: {
                title: '主页',
                tabBarLabel: '主页',  // 底部 title
                headerStyle: {
                    backgroundColor: '#0096ff',
                },
                headerTintColor: '#ffffff',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Ionicons
                        name={focused ? 'ios-home' : 'ios-home-outline'}
                        size={26}
                        style={{ color: tintColor }}
                    />
                ),
            },
        },
        FindTab: {
            screen: FindView,
            path: '/',
            navigationOptions: {
                title: '发现',
                tabBarLabel: '发现',
                headerStyle: {
                    backgroundColor: '#0096ff'
                },
                headerTintColor: '#ffffff',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Ionicons
                        name={focused ? 'ios-compass' : 'ios-compass-outline'}
                        size={26}
                        style={{ color: tintColor }}
                    />
                ),
            },
        },
        NoteTab: {
            screen: NoteView,
            path: '/',
            navigationOptions: {
                title: '学习',
                tabBarLabel: '学习',
                headerStyle: {
                    backgroundColor: '#0096ff'
                },
                headerTintColor: '#ffffff',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Ionicons
                        name={focused ? 'ios-list-box' : 'ios-list-box-outline'}
                        size={26}
                        style={{ color: tintColor }}
                    />
                ),
            },
        },
        ProfileTab: {
            screen: ProfileView,
            path: '/',
            navigationOptions: {
                title: '我的',
                tabBarLabel: '我的',
                headerStyle: {
                    backgroundColor: '#0096ff'
                },
                headerTintColor: '#ffffff',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Ionicons
                        name={focused ? 'ios-contact' : 'ios-contact-outline'}
                        size={26}
                        style={{ color: tintColor }}
                    />
                ),
            },
        },
    },
    {
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
        tabBarOptions: {
            activeTintColor:  Platform.OS === 'android' ? '#fff' :'#0096ff',
        }
    }
);