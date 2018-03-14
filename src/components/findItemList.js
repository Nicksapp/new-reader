import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Star from '../components/star'

export default FindItemList = (props) => {
    return (
        <View style={styles.cellContainer}>
            <View style={{paddingBottom: 10}}>
                <Text style={{ fontSize: 16 }}>{props.sectionName}</Text>
            </View>
            <ScrollView
                horizontal={true}
                automaticallyAdjustContentInsets={false}
                showsHorizontalScrollIndicator={false}>
                
                <View style={styles.itemCard}>
                    <View style={{flex: 6}}>
                        <Image style={{ flex: 1, resizeMode: 'cover', borderRadius: 3}} source={{ uri: 'https://img1.doubanio.com/lpic/s29681469.jpg'}}></Image>
                    </View>
                    <View>
                        <Text numberOfLines={1} style={{fontSize: 12, paddingTop: 3, fontWeight: '400'}}>刺杀骑士团长</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Star stars="8.1"/>
                            <Text style={{ fontSize: 11, color: '#616161', marginLeft: 3 }}>8.1</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.itemCard}>
                    <View style={{flex: 6}}>
                        <Image style={{ flex: 1, resizeMode: 'cover', borderRadius: 3}} source={{ uri: 'https://img1.doubanio.com/lpic/s29681469.jpg'}}></Image>
                    </View>
                    <View>
                        <Text numberOfLines={1} style={{fontSize: 12, paddingTop: 3, fontWeight: '400'}}>刺杀骑士团长</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Star stars="8.1"/>
                            <Text style={{ fontSize: 11, color: '#616161', marginLeft: 3 }}>8.1</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.itemCard}>
                    <View style={{flex: 6}}>
                        <Image style={{ flex: 1, resizeMode: 'cover', borderRadius: 3}} source={{ uri: 'https://img1.doubanio.com/lpic/s29681469.jpg'}}></Image>
                    </View>
                    <View>
                        <Text numberOfLines={1} style={{fontSize: 12, paddingTop: 3, fontWeight: '400'}}>刺杀骑士团长</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Star stars="8.1"/>
                            <Text style={{ fontSize: 11, color: '#616161', marginLeft: 3 }}>8.1</Text>
                        </View>
                    </View>
                </View>
                
                
                
            </ScrollView>
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
        width: 90,
        height: 150,
        marginRight: 10,
    }
});