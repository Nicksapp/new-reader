import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Star from '../components/star'

export default FindItemColumnList = (props) => {
    return (
        <View style={styles.cellContainer}>
            <View style={{ paddingBottom: 10 }}>
                <Text style={{ fontSize: 16 }}>{props.sectionName}</Text>
            </View>

            <View style={styles.itemCard}>
                <View style={{ flex: 1 }}>
                    <Image style={{ width: 70, height: 100, resizeMode: 'cover', borderRadius: 3 }} source={{ uri: 'https://img1.doubanio.com/lpic/s29681469.jpg' }}></Image>
                </View>
                <View style={{ flex: 4, marginLeft: 10 }}>
                    <Text numberOfLines={1} style={{ fontSize: 16, paddingTop: 3, fontWeight: '400' }}>刺杀骑士团长</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Star stars="8.1"/>
                        <Text style={{ fontSize: 11, color: '#616161', marginLeft: 3 }}>8.1</Text>
                    </View>
                    <Text numberOfLines={1} style={{fontSize: 12, color: '#757575', paddingBottom: 5, paddingTop: 5}}>霍达 / 1968 / 北京十月文艺出版社</Text>
                    <View style={{ padding: 8, backgroundColor: '#eeeeee', borderRadius: 3}}>
                        <Text numberOfLines={1} style={{fontSize: 12, color: '#757575'}}>来自豆瓣读书 TOP 250榜单</Text>
                    </View>
                </View>
            </View>
            <View style={styles.itemCard}>
                <View style={{ flex: 1 }}>
                    <Image style={{ width: 70, height: 100, resizeMode: 'cover', borderRadius: 3 }} source={{ uri: 'https://img1.doubanio.com/lpic/s29681469.jpg' }}></Image>
                </View>
                <View style={{ flex: 4, marginLeft: 10 }}>
                    <Text numberOfLines={1} style={{ fontSize: 16, paddingTop: 3, fontWeight: '400' }}>刺杀骑士团长</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Star stars="8.1"/>
                        <Text style={{ fontSize: 11, color: '#616161', marginLeft: 3 }}>8.1</Text>
                    </View>
                    <Text numberOfLines={1} style={{fontSize: 12, color: '#757575', paddingBottom: 5, paddingTop: 5}}>霍达 / 1968 / 北京十月文艺出版社</Text>
                    <View style={{ padding: 8, backgroundColor: '#eeeeee', borderRadius: 3}}>
                        <Text numberOfLines={1} style={{fontSize: 12, color: '#757575'}}>来自豆瓣读书 TOP 250榜单</Text>
                    </View>
                </View>
            </View>
            <View style={styles.itemCard}>
                <View style={{ flex: 1 }}>
                    <Image style={{ width: 70, height: 100, resizeMode: 'cover', borderRadius: 3 }} source={{ uri: 'https://img1.doubanio.com/lpic/s29681469.jpg' }}></Image>
                </View>
                <View style={{ flex: 4, marginLeft: 10 }}>
                    <Text numberOfLines={1} style={{ fontSize: 16, paddingTop: 3, fontWeight: '400' }}>刺杀骑士团长</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Star stars="8.1"/>
                        <Text style={{ fontSize: 11, color: '#616161', marginLeft: 3 }}>8.1</Text>
                    </View>
                    <Text numberOfLines={1} style={{fontSize: 12, color: '#757575', paddingBottom: 5, paddingTop: 5}}>霍达 / 1968 / 北京十月文艺出版社</Text>
                    <View style={{ padding: 8, backgroundColor: '#eeeeee', borderRadius: 3}}>
                        <Text numberOfLines={1} style={{fontSize: 12, color: '#757575'}}>来自豆瓣读书 TOP 250榜单</Text>
                    </View>
                </View>
            </View>
            
            
            
        </View>

    )
}

const styles = StyleSheet.create({
    cellContainer: {
        marginTop: 20,
        marginBottom: 10,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
    },
    itemCard: {
        flex: 1,
        flexDirection: 'row',
        paddingBottom: 15,
        paddingTop: 15,
        borderBottomWidth: .5,
        borderBottomColor: '#e0e0e0'
    }
});