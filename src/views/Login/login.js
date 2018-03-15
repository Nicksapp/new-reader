import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { loginUser } from '../../utils/lib'
import { defaultAlert } from '../../utils/utils'
import Loading from '../../components/loading'

export default class LoginView extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
        };
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                {
                    this.state.loading ? (<Loading />) : (null)
                }
                <Text style={styles.loginTitle}>新悦读</Text>
                <View style={{marginTop: 30, flexDirection: 'row'}}>
                    <TextInput 
                        value={this.state.email}
                        onChangeText={(email) => this.setState({ email })}
                        style={[styles.loginInput, styles.inputFirst]} 
                        keyboardType="email-address" 
                        multiline={false} 
                        placeholder="邮箱" 
                        underlineColorAndroid="transparent"></TextInput>
                </View>
                <View style={{marginBottom: 10, flexDirection: 'row'}}>
                    <TextInput 
                        value={this.state.password}
                        onChangeText={(password) => this.setState({ password })}
                        style={[styles.loginInput, styles.inputSecond]} 
                        multiline={false} 
                        placeholder="密码" 
                        secureTextEntry={true} 
                        underlineColorAndroid="transparent"></TextInput>
                </View>

                <View style={{marginBottom: 10, flexDirection: 'row'}}>
                    <TouchableOpacity
                        style={styles.loginBtn}
                        activeOpacity={1} onPress={() => this.handleLoginUser()}>
                        <Text style={{color: '#fff'}}>登录</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity
                        style={{marginRight: 10}}
                        activeOpacity={1} onPress={() => navigate('RegisiterView')}>
                        <Text style={{color: '#0096ff'}}>注册账号</Text>
                    </TouchableOpacity>
                    <Text style={{color: '#757575'}}> | </Text>
                    <TouchableOpacity
                        style={{marginLeft: 10}}
                        activeOpacity={1} onPress={() => Alert.alert('暂未开放')}>
                        <Text style={{color: '#757575'}}>忘记密码</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    handleLoginUser = () => {
        const { replace } = this.props.navigation;
        if (this.state.email && this.state.password) {
            this.setState({ loading: true })
            const formData = {
                username: this.state.email,
                password: this.state.password
            }
            loginUser(formData).then(res => {
                this.setState({ loading: false })
                if (res.sessionToken) {
                    replace('Main');
                } else {
                    defaultAlert(res.error || '登录失败, 请再次尝试！');
                }
            })
        } else {
            defaultAlert('邮箱或密码为空！');
            return false;
        } 
    }
  
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: -150
    },
    loginTitle: {
        fontSize: 30,
        color: '#0096ff'
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