import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PropType from 'prop-types';

export default ListItemHome = (props) => {
    return (
        <TouchableOpacity activeOpacity={1} onPress={props.onListClick}>
            <View style={styles.cellContainer}>
                <View style={styles.rowFlex}>
                    <View style={{ flex: 3 }}>
                        <Text style={styles.mainTitle}>{props.mainTitle}</Text>
                        <Text style={styles.descTitle} numberOfLines={2}>{props.descTitle}</Text>
                    </View>
                    <View style={{ flex: 1, marginLeft: 12, justifyContent: 'space-between' }}>
                    {
                        props.imgUrl ? (<Image style={{ resizeMode: 'contain', flex: 1 }} source={{ uri: props.imgUrl }}></Image>) : (null)
                    }
                    </View>
                </View>
                <View style={[styles.rowFlex, styles.spaceBetween, styles.bottomSection]}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image style={{width: 24, height: 24, borderRadius:12}} source={{uri: props.authorImage}}></Image>
                        <Text style={styles.bottomText}>{props.author}</Text>
                    </View>
                    
                    <Text style={styles.bottomText}>{props.label}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
ListItemHome.propTypes = {
    onListClick: PropType.func,
    mainTitle: PropType.string,
    descTitle: PropType.string,
    imgUrl: PropType.string,
    author: PropType.string,
    authorImage: PropType.string,
    label: PropType.string
}

const styles = StyleSheet.create({
    cellContainer: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomColor: '#eee',
        borderBottomWidth: .5,
    },
    rowFlex: {
        flexDirection: 'row'
    },
    spaceBetween: {
        justifyContent: 'space-between'
    },
    mainTitle: {
        fontSize: 20,
        fontWeight: '400',
        color: '#000',
        marginBottom: 5
    },
    descTitle: {
        fontWeight: '300',
        color: '#666',
        lineHeight: 24
    },
    bottomSection: {
        marginTop: 5,
        alignItems: 'center'
    },
    bottomText: {
        color: '#999',
        fontWeight: '200',
        marginLeft: 5
    },
})