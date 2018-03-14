import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default ProfileHeader = (props) => {
    return (
        <View style={styles.container}>
            <Image style={styles.avatar} source={{ uri:'https://img3.doubanio.com/view/note/large/public/p48970612.jpg'}}></Image>
            <View style={styles.infoSection}>
                <View>
                    <Text style={{color: '#fff', fontSize: 18}}>淹死的鱼</Text>
                </View>
                <View style={styles.spaceBetweenSection}>
                    <Text style={styles.defaultText}>ID: nickgo</Text>
                    <Text style={{marginRight: 20, color: '#fff'}}>个人主页 > </Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{marginRight: 20, color: '#fff'}}>关注 0</Text>
                    <Text style={styles.defaultText}>被关注 0</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
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

});

