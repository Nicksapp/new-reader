import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default DemoView = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>DemoView</Text>
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