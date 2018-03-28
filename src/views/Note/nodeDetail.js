import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default class NoteDetail extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={{fontSize: 24, fontWeight: '600', color: '#333'}}>第116页 | 互相交换各自的碎片</Text>
                    <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 20}}>
                        <View style={{flex: 1}}>
                            <Image style={{ width: 48, height: 48, resizeMode: 'cover', borderRadius: 24, borderWidth: 1, borderColor: '#fff' }} source={{ uri: 'https://img3.doubanio.com/view/note/large/public/p48970612.jpg' }}></Image>
                        </View>
                        <View style={{flex: 6, justifyContent: 'center'}}>
                            <Text>影随英东 <Text style={{fontSize: 13, color: '#666'}}>的读书笔记</Text></Text>
                            <Text style={{fontSize: 12, color: '#666'}}>2018-02-05</Text>
                        </View>
                    </View>
                    <Text style={{fontSize: 16, color: '#333', lineHeight: 24}}>我是这样认为的，需要我是这样认为的，需要我是这样认为的，需要我是这样认为的，需要我是这样认为的，需要我是这样认为的，需要我是这样认为的，需要我是这样认为的，需要我是这样认为的，需要我是这样认为的，需要</Text>
                </View>
                

            </View>
        )
    }

}
NoteDetail.defaultProps = {
    loginState: {},
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flex: 1
    },

});

