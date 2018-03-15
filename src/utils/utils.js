import { Alert } from 'react-native';

export function defaultAlert(msg) {
    Alert.alert('提示',
        msg,
        [
            { text: '确认', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false })
}