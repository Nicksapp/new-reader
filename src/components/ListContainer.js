import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropType from 'prop-types';

export default ListContainer = (props) => {
    return(
        <View style={styles.listWrapper}>
            <View style={styles.listHeader}>
                <Text style={styles.sectionTitle}>{props.listTitle}</Text>
            </View>
            {props.children}
        </View>
    )
}
ListContainer.propTypes = {
    listTitle: PropType.string
}

const styles = StyleSheet.create({
    listWrapper: {
        marginBottom: 10,
        backgroundColor: '#fff'
    },
    listHeader: {
        borderLeftWidth: 4,
        borderLeftColor: '#0096ff',
        marginTop: 15,
    },
    sectionTitle: {
        marginLeft: 15,
        fontSize: 18
    }
})