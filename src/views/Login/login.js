import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

export default LoginView = ({ navigation }) => {
    
    return (
        <View style={styles.container}>
            <Text style={styles.loginTitle}>新悦读</Text>
            <View style={{marginTop: 30, flexDirection: 'row'}}>
                <TextInput style={[styles.loginInput, styles.inputFirst]} multiline={false} placeholder="邮箱" underlineColorAndroid="transparent"></TextInput>
            </View>
            <View style={{marginBottom: 10, flexDirection: 'row'}}>
                <TextInput style={[styles.loginInput, styles.inputSecond]} multiline={false} placeholder="密码" secureTextEntry={true} underlineColorAndroid="transparent"></TextInput>
            </View>

            <View style={{marginBottom: 10, flexDirection: 'row'}}>
                <TouchableOpacity
                    style={styles.loginBtn}
                    activeOpacity={1} onPress={() => Alert.alert('暂未开放')}>
                    <Text style={{color: '#fff'}}>登录</Text>
                </TouchableOpacity>
            </View>
            
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableOpacity
                    style={{marginRight: 10}}
                    activeOpacity={1} onPress={() => navigation.navigate('RegisiterView')}>
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
        paddingTop: 5,
        paddingBottom: 5
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
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
    }
});