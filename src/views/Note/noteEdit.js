import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { getCollection, postBookNote } from '../../utils/lib'
import Loading from '../../components/loading'

export default class NoteEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            book_id: '',
            results: [],
            loading: false,
            curItemName: '',
            curItem: {}
        }
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <View style={styles.container}>
                    <ScrollView
                        horizontal={true}
                        automaticallyAdjustContentInsets={false}
                        showsHorizontalScrollIndicator={false}>
                        {
                            this.state.loading ? <Loading /> : (
                                this.state.results.map(item => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setState({
                                                    curItemName: item.title,
                                                    curItem: item
                                                })
                                            }}
                                            key={item.objectId}
                                            activeOpacity={1}>
                                            <View style={{ marginRight: 15, justifyContent: 'center' }}>
                                                <Image style={{ width: 62, height: 62, resizeMode: 'cover', borderRadius: 31, borderWidth: 1, borderColor: '#fff' }} source={{ uri: item.img_url }}></Image>
                                                <Text style={{ width: 62, fontSize: 12, color: '#333', textAlign: 'center' }} numberOfLines={1}>{item.title}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            )
                        }
                    </ScrollView>
                    {
                        this.state.curItemName ? <Text style={{ fontSize: 16, fontWeight: '600', marginTop: 20 }}>{this.state.curItemName}</Text> : (null)
                    }
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

                    <View style={{ marginTop: 20, marginBottom: 20, flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={styles.loginBtn}
                            activeOpacity={1} onPress={() => this.handleSubmitNote()}>
                            <Text style={{ color: '#fff' }}>提交</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
        )
    }

    componentWillMount () {
        const params = this.props.navigation.state.params;
        if (params && params.itemInfo) {
            this.setState({
                curItem: params.itemInfo,
                curItemName: params.itemInfo.title
            })
        }
    }

    componentDidMount() {
        storage.load({
            key: 'loginState'
        }).then(data => {
            this.setState({ loading: true })
            if (data && data.objectId) {
                const user_id = data.objectId;
                getCollection({ user_id }).then(res => {
                    const { results = [] } = res;
                    for (var i = 0; i < results.length; i++) {
                        results[i].key = results[i].objectId
                    }
                    this.setState({
                        results,
                        loading: false
                    })
                })
            }
        }).catch(err => {
            Alert.alert('请登录后再尝试操作！')
            this.setState({ loading: false })
        })
    }

    handleSubmitNote = () => {
        const { goBack } = this.props.navigation;
        let fromData = {
            title: this.state.title,
            content: this.state.content,
            itemInfo: this.state.curItem
        }
        if (!fromData.title || !fromData.content) {
            Alert.alert('存在未填项！');
            return false;
        } else if (!fromData.itemInfo.collection_id) {
            Alert.alert('请选择要记录笔记的图书！');
            return false;
        }

        storage.load({
            key: 'loginState'
        }).then(data => {
            if (data && data.sessionToken) {
                fromData.user_id = data.objectId;
                fromData.username = data.username;
            }
            return fromData;
        }).then(data => {
            postBookNote(data).then(res => {
                if (res && res.objectId) {
                    Alert.alert('笔记记录成功！');
                    goBack();
                }
            }).catch(err => Alert.alert('笔记添加失败，请重新尝试！'))
        }).catch(err => Alert.alert(err))
        
    }

}
NoteEdit.defaultProps = {
    loginState: {},
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff',
    },
    loginBtn: {
        flex: 1,
        backgroundColor: '#0096ff',
        padding: 13,
        alignItems: 'center',
        borderRadius: 5,
    }
});

