import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default class ProfileHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.props.loginState && this.props.loginState.sessionToken ? (
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={styles.avatar} source={{ uri: 'https://img3.doubanio.com/view/note/large/public/p48970612.jpg' }}></Image>
                            <View style={styles.infoSection}>
                                <View>
                                    <Text style={{ color: '#fff', fontSize: 18 }}>{this.props.loginState.username}</Text>
                                </View>
                                <View style={styles.spaceBetweenSection}>
                                    <Text style={styles.defaultText}>Email: {this.props.loginState.email}</Text>
                                    <Text style={{ marginRight: 20, color: '#fff' }}>个人主页 > </Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ marginRight: 20, color: '#fff' }}>关注 0</Text>
                                    <Text style={styles.defaultText}>被关注 0</Text>
                                </View>
                            </View>
                        </View>
                    ) : (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={styles.avatar} source={{ uri: 'http://img.zcool.cn/community/01460b57e4a6fa0000012e7ed75e83.png@2o.png' }}></Image>
                            <TouchableOpacity 
                                activeOpacity={1} onPress={this.props.onLoginClick}
                                style={styles.mainBtn}>
                                <Text style={{color: '#fff', fontWeight: '500'}}>登录 / 注册</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
                
            </View>
        )
    }
    
}
ProfileHeader.defaultProps = {
    loginState: {},
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingLeft: 20,
        paddingBottom: 20,
        backgroundColor: '#0096ff'
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 2,
        borderColor: '#fff'
    },
    infoSection: {
        flex: 3,
        marginLeft: 20,
    },
    spaceBetweenSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        borderBottomColor: '#e0e0e0',
        borderBottomWidth: .2,
        paddingBottom: 10
    },
    defaultText: {
        color: '#fff'
    },
    mainBtn: {
        width: 190,
        height: 38,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 3,
        marginLeft: 70,
    }
});

