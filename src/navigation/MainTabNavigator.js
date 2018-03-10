import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeView from '../views/Home' // 主页
import FindView from '../views/Find' // 发现
import NoteView from '../views/Note' // 笔记
import ProfileView from '../views/Profile' // 我的

export default TabNavigator(
    {
        MainTab: {
            screen: HomeView,
            navigationOptions: {
                title: '首页',
                tabBarLabel: '首页',  // 底部 title
                headerTintColor: '#ffffff',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Ionicons
                        name={Platform.OS === 'ios'
                            ? `ios-home${focused ? '' : '-outline'}`
                            : 'md-home'}
                        size={26}
                        style={{ color: tintColor }}
                    />
                ),
            }
        },
        FindTab: {
            screen: FindView,
            navigationOptions: {
                title: '发现',
                tabBarLabel: '发现',
                headerTintColor: '#ffffff',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Ionicons
                        name={Platform.OS === 'ios'
                            ? `ios-compass${focused ? '' : '-outline'}`
                            : 'md-compass'}
                        size={26}
                        style={{ color: tintColor }}
                    />
                ),
            }
        },
        NoteTab: {
            screen: NoteView,
            navigationOptions: {
                title: '笔记',
                tabBarLabel: '笔记',
                headerTintColor: '#ffffff',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Ionicons
                        name={ Platform.OS === 'ios'
                            ? `ios-create${focused ? '' : '-outline'}`
                            : 'md-create'}
                        size={26}
                        style={{ color: tintColor }}
                    />
                ),
            }
        },
        ProfileTab: {
            screen: ProfileView,
            navigationOptions: {
                title: '我的',
                tabBarLabel: '我的',
                headerTintColor: '#ffffff',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Ionicons
                        name={Platform.OS === 'ios'
                            ? `ios-contact${focused ? '' : '-outline'}`
                            : 'md-contact'}
                        size={26}
                        style={{ color: tintColor }}
                    />
                ),
            }
        },
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused }) => {
            },
        }),
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
        tabBarOptions: {
            activeTintColor: Platform.OS === 'android' ? '#fff' : '#0096ff',
        }
    }
);
