import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import ProfileHeader from './profileHeader'
import ProfileActionList from './profileActionList'

export default class ProfileView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <ScrollView style={styles.mainSection}>
                    <ProfileHeader />
                    <ProfileActionList 
                        onNavigatorClick={(page) => navigate(page)} />
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {  
        backgroundColor: '#f5f5f5',
        flex: 1
    },
    mainSection: {
        flex: 1
    }
});