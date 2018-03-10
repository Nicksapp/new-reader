import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default ListItemHome = () => {
    return (
        <View style={styles.cellContainer}>
            <View style={{ width: 70, height: 70 }}>
                <Image style={{ width: 70, height: 70, borderRadius: 3 }} source={{ uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1520615354536&di=34b4cc89b070209a88a9b7429b5e104b&imgtype=0&src=http%3A%2F%2Fimg.qi-che.com%2Fuploads%2F170123%2F321_135229_1.png' }}></Image>
            </View>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', marginLeft: 10 }}>
                <View style={styles.rowFlex}>
                    <Text style={styles.tag01}>品牌</Text>
                    <Text style={styles.textTitle}>食欲中西简餐</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    {/* <Star /> */}
                    <Text style={[styles.textRed, { marginLeft: 10 }]}>4.4</Text>
                    <Text style={[styles.textGrey, { fontSize: 11, marginLeft: 5, top: 2 }]}>月售516单</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[styles.textGrey, styles.textSizeMid]}>￥30起送 / 配送费￥3 </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.textLightGrey, styles.textSizeMid]}>855m / </Text>
                        <Text style={[styles.textBlue, styles.textSizeMid]}>48分钟</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cellContainer: {
        flexDirection: 'row',
        height: 100,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 5,
        paddingRight: 5,
        borderBottomColor: '#eee',
        borderBottomWidth: .5,
    },
    rowFlex: {
        flexDirection: 'row'
    },
    textRed: {
        color: '#ff6000'
    },
    textGrey: {
        color: '#666'
    },
    textBlue: {
        color: '#3190e8'
    },
    textLightGrey: {
        color: '#999'
    },
    textSizeMid: {
        fontSize: 12
    },
    tag01: {
        color: '#000',
        backgroundColor: '#ffd930',
        fontWeight: '500',
        paddingTop: 1,
        paddingBottom: 1,
        paddingLeft: 3,
        paddingRight: 3,
        marginRight: 3,
    }
})