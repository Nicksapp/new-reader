import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
// import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

import Scan from '../views/Scan'
import Demo from '../views/demo'
import Camera from '../components/camera'
import Search from '../views/Search'
import articleDetail from '../views/Detail/articleDetail'
import itemDetail from '../views/Detail/itemDetail'
import Login from '../views/Login/login'
import Regisiter from '../views/Login/regisiter'

const RootStackNavigator = StackNavigator(
    {
        Main: {
            screen: MainTabNavigator,
        },
        ScanView: {  
            screen: Scan,
            navigationOptions: {
                title: '扫描二维码',
                headerStyle: {
                    backgroundColor: '#0096ff'
                },
                headerTintColor: '#ffffff',
            },
        },
        DetailView: {  
            screen: articleDetail,
            navigationOptions: {
                title: '详情',
                header: null
            },
        },
        ItemDetaillView: {  
            screen: itemDetail,
            navigationOptions: {
                title: '详情',
                header: null
            },
        },
        SearchView: {  
            screen: Search,
            navigationOptions: {
                header: null
            },
        },
        LoginView: {  
            screen: Login,
            navigationOptions: {
                header: null
            },
        },
        RegisiterView: {  
            screen: Regisiter,
            navigationOptions: {
                header: null
            },
        },

        DemoView: {  // 测试 导航页
            screen: Demo,
            navigationOptions: {
                title: 'Demo',
                headerStyle: {
                    backgroundColor: '#0096ff'
                },
                headerTintColor: '#ffffff',
            },
        },
        CameraView: {  // 测试 导航页
            screen: Camera,
            navigationOptions: {
                title: 'Camera',
                headerStyle: {
                    backgroundColor: '#0096ff'
                },
                headerTintColor: '#ffffff',
            },
        },
    },
    {
        navigationOptions: () => ({
            headerTitleStyle: {
                fontWeight: 'normal',
            },
            headerStyle: {
                backgroundColor: '#0096ff'
            },
        }),
    }
);

export default class RootNavigator extends React.Component {
    componentDidMount() {
        // this._notificationSubscription = this._registerForPushNotifications();
    }

    componentWillUnmount() {
        this._notificationSubscription && this._notificationSubscription.remove();
    }

    render() {
        return <RootStackNavigator />;
    }

    _registerForPushNotifications() {
        // Send our push token over to our backend so we can receive notifications
        // You can comment the following line out if you want to stop receiving
        // a notification every time you open the app. Check out the source
        // for this function in api/registerForPushNotificationsAsync.js
        registerForPushNotificationsAsync();

        // Watch for incoming notifications
        this._notificationSubscription = Notifications.addListener(
            this._handleNotification
        );
    }

    _handleNotification = ({ origin, data }) => {
        console.log(
            `Push notification ${origin} with data: ${JSON.stringify(data)}`
        );
    };
}
