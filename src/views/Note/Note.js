import React from 'react';
import { StyleSheet, Text, View, Button, Image, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class NoteView extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render () {
        const width = Dimensions.get('window').width;
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, alignItems: 'flex-start',flexDirection: 'row', flexWrap: 'wrap'}}>
                    <TouchableOpacity activeOpacity={1} onPress={() => navigate('NoteDetail')}>
                        <View style={{width: width/2-20 , backgroundColor: '#fff', padding: 10, margin: 5}}>
                            <Text style={{fontSize: 16, color: '#333', fontWeight: '500'}}>标题标题</Text>
                            <Text style={{ marginTop: 5, color: '#444' }}>分为范围分玩法we分为范围范围分为非非法违法未分为范围分为范围分玩法we分为范围范围分为非非法违法未分为范围分为范围分玩法we分为范围范围分为非非法违法未分为范围分为范围分玩法we分为范围范围分为非非法违法未分为范围</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10}}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Image style={{width: 22, height: 22, borderRadius: 11}} source={{ uri: 'https://img3.doubanio.com/view/note/large/public/p48970612.jpg'}}></Image>
                                    <Text style={{marginLeft: 5, fontSize: 12, color: '#666'}}>喵小姐</Text>
                                </View>
                                <Text style={{ fontSize: 12, color: '#666' }}>2018-03-06</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} onPress={() => navigate('NoteDetail')}>
                        <View style={{width: width/2-20 , backgroundColor: '#fff', padding: 10, margin: 5}}>
                            <Text style={{fontSize: 16, color: '#333', fontWeight: '500'}}>标题标题</Text>
                            <Text style={{ marginTop: 5, color: '#444' }}>分为范围分玩法we分为范围范围分为非非法违法未分为范围分为范围分玩法we分为范围范围分为非非法违法未分为范围分为范围分玩法we分为范围范围分为非非法违法未分为范围分为范围分玩法we分为范围范围分为非非法违法未分为范围</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10}}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Image style={{width: 22, height: 22, borderRadius: 11}} source={{ uri: 'https://img3.doubanio.com/view/note/large/public/p48970612.jpg'}}></Image>
                                    <Text style={{marginLeft: 5, fontSize: 12, color: '#666'}}>喵小姐</Text>
                                </View>
                                <Text style={{ fontSize: 12, color: '#666' }}>2018-03-06</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} onPress={() => navigate('NoteDetail')}>
                        <View style={{width: width/2-20 , backgroundColor: '#fff', padding: 10, margin: 5}}>
                            <Text style={{fontSize: 16, color: '#333', fontWeight: '500'}}>标题标题</Text>
                            <Text style={{ marginTop: 5, color: '#444' }}>分为范围分玩法we分为范围范分为范围分玩法we分为范围范围分为非非法违法未分为范围分为范围分玩法we分为范围范围分为非非法违法未分为范围</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10}}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Image style={{width: 22, height: 22, borderRadius: 11}} source={{ uri: 'https://img3.doubanio.com/view/note/large/public/p48970612.jpg'}}></Image>
                                    <Text style={{marginLeft: 5, fontSize: 12, color: '#666'}}>喵小姐</Text>
                                </View>
                                <Text style={{ fontSize: 12, color: '#666' }}>2018-03-06</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} onPress={() => navigate('NoteDetail')}>
                        <View style={{width: width/2-20 , backgroundColor: '#fff', padding: 10, margin: 5}}>
                            <Text style={{fontSize: 16, color: '#333', fontWeight: '500'}}>标题标题</Text>
                            <Text style={{ marginTop: 5, color: '#444' }}>分为范围分玩法we分为范围范围分为非非法违法未分为范围分为范围分玩法we分为范围范围分为非非法违法未分为范围分为范围</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10}}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Image style={{width: 22, height: 22, borderRadius: 11}} source={{ uri: 'https://img3.doubanio.com/view/note/large/public/p48970612.jpg'}}></Image>
                                    <Text style={{marginLeft: 5, fontSize: 12, color: '#666'}}>喵小姐</Text>
                                </View>
                                <Text style={{ fontSize: 12, color: '#666' }}>2018-03-06</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                   

                </View>
            </View>
        )
    }

}
NoteView.navigationOptions = props => {
    const { navigation } = props;
    return {
        headerRight: (
            <Ionicons
                onPress={() => navigation.navigate('NoteEditModal')}
                name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
                size={28} style={{ color: '#fff', top: 3, fontWeight: '600', marginLeft: 8, marginRight: 10 }} />
        ),
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e6e6e6',
        padding: 10,
    },
});