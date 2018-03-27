import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default class NoteEdit extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
              <Text>model</Text>

            </View>
        )
    }

}
NoteEdit.defaultProps = {
    loginState: {},
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingLeft: 20,
        paddingBottom: 20,
        backgroundColor: '#fff',
        flex: 1
    },
    
});

