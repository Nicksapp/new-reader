import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Platform, FlatList, ActivityIndicator } from 'react-native';
import { WebBrowser } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import PropType from 'prop-types';

import { getMoocList } from '../utils/lib'

export default class LessonFlatItem extends React.PureComponent {
    state = {
        dataList: [],
        isRefreshing: false,
        fHeight: 0,
        FlatListState: 0,
        curPage: 1,
    }

    _renderItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => this.onItemClick(item.href)}
            style={styles.itemCard} key={item.title}>
            <View style={{ flex: 1 }}>
                <Image style={{ width: 70, height: 100, resizeMode: 'cover', borderRadius: 3 }} source={{ uri: 'https:' + item.image }}></Image>
            </View>
            <View style={{ flex: 4, marginLeft: 10 }}>
                <Text numberOfLines={1} style={{ fontSize: 16, paddingTop: 3, fontWeight: '400' }}>{item.title}</Text>
                <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                    <Text style={{ fontSize: 11, color: '#616161', }}>{item.level}</Text>
                    <Text style={{ fontSize: 11, color: '#616161', marginLeft: 3 }}> <Ionicons name={Platform.OS === 'ios' ? `ios-person` : 'md-person'} size={12} style={{ color: '#616161', paddingRight: 5 }} />{item.people_num}</Text>
                </View>
                <View style={{ marginTop: 5, marginBottom: 5 }}>
                    <Text numberOfLines={2} style={{ fontSize: 12, color: '#757575' }}>{item.dsc}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    {
                        item.tag.map(it => {
                            return <Text numberOfLines={1} key={it} style={{ fontSize: 11, color: '#757575', paddingTop: 3, paddingBottom: 3, paddingLeft: 10, paddingRight: 10, backgroundColor: '#e6e6e6', marginTop: 5, marginBottom: 5, marginRight: 5, borderRadius: 4 }}>{it}</Text>
                        })
                    }
                </View>
            </View>
        </TouchableOpacity>
    );

    emptyComponent = () => {
        return <View style={{
            height: this.state.fHeight, // 当前 flatlist 高度
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Text style={{
                fontSize: 16,
                color: '#666',
            }}>暂无数据</Text>
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
                refreshing={this.state.isRefreshing}
                onRefresh={() => this._onRefresh()}
                keyExtractor={(item, index) => item.href}
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
                onEndReached={() => this._onEndReached()}
                onEndReachedThreshold={0.1}
                renderItem={this._renderItem}
                ListFooterComponent={this.renderFooter}
                ListEmptyComponent={this.emptyComponent} />
        );
    }

    componentDidMount() {
        if (this.state.FlatListState === 0) {
            storage.load({
                key: 'lessonData'
            }).then(data => {
                if (data && data.lessonList && data.lessonList.length) {
                    this.setState({dataList: data.lessonList})
                } else {
                    this._onRefresh();
                }
            }).catch(err => this._onRefresh());
        }
    }

    _onRefresh = () => {
        getMoocList(1).then(res => {
            if (!res) {
                alertDefault('网络请求异常！');
                this.setState({ isRefreshing: false })
                return false;
            }
            this.setState({
                dataList: res
            })
            storage.save({
                key: 'lessonData',
                data: {
                    lessonList: res
                },
                expires: 1000 * 3600 * 24 * 3
            })
        }).then(() => {
            this.setState({ 
                FlatListState: 1,
                curPage: 1
            })
        })
    }

    _onEndReached = () => {
        if (this.state.FlatListState === 1) {
            getMoocList(this.state.curPage+1).then(res => {
                if (!res) {
                    alertDefault('网络请求异常！');
                    this.setState({ isRefreshing: false })
                    return false;
                }
                this.setState({
                    dataList: this.state.dataList.concat(res),
                    curPage: this.state.curPage + 1
                })
            }).catch(err => {console.log(err)})
        }
    }

    onItemClick = (href) => {
        if (!href) {
            return;
        }
        WebBrowser.openBrowserAsync(href)
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
        borderBottomColor: '#eee',
        borderBottomWidth: .5,
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