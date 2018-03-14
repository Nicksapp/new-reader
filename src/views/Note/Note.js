import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

export default NoteView = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>NoteView</Text>
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