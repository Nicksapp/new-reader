import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ProfileHeader from './profileHeader'
import ProfileActionList from './profileActionList'

export default class ProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginState: {},
        }
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <ScrollView style={styles.mainSection}>
                    <ProfileHeader
                        loginState={this.state.loginState}
                        onLoginClick={() => navigate('LoginView')} />
                    <ProfileActionList 
                        onNavigatorClick={(page, title) => navigate(page, {title})} />

                    {
                        this.state.loginState && this.state.loginState.sessionToken ? (
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => this.handleLogout()}
                                style={styles.cellWrapper}>
                                <View style={styles.cellPart}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Ionicons
                                            name={Platform.OS === 'ios'
                                                ? 'ios-exit'
                                                : 'md-exit'}
                                            size={26}
                                            style={{ color: '#bdbdbd', width: 25, textAlign: 'center' }}
                                        />
                                        <Text style={{ marginLeft: 15, lineHeight: 26, }}>退出登录</Text>
                                    </View>
                                    <Ionicons
                                        name={Platform.OS === 'ios'
                                            ? `ios-arrow-forward`
                                            : 'md-arrow-dropright'}
                                        size={26}
                                        style={{ color: "#dddee1", marginRight: 15 }}
                                    />
                                </View>
                            </TouchableOpacity>
                        ) : (null)
                    }
                    
                </ScrollView>
            </View>
        )
    }

    componentWillMount() {
        storage.load({
            key: 'loginState',
        }).then(data => {
            if (data.sessionToken) {
                this.setState({ loginState: data })
            }
        }).catch(err => { return false; })
    }

    handleLogout = () => {
        storage.remove({
            key: 'loginState'
        }).then(() => {
            this.setState({
                loginState: {}
            })
        })
    }
}

const styles = StyleSheet.create({
    container: {  
        backgroundColor: '#f5f5f5',
        flex: 1
    },
    mainSection: {
        flex: 1
    },
    cellWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingLeft: 20,
        marginTop: 15,
    },
    cellPart: {
        // borderBottomWidth: 1,
        // borderBottomColor: '#e9eaec',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        paddingBottom: 10,
    }
});