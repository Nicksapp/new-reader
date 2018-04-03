import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Platform, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Star from '../../components/star'
import { getBookBySearchTag, getMovieBySearchTag } from '../../utils/lib'

export default class LessonFlatItem extends React.PureComponent {
    state = {
        dataList: [],
        fHeight: 0,
        FlatListState: 0,
        curPage: 1,
    }

    _renderItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => this.onItemClick(item.id)}
            style={styles.itemCard} key={item.title}>
            <View style={{ flex: 1 }}>
                <Image style={{ width: 70, height: 100, resizeMode: 'cover', borderRadius: 3 }} source={{ uri: item.images.small }}></Image>
            </View>
            <View style={{ flex: 4, marginLeft: 10 }}>
                <Text numberOfLines={1} style={{ fontSize: 16, paddingTop: 3, fontWeight: '400' }}>{item.title}</Text>
                <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                    <Star stars={item.rating.average} />
                    <Text style={{ fontSize: 11, color: '#616161', marginLeft: 3 }}> 
                        {item.rating.average}
                    </Text>
                </View>
                <View style={{ marginTop: 5, marginBottom: 5 }}>
                    <Text numberOfLines={2} style={{ fontSize: 12, color: '#757575' }}>
                        {item.author || item.directors[0].name} / {item.pubdate || item.year} / {item.publisher || item.casts.map((it, index) => {if (index <= 2) {return it.name+" "}})}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    {
                        item.tags ? (
                            item.tags.slice(0,4).map(it => {
                                return <Text numberOfLines={1} key={it} style={{ fontSize: 11, color: '#757575', paddingTop: 3, paddingBottom: 3, paddingLeft: 10, paddingRight: 10, backgroundColor: '#e6e6e6', marginTop: 5, marginBottom: 5, marginRight: 5, borderRadius: 4 }}>{it.title}</Text>
                            })
                        ) : (
                            item.genres.slice(0,4).map(it => {
                                return <Text numberOfLines={1} key={it} style={{ fontSize: 11, color: '#757575', paddingTop: 3, paddingBottom: 3, paddingLeft: 10, paddingRight: 10, backgroundColor: '#e6e6e6', marginTop: 5, marginBottom: 5, marginRight: 5, borderRadius: 4 }}>{it}</Text>
                            })
                        )
                        
                    }
                </View>
            </View>
        </TouchableOpacity>
    );

    emptyComponent = () => {
        return <View style={{
            height: this.state.fHeight, // 当前 flatlist 高度
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        }}>
            <ActivityIndicator size="small" color="#888888" />
            <Text style={styles.footerText}>数据加载中…</Text>
        </View>
    }

    renderFooter = () => {
        let footer = null;
        if (this.state.FlatListState === 1) {
            footer = (
                <View style={styles.footerStyle}>
                    <ActivityIndicator size="small" color="#888888" />
                    <Text style={styles.footerText}>数据加载中…</Text>
                </View>
            )
        }

        return footer;
    }

    render() {
        return (
            <FlatList
                data={this.state.dataList} extraData={this.state}
                keyExtractor={(item, index) => item.id}
                ItemSeparatorComponent={() => <View style={{
                    height: 1,
                    backgroundColor: '#D6D6D6'
                }} />}
                onLayout={e => {  // 获取当前 flatlist 高度
                    let height = e.nativeEvent.layout.height;
                    if (this.state.fHeight < height) {
                        this.setState({ fHeight: height })
                    }
                }}
                renderItem={this._renderItem}
                ListEmptyComponent={this.emptyComponent} />
        );
    }  

    componentDidMount() {
        this.initData();
    }

    initData() {
        const { name, type } = this.props.navigation.state.params;
        const { goBack } = this.props.navigation;
        if (!name) {
            Alert.alert('查找错误！');
            this.props.navigation.goBack();
            return false;
        }
        switch (type) {
            case 'MOVIE': {
                this._handleFetchMovieData(name);
                break;
            }
            case 'BOOK': {
                this._handleFetchBookData(name);
                break;
            }
            default: {
                Alert.alert('暂不支持此类详情的访问！');
                goBack();
            }
        }

    }

    _handleFetchMovieData = (name) => {
        getMovieBySearchTag(name).then(res => {
            if (!res) {
                Alert.alert('查找错误！');
                this.props.navigation.goBack();
            } else {
                this.setState({
                    dataList: res.subjects
                })
            }
        })
    }

    _handleFetchBookData = (name) => {
        getBookBySearchTag(name).then(res => {
            if (!res) {
                Alert.alert('查找错误！');
                this.props.navigation.goBack();
            } else {
                this.setState({
                    dataList: res.books
                })
            }
        })
    }

    onItemClick = (id) => {
        if (!id) {
            return;
        }
        const { type } = this.props.navigation.state.params;
        const { navigate } = this.props.navigation;
        navigate('ItemDetaillView', { id, type })
    }
}

const styles = StyleSheet.create({
    cellContainer: {
        marginTop: 20,
        marginBottom: 10,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
    },
    itemCard: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingBottom: 15,
        paddingTop: 15,
        borderBottomWidth: .3,
        borderBottomColor: '#e0e0e0',
        backgroundColor: '#fff'
    },
    footerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        height: 44,
    },
    footerText: {
        fontSize: 14,
        color: '#555555',
        marginLeft: 7
    },
});