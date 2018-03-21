import React from 'react';
import { StyleSheet, Text, View, Alert, Dimensions } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { WebBrowser } from 'expo';

import { getBookByISBN } from '../utils/lib'

export default class ScanView extends React.Component {
    constructor() {
        super();
        this.state = {
            hasCameraPermission: null,
            flag: 0,
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
                            style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width}}
                        />
                }
            </View>
        )
    } 
    
    componentWillMount() {
        this.setState({flag: 0})
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

    _handleBarCodeRead = response => {
        if (!this.state.flag) {
            const { navigation } = this.props;
            const { type, data, target } = response;
            
            switch (type) {
                case 'org.iso.QRCode': { // 二维码
                    navigation.pop();
                    WebBrowser.openBrowserAsync(data);
                    break;
                }
                case 'org.gs1.EAN-13': { // 条形码
                    navigation.pop();
                    this.handleFetchBookByIsbn(data);
                    break;
                }
                case 'org.iso.Code39': { // 条形码
                    navigation.pop();
                    this.handleFetchBookByIsbn(data);
                    break;
                }
                default:
                    Alert.alert(
                        '暂不支持此类条码扫描，请更换其他条码尝试',
                        JSON.stringify(response)
                    );
                    this.setState({flag: 0})
            }
            this.setState({flag: 1})
        }
    };

    handleFetchBookByIsbn = (isbn) => {
        const { navigation } = this.props;

        getBookByISBN(isbn).then(res => {
            if (res && res.id) {
                navigation.navigate('ItemDetaillView', { id: res.id, type: 'BOOK' })
            } else {
                Alert.alert(
                    '查无项目, 请更换条形码'
                );
            }
        }).catch(err => {
            Alert.alert(
                '查无项目, 请更换条形码'
            );
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
});