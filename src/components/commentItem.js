import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default CommentItem = (props) => {
    return (
        <View style={styles.cellContainer}>
            <View style={{flex: 1}}>
                <Image style={{width: 36, height: 36, borderRadius: 18, resizeMode: 'cover'}} source={{ uri: 'https://img3.doubanio.com/view/note/large/public/p48970612.jpg'}}></Image>
            </View>
            <View style={{flex: 8, marginLeft: 10}}>
                <View>
                    <Text>黑暗塔</Text>
                </View>
                <Text style={{ fontWeight: '300', color: '#424242', marginTop: 5, marginBottom: 5}}>{'一场奇妙的派对！在这场派对上，女孩是诗是星辰，瑰丽灿烂。想象力真是个美妙的东西啊，达我们所不能达。'}</Text>
                <Text style={{ fontSize: 12, color: '#757575'}}>1个月前</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cellContainer: {
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
    },
})