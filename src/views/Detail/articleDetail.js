import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default class Detail extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View>
                <ScrollView>
                    <Text>Detail</Text>
                </ScrollView>
            </View>
        )
    }
}