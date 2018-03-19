import React, { Component } from 'react';
import {
    View,
    Text,
    ProgressBarAndroid,
    Modal,
    StyleSheet,
    ActivityIndicator,
    Platform
} from 'react-native';

export default class Loading extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render() {

        return (
            <Modal
                transparent={true}
                onRequestClose={() => this.onRequestClose()}
            >
                <View style={styles.loadingBox}>
                    {
                        Platform.OS === 'ios' ? (
                            <ActivityIndicator color='#fafafa' size="large" />
                        ) : (
                            <ProgressBarAndroid styleAttr='Inverse' color='#fafafa' />
                        )
                    }
                </View>
            </Modal>
        );
    }

}


const styles = StyleSheet.create({
    loadingBox: { // Loading居中
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 半透明
    }
});
