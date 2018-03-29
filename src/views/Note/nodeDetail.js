import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';

export default class NoteDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: {},
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text style={{fontSize: 24, fontWeight: '600', color: '#333'}}>{this.state.dataSource.title}</Text>
                    <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 20}}>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => this.handleToViewInfo()}>
                            <Image style={{ width: 48, height: 48, resizeMode: 'cover', borderRadius: 24, borderWidth: 1, borderColor: '#fff' }} source={{ uri: this.state.dataSource.itemInfo.img_url }}></Image>
                        </TouchableOpacity>
                        <View style={{flex: 6, justifyContent: 'center', marginLeft: 10}}>
                            <Text>{this.state.dataSource.itemInfo.title}</Text>
                            <Text>{this.state.dataSource.username} <Text style={{fontSize: 13, color: '#666'}}>的心得笔记</Text></Text>
                            <Text style={{ fontSize: 12, color: '#666' }}>{this.state.dataSource.createdAt.slice(0, 10)}</Text>
                        </View>
                    </View>
                    <Text style={{ fontSize: 16, color: '#333', lineHeight: 24 }}>{this.state.dataSource.content}</Text>
                </ScrollView>
                

            </View>
        )
    }

    componentWillMount() {
        this.initData();
    }

    initData() {
        const { dataSource } = this.props.navigation.state.params;
        const { goBack } = this.props.navigation;
        if (!dataSource) {
            Alert.alert('请求错误了！');
            this.props.navigation.goBack();
            return false;
        }
        this.setState({
            dataSource: Object.assign({}, dataSource)
        })
    }

    handleToViewInfo = () => {
        const { navigate } = this.props.navigation;
        const id = this.state.dataSource.itemInfo.collection_id;
        const type = this.state.dataSource.itemInfo.type;
        navigate('ItemDetaillView', { id, type: type === 'BOOK' ? 'BOOK' : 'MOVIE' })
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flex: 1
    },

});

