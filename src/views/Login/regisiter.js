import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { registerUser } from '../../utils/lib'
import { defaultAlert } from '../../utils/utils'
import Loading from '../../components/loading'

export default class RegisiterView extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            username: '',
            loading: false,
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.loading ? (<Loading /> ) : (null)
                }
                <Text style={styles.loginTitle}>欢迎加入新悦读</Text>
                <View style={{ marginTop: 30, flexDirection: 'row' }}>
                    <TextInput 
                        value={this.state.email}
                        onChangeText={(email) => this.setState({ email })}
                        style={[styles.loginInput, styles.inputFirst]} 
                        multiline={false} 
                        placeholder="邮箱" 
                        keyboardType="email-address"
                        underlineColorAndroid="transparent"></TextInput>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput 
                        value={this.state.password}
                        onChangeText={(password) => this.setState({ password })}
                        style={[styles.loginInput, styles.inputSecond]} 
                        multiline={false} 
                        placeholder="密码" 
                        secureTextEntry={true} 
                        underlineColorAndroid="transparent"></TextInput>
                </View>
                <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                    <TextInput 
                        value={this.state.username}
                        onChangeText={(username) => this.setState({ username })}                        
                        style={[styles.loginInput, styles.inputBottom]} 
                        multiline={false} 
                        placeholder="昵称" 
                        underlineColorAndroid="transparent"></TextInput>
                </View>

                <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={styles.loginBtn}
                        activeOpacity={1} onPress={() => this.handleRegisterUser()}>
                        <Text style={{ color: '#fff' }}>注册</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    handleRegisterUser = () => {
        const { replace } = this.props.navigation;

        if (this.state.email && this.state.username && this.state.password) {
            this.setState({ loading: true })
            const formData = {
                email: this.state.email,
                username: this.state.username,
                password: this.state.password
            }
            registerUser(formData).then(res => {
                this.setState({ loading: false })
                if (res.sessionToken) {
                    defaultAlert('注册成功，请及时检查邮件并完成验证！');
                    replace('LoginView');
                } else {
                    defaultAlert(res.error || '请求异常, 请再次尝试！');
                }
            })
        } else {
            defaultAlert('存在未填项！');
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
        borderBottomWidth: 0,
    },
    inputBottom: {
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