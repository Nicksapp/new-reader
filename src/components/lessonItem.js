import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropType from 'prop-types';

export default LessonItem = (props) => {
    return (
        <ScrollView style={styles.cellContainer}>
            {
                props.source.map(item => {
                    return (
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => props.onItemClick(item.href)}
                            style={styles.itemCard} key={item.title}>
                            <View style={{ flex: 1 }}>
                                <Image style={{ width: 70, height: 100, resizeMode: 'cover', borderRadius: 3 }} source={{ uri: 'https:'+item.image }}></Image>
                            </View>
                            <View style={{ flex: 4, marginLeft: 10 }}>
                                <Text numberOfLines={1} style={{ fontSize: 16, paddingTop: 3, fontWeight: '400' }}>{item.title}</Text>
                                <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                                    <Text style={{ fontSize: 11, color: '#616161', }}>{item.level}</Text>
                                    <Text style={{ fontSize: 11, color: '#616161', marginLeft: 3 }}> <Ionicons name={Platform.OS === 'ios' ? `ios-person-outline` : 'md-person'} size={11} style={{ color: '#616161', paddingRight: 5 }}/>{item.people_num}</Text>
                                </View>
                                <View style={{ marginTop: 5, marginBottom: 5}}>
                                    <Text numberOfLines={2} style={{ fontSize: 12, color: '#757575' }}>{item.dsc}</Text>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    {
                                        item.tag.map(it => {
                                            return <Text numberOfLines={1} key={it} style={{ fontSize: 11, color: '#757575', paddingTop: 3, paddingBottom: 3, paddingLeft: 10, paddingRight: 10, backgroundColor: '#e6e6e6', marginTop: 5, marginBottom: 5, marginRight: 5, borderRadius: 4 }}>{it}</Text>
                                        })
                                    }
                                </View>
                                
                            </View>
                        </TouchableOpacity>
                    )
                })
            }


        </ScrollView>

    )
}
LessonItem.propTypes = {
    source: PropType.array
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
        flex: 1,
        flexDirection: 'row',
        paddingBottom: 15,
        paddingTop: 15,
        borderBottomColor: '#eee',
        borderBottomWidth: .5,
    }
});