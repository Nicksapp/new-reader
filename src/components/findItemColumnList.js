import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import PropType from 'prop-types';
import Star from '../components/star'

export default FindItemColumnList = (props) => {
    return (
        <View style={styles.cellContainer}>
            <View style={{ paddingBottom: 10 }}>
                <Text style={{ fontSize: 16 }}>{props.sectionName}</Text>
            </View>
            {
                props.source.map(item => {
                    return(
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => props.onItemClick(item.id)}
                            style={styles.itemCard} key={item.id}>
                            <View style={{ flex: 1 }}>
                                <Image style={{ width: 70, height: 100, resizeMode: 'cover', borderRadius: 3 }} source={{ uri: item.images.small }}></Image>
                            </View>
                            <View style={{ flex: 4, marginLeft: 10 }}>
                                <Text numberOfLines={1} style={{ fontSize: 16, paddingTop: 3, fontWeight: '400' }}>{item.title}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Star stars={item.rating.average}/>
                                    <Text style={{ fontSize: 11, color: '#616161', marginLeft: 3 }}>{item.rating.average}</Text>
                                </View>
                                <Text numberOfLines={1} style={{ fontSize: 12, color: '#757575', paddingBottom: 5, paddingTop: 5 }}>{item.directors ? item.directors[0].name : item.author[0]} / {item.year || item.pubdate} / {item.casts ? item.casts.map(it => it.name + ' ') : item.publisher}</Text>
                                <View style={{ padding: 8, backgroundColor: '#eeeeee', borderRadius: 3}}>
                                    <Text numberOfLines={1} style={{ fontSize: 12, color: '#757575' }}>{props.sectionName}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })
            }
            
            
        </View>

    )
}
FindItemColumnList.propTypes = {
    sectionName: PropType.string,
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
        borderBottomWidth: .5,
        borderBottomColor: '#e0e0e0'
    }
});