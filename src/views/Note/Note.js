import React from 'react';
import { StyleSheet, Text, View, Button, Image, Dimensions, Platform, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getBookNote } from '../../utils/lib'

import Loading from '../../components/loading'

export default class NoteView extends React.Component {
    constructor() {
        super();
        this.state = {
            noteData: [],
            loading: false,
            isRefreshing: false,
        }
    }

    render () {
        const width = Dimensions.get('window').width;
        const { navigate } = this.props.navigation;

        if (this.state.loading) {
            return (
                <Loading />
            )
        } else {
            return (
                <View style={styles.container}>
                    <ScrollView
                        scrollEventThrottle={100}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this._onRefresh}
                                colors={['#666666']}
                                tintColor="#666666"
                                title="loading..."
                                titleColor="#666666"
                                progressBackgroundColor="white"
                            />
                        }>  
                        <View style={{ flex: 1, alignItems: 'flex-start',flexDirection: 'row', flexWrap: 'wrap'}}>
                        {
                            this.state.noteData.map(item => {
                                return (
                                    <TouchableOpacity key={item.objectId} activeOpacity={1} onPress={() => this.handleToViewNote(item)}>
                                        <View style={{width: width/2-20 , backgroundColor: '#fff', padding: 10, margin: 5}}>
                                            <Text style={{fontSize: 16, color: '#333', fontWeight: '500'}}>{item.title}</Text>
                                            <Text style={{ marginTop: 5, color: '#444' }}>{item.content}</Text>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10}}>
                                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                    <Image style={{ width: 22, height: 22, borderRadius: 11 }} source={{ uri: item.itemInfo.img_url }}></Image>
                                                    <Text style={{ marginLeft: 5, fontSize: 12, color: '#666', width: 60 }} numberOfLines={1}>{item.itemInfo.title}</Text>
                                                </View>
                                                <Text style={{ fontSize: 12, color: '#666' }}>{item.username}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                        </View>
                    </ScrollView>
                </View>
            )
        }

        
    }

    componentWillMount() {
        this.initData();
    }

    initData() {
        this.setState({
            loading: true
        })
        getBookNote().then(res => {
            if (res && res.results) {
                this.setState({
                    noteData: res.results,
                    loading: false,
                })
            } else {
                this.setState({loading: false})
            }
        }).catch(err => { this.setState({ loading: false })})
    }

    _onRefresh = () => {
        this.setState({ isRefreshing: true})
        getBookNote().then(res => {
            if (res && res.results) {
                this.setState({
                    noteData: res.results,
                    isRefreshing: false,
                })
            } else {
                this.setState({ isRefreshing: false })
            }
        }).catch(err => { this.setState({ isRefreshing: false }) })
    }

    handleToViewNote = (dataSource) => {
        const { navigate } = this.props.navigation;
        navigate('NoteDetail', { dataSource })
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