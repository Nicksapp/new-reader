import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SectionList, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getCollection, getBookNoteByUser, deleteCollection, deleteNote } from '../../utils/lib'
import Loading from '../../components/loading'

export default class Collection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            source: [{
                key: 'a',
                data: [],
            }],
            loading: false,
       }
    }

    _renderItem = (section) => {
        const { navigate } = this.props.navigation;
        return (
            <TouchableOpacity
                onPress={() => this.handleToViewInfo(section.item)}
                onLongPress={() => this.handleToDeleteItem(section.item)}
                activeOpacity={1}
                style={styles.cellContainer}
                key={section.item.collection_id}>
                <View style={styles.cellPart}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={{ width: 42, height: 24, resizeMode: 'contain' }} source={{ uri: section.item.img_url}}></Image>
                        <Text style={{ marginLeft: 15, lineHeight: 24, fontSize: 16}}>{section.item.title}</Text>
                    </View>
                    <Ionicons
                        name={Platform.OS === 'ios'
                            ? `ios-arrow-forward`
                            : 'md-arrow-dropright'}
                        size={26}
                        style={{ color: "#dddee1", marginRight: 15 }}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>
            {
                this.state.loading ? (<Loading />) : (
                    <SectionList
                        renderItem={this._renderItem}
                        sections={this.state.source} />
                )
            }
                
            </View>
        )
    }
    componentDidMount() {
        this.initData();
    }
    initData() {
        const { title } = this.props.navigation.state.params;
        
        switch (title) {
            case '收藏': {
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
                            const source = [{
                                key: 'a',
                                data: results
                            }]
                            this.setState({
                                source,
                                loading: false
                            })
                        })
                    }
                }).catch(err => {
                    Alert.alert('请登录后再尝试操作！')
                    this.setState({ loading: false })
                })
                break;
            }
            case '笔记': {
                storage.load({
                    key: 'loginState'
                }).then(data => {
                    this.setState({ loading: true })
                    if (data && data.objectId) {
                        const user_id = data.objectId;
                        getBookNoteByUser({ user_id }).then(res => {
                            const { results = [] } = res;
                            for (var i = 0; i < results.length; i++) {
                                results[i].key = results[i].objectId
                                results[i].collection_id = results[i].itemInfo.collection_id
                                results[i].img_url = results[i].itemInfo.img_url
                                results[i].type = results[i].itemInfo.type
                            }
                            const source = [{
                                key: 'a',
                                data: results
                            }]
                            this.setState({
                                source,
                                loading: false
                            })
                        })
                    }
                }).catch(err => {
                    Alert.alert('请登录后再尝试操作！')
                    this.setState({ loading: false })
                })
                break;
            }
            default: this.setState({ loading: false });
        }
    }

    handleToViewInfo = (dataSource) => {
        const { title } = this.props.navigation.state.params;
        const { navigate } = this.props.navigation;
        switch(title) {
            case '收藏': navigate('ItemDetaillView', { id: dataSource.collection_id, type: dataSource.type === 'BOOK' ? 'BOOK' : 'MOVIE' }); break;
            case '笔记': navigate('NoteDetail', { dataSource }); break;

        }
    
    }

    handleToDeleteItem = (dataSource) => {
        if (!dataSource) {
            return false;
        }
        const { title } = this.props.navigation.state.params;
        switch(title) {
            case '收藏': {
                Alert.alert(
                    '删除提示',
                    '是否确认删除该收藏？',
                    [
                        { text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                        { text: '确认', onPress: () => {
                            deleteCollection(dataSource.objectId).then(res=>{
                                this.initData();
                            }).catch(err => {
                                alert(err)
                            })
                        } },
                    ],
                    { cancelable: false }
                )
                break;
            }
            case '笔记': { //deleteNote
                Alert.alert(
                    '删除提示',
                    '是否确认删除该笔记？',
                    [
                        { text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                        {
                            text: '确认', onPress: () => {
                                deleteNote(dataSource.objectId).then(res => {
                                    this.initData();
                                }).catch(err => {
                                    alert(err)
                                })
                            }
                        },
                    ],
                    { cancelable: false }
                )
                break;
            }
        }
    }
}

Collection.navigationOptions = props => {
    const { navigation } = props;
    const { title } = props.navigation.state.params;
    return {
        title
    };
}


const styles = StyleSheet.create({
    cellContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingTop: 15,
        paddingLeft: 20,
        flex: 1
    },
    cellPart: {
        borderBottomWidth: 1,
        borderBottomColor: '#e9eaec',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        paddingBottom: 10,
    }
})