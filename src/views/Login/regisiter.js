import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

export default RegisiterView = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.loginTitle}>欢迎加入新悦读</Text>
            <View style={{ marginTop: 30, flexDirection: 'row' }}>
                <TextInput style={[styles.loginInput, styles.inputFirst]} 
                    multiline={false} 
                    placeholder="邮箱" 
                    underlineColorAndroid="transparent"></TextInput>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <TextInput style={[styles.loginInput, styles.inputSecond]} 
                    multiline={false} 
                    placeholder="密码" 
                    secureTextEntry={true} 
                    underlineColorAndroid="transparent"></TextInput>
            </View>
            <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                <TextInput style={[styles.loginInput, styles.inputBottom]} 
                    multiline={false} 
                    placeholder="昵称" 
                    underlineColorAndroid="transparent"></TextInput>
            </View>

            <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                <TouchableOpacity
                    style={styles.loginBtn}
                    activeOpacity={1} onPress={() => Alert.alert('暂未开放')}>
                    <Text style={{ color: '#fff' }}>注册</Text>
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