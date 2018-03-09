import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

export default HomeView = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>HomeView</Text>
        </View>
    )
}

HomeView.navigationOptions = props => {
    const { navigation } = props;
    return {
        headerRight: (
            <Text
                style={styles.headerRight}
                onPress={() =>
                    navigation.navigate('ScanView')
                }
            > 扫描 </Text>
        ),
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerRight: {
        color: '#fff',
    }
});