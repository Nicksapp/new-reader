import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PropType from 'prop-types';

export default SearchCell = (props) => {
    return (
        <TouchableOpacity activeOpacity={1} onPress={props.data.onListClick}>
            <View style={styles.cellContainer}>
                <Image style={{flex: 1}} source={{ uri: props.data.image }} ></Image>
                <View style={{flex: 8, marginLeft: 10}}>
                    <Text>{props.data.title}</Text>
                    <Text>{props.data.subtitle}</Text>
                    <Text>{props.data.rating.average}分/{props.data.author[0]}/{props.data.pubdate}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
SearchCell.propTypes = {
    data: PropType.object.isRequired
}

const styles = StyleSheet.create({
    cellContainer: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        flexDirection: 'row',
    }
})