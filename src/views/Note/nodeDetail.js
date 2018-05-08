import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';

import { modifyBookNote } from '../../utils/lib'

export default class NoteDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: {},
            title: '',
            content: '',
            modalVisible: false,
            isAuthor: false
        }
    }

    render() {
        
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={{fontSize: 24, fontWeight: '600', color: '#333'}}>{this.state.dataSource.title}</Text>
                        {
                            this.state.isAuthor ? (
                                <TouchableOpacity
                                    style={{ marginRight: 10 }}
                                    onPress={() => { this.setState({ 
                                        modalVisible: true,
                                        title: this.state.dataSource.title,
                                        content: this.state.dataSource.content
                                    }) }}>
                                    <Text style={{ fontSize: 16, color: '#666' }}>编辑</Text>
                                </TouchableOpacity>
                            ) : (null)
                        }
                       
                    </View>
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
                
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { this.setState({ modalVisible: false }); }}
                >
                    <View style={{
                        marginTop: 122,
                        paddingLeft: 20,
                        paddingRight: 20,
                    }}>
                        <TextInput
                            style={{ marginTop: 20, height: 40, borderColor: '#e6e6e6', borderWidth: 1, borderRadius: 3, paddingLeft: 10 }}
                            value={this.state.title}
                            onChangeText={(title) => this.setState({ title })}
                            multiline={false}
                            placeholder="笔记标题"
                            underlineColorAndroid="transparent"></TextInput>
                        <TextInput
                            style={{ marginTop: 20, paddingTop: 10, paddingBottom: 10, height: 180, borderColor: '#e6e6e6', borderWidth: 1, borderRadius: 3, paddingLeft: 10, textAlignVertical: 'top' }}
                            value={this.state.content}
                            onChangeText={(content) => this.setState({ content })}
                            multiline={true}
                            placeholder="笔记内容"
                            underlineColorAndroid="transparent"></TextInput>

                        <View style={{ marginTop: 20, marginBottom: 10, flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={styles.loginBtn}
                                activeOpacity={1} onPress={() => this.handleModifyNote()}>
                                <Text style={{ color: '#fff' }}>提交</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={styles.cancelBtn}
                                activeOpacity={1} onPress={() => this.closeModel()}>
                                <Text style={{ color: '#fff' }}>取消</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }

    componentWillMount() {
        const { dataSource } = this.props.navigation.state.params;

        this.initData();

        storage.load({
            key: 'loginState'
        }).then(data => {
            if (data && data.sessionToken) {
                if (data.objectId === dataSource.user_id) {
                    this.setState({isAuthor: true})
                }
            }
        }).catch(err => console.log(err))
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

    handleModifyNote = () => {
        const { dataSource } = this.props.navigation.state.params;
        const { navigate } = this.props.navigation;

        if (!dataSource || !dataSource.objectId) {
            return false;
        }
        let postData = {
            title: this.state.title,
            content: this.state.content
        }

        modifyBookNote(postData, dataSource.objectId).then(res => {
            if (res && res.objectId) {
                alert('修改成功！');
                this.setState({
                    modalVisible: false
                })
            }
        }).catch(err => {
            console.log(err)
        })
    } 
    closeModel = () => {
        this.setState({
            modalVisible: false
        })
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flex: 1
    },
    loginBtn: {
        flex: 1,
        backgroundColor: '#0096ff',
        padding: 13,
        alignItems: 'center',
        borderRadius: 5,
    },
    cancelBtn: {
        flex: 1,
        backgroundColor: '#d5d5d5',
        padding: 13,
        alignItems: 'center',
        borderRadius: 5,
    }
});

