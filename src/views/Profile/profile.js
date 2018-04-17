import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Platform, Modal, TouchableHighlight, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ProfileHeader from './profileHeader'
import ProfileActionList from './profileActionList'

import { modifyPassword } from '../../utils/lib'

export default class ProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginState: {},
            modalVisible: false,
            old_pass: '',
            new_pass: '',
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
                            <View>
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
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => this.setState({ modalVisible: true })}
                                style={styles.cellLessWrap}>
                                <View style={styles.cellPart}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Ionicons
                                            name={Platform.OS === 'ios'
                                                ? 'ios-exit'
                                                : 'md-exit'}
                                            size={26}
                                            style={{ color: '#bdbdbd', width: 25, textAlign: 'center' }}
                                        />
                                        <Text style={{ marginLeft: 15, lineHeight: 26, }}>修改密码</Text>
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
                            </View>
                        ) : (null)
                    }

                    <Modal
                        animationType={"slide"}
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => { this.setState({ modalVisible: false }); }}
                    >
                        <View style={{
                            marginTop: 122, 
                            paddingLeft: 20,
                            paddingRight: 20, }}>
                            <View style={{ marginTop: 30, flexDirection: 'row' }}>
                                <TextInput
                                    value={this.state.old_pass}
                                    onChangeText={(old_pass) => this.setState({ old_pass })}
                                    style={[styles.loginInput, styles.inputFirst]}
                                    multiline={false}
                                    placeholder="之前的密码"
                                    underlineColorAndroid="transparent"></TextInput>
                            </View>
                            <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                                <TextInput
                                    value={this.state.new_pass}
                                    onChangeText={(new_pass) => this.setState({ new_pass })}
                                    style={[styles.loginInput, styles.inputSecond]}
                                    multiline={false}
                                    placeholder="新密码"
                                    secureTextEntry={true}
                                    underlineColorAndroid="transparent"></TextInput>
                            </View>
                            <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                                <TouchableOpacity
                                    style={styles.loginBtn}
                                    activeOpacity={1} onPress={() => this.handleModifyPass()}>
                                    <Text style={{ color: '#fff' }}>提交修改</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

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

    handleModifyPass = () => {
        if (!this.state.old_pass || !this.state.new_pass) {
            Alert.alert('请输入新密码, 再尝试提交！');
            return false;
        }

        let postData = {
            old_password: this.state.old_pass,
            new_password: this.state.new_pass,
        };
        
        storage.load({
            key: 'loginState'
        }).then(data => {
            if (data && data.sessionToken) {
                let loginState = {
                    sessionToken: data.sessionToken,
                    objectId: data.objectId
                }
                return loginState;
            } else {
                throw new Error('请登录后再尝试操作！');
            }
        }).then(loginState => {
            modifyPassword(postData, loginState.sessionToken, loginState.objectId).then(res => {
                if (res && res.code === 210) {
                    Alert.alert('以前密码输入错误，请重新尝试！');
                    return false;
                }
                if (res && res.objectId) {
                    Alert.alert('密码修改成功, 请重新登录您的账号');
                    this.setState({ modalVisible: false });
                    storage.remove({
                        key: 'loginState'
                    }).then(() => {
                        this.setState({
                            loginState: {}
                        })
                    })
                }
            }).catch(err => Alert.alert(err))
        }).catch(err => Alert.alert('请登录后再尝试操作！'))
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
    cellLessWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingLeft: 20,
        borderTopColor: '#e9eaec',
        borderTopWidth: 1,
    },
    cellPart: {
        // borderBottomWidth: 1,
        // borderBottomColor: '#e9eaec',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        paddingBottom: 10,
    },
    loginInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#e9eaec',
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    inputFirst: {
        borderBottomWidth: 0,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    inputSecond: {
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    loginBtn: {
        flex: 1,
        backgroundColor: '#0096ff',
        padding: 13,
        alignItems: 'center',
        borderRadius: 5,
    }
});