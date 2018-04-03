import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';

export default class DemoView extends React.PureComponent {
    state = {
        dataList: [],
        isRefreshing: false,
        fHeight: 0,
        FlatListState: 0,
    }

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
        if (this.state.FlatListState === 2) {
            footer = (
                <View style={styles.footerStyle}>
                    <ActivityIndicator size="small" color="#888888" />
                    <Text style={styles.footerText}>数据加载中…</Text>
                </View>
            )
        }
        
        return footer;
    }

    componentDidMount() {
        if (this.state.FlatListState === 0) {
            this._onRefresh();
            this.setState({FlatListState: 1})
        } 
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.dataList} extraData={this.state}
                    refreshing={this.state.isRefreshing}
                    onRefresh={() => this._onRefresh()}
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
                    onEndReached={() => this._onEndReached()}
                    onEndReachedThreshold={0.1}
                    renderItem={this._renderItem}
                    ListFooterComponent={this.renderFooter}
                    ListEmptyComponent={this.emptyComponent} />
            </View>
            
        ) 
        
    }

    _renderItem = () => {

    }

    _onRefresh = () => {
        console.log('refresh')
    }

    _onEndReached = () => {
        if (this.state.FlatListState === 1) {
            console.log('load more')
        }
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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