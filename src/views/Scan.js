import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

export default class ScanView extends React.Component {
    constructor() {
        super();
        this.state = {
            hasCameraPermission: null,
        }
    }
    
    render() {
        
        return (
            <View style={styles.container}>
                {this.state.hasCameraPermission === null ?
                    <Text>Requesting for camera permission</Text> :
                    this.state.hasCameraPermission === false ?
                        <Text>Camera permission is not granted</Text> :
                        <BarCodeScanner
                            onBarCodeRead={this._handleBarCodeRead}
                            style={{ height: 240, width: 240 }}
                        />
                }
            </View>
        )
    } 
    
    componentDidMount() {
        this._requestCameraPermission();
    }

    _requestCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted',
        });
    };

    _handleBarCodeRead = data => {
        const { navigation } = this.props;
        Alert.alert(
            'Scan successful!',
            JSON.stringify(data)
        );
        navigation.pop();
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#303133',
        alignItems: 'center',
        justifyContent: 'center',
    },
});