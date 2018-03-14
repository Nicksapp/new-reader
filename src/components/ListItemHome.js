import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

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
                        <Image style={{ resizeMode: 'contain', flex: 1 }} source={{ uri: props.imgUrl }}></Image>
                    </View>
                </View>
                <View style={[styles.rowFlex, styles.spaceBetween, styles.bottomSection]}>
                    <Text style={styles.bottomText}>作者: {props.author}</Text>
                    <Text style={styles.bottomText}>{props.label}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
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
        marginTop: 5
    },
    bottomText: {
        color: '#999',
        fontWeight: '200'
    },
})