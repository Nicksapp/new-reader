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
                {props.source.map(item => {
                    return (
                        <TouchableOpacity 
                            activeOpacity={1}
                            onPress={() => props.onItemClick(item.id)}
                            style={styles.itemCard} key={item.id}>
                            <View style={{ flex: 6 }}>
                                <Image style={{ flex: 1, resizeMode: 'cover', borderRadius: 3 }} source={{ uri: item.images.small }}></Image>
                            </View>
                            <View>
                                <Text numberOfLines={1} style={{ fontSize: 12, paddingTop: 3, fontWeight: '400' }}>{item.title}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Star stars={item.rating.average} />
                                    <Text style={{ fontSize: 11, color: '#616161', marginLeft: 3 }}>{item.rating.average}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
        
    )
}
FindItemList.defaultProps = {
    source: [],
};

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