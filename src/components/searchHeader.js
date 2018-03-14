import React from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class SearchHeader extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <View style={[styles.searchWrapper, styles.center]}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TouchableOpacity activeOpacity={1} onPress={this.props.onSearchClick} style={[styles.textInput, styles.center]}>
                        <Ionicons 
                            name="ios-search-outline" 
                            size={24} style={{ color: '#bdbdbd', top: 1, marginRight: 3 }} />
                        <Text style={{ color: '#333' }}>影片 图书 唱片等</Text>
                    </TouchableOpacity>
                    <Ionicons
                        onPress={this.props.onScanClick}
                        style={styles.center}
                        name={Platform.OS === 'ios' ? 'ios-qr-scanner' : 'md-qr-scanner'}
                        size={26} style={{ color: '#fff', top: 3, marginLeft: 8 }} />
                </View>
            </View>
        )
    } 
}

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchWrapper: {
        flexDirection: 'row',
        paddingTop: 30,
        paddingBottom: 8,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#0096ff'
    },
    textInput: {
        flexDirection: 'row',
        flex: 4,
        height: 30,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingLeft: 10
    },
});