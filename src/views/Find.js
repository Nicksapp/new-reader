import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

export default FindView = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>FindView</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});