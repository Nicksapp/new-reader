import React from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView, RefreshControl, TouchableOpacity, Dimensions} from 'react-native';

import ListItem from '../components/ListItemHome'

export default class HomeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'search your food',
            isRefreshing: false,
        };
        // this._onRefresh = this._onRefresh.bind(this);
    }

    _onRefresh = () => {
        this.setState({ isRefreshing: true });
        setTimeout(() => {
            console.log("refreshing done!")
            this.setState({ isRefreshing: false })
        }, 1000)
    }

    _onScroll = () => {

    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.container}
                    onScroll={this._onScroll}
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
                    <View style={styles.recommendContainer}>
                        <View style={styles.groupHeader}>
                            <Text style={styles.textHeader}>推荐商家</Text>
                        </View>
                        <TouchableOpacity key={1} activeOpacity={1} onPress={() => navigate('CameraView')}>
                            <ListItem />
                        </TouchableOpacity>
                        <TouchableOpacity key={2} activeOpacity={1} onPress={() => navigate('DemoView')}>
                            <ListItem />
                        </TouchableOpacity>
                        <TouchableOpacity key={3} activeOpacity={1} onPress={() => navigate('DemoView')}>
                            <ListItem />
                        </TouchableOpacity>
                        <TouchableOpacity key={4} activeOpacity={1} onPress={() => navigate('DemoView')}>
                            <ListItem />
                        </TouchableOpacity>
                        <TouchableOpacity key={5} activeOpacity={1} onPress={() => navigate('DemoView')}>
                            <ListItem />
                        </TouchableOpacity>
                    </View>   
                </ScrollView>
            </View>
        )
    }
    
}

HomeView.navigationOptions = props => {
    const { navigation } = props;
    return {
        headerRight: (
            <Text
                style={styles.headerRight}
                onPress={() =>
                    navigation.navigate('ScanView')
                }
            > 扫描 </Text>
        ),
    };
}

const width = Dimensions.get('window').width;  // 屏幕宽度

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    headerRight: {
        color: '#fff',
    },
    rowFlex: {
        flexDirection: 'row'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide1: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 10,
        flexWrap: 'wrap',
        backgroundColor: '#fff',
    },
    swiperListItem: {
        width: width / 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
    },
    listImage: {
        width: 42,
        height: 42,
        marginBottom: 10
    },
    listTitle: {
        color: '#666',
        fontSize: 12
    },

    recommendContainer: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 10,
        paddingLeft: 5,
        paddingRight: 5,
    },
    groupHeader: {
        padding: 10,
        borderBottomColor: '#eee',
        borderBottomWidth: .5
    },
    textHeader: {
        fontSize: 16,
        fontWeight: "500",
    },
    textTitle: {
        fontSize: 15,
        fontWeight: "500",
    },
    midContainer: {
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#fff'
    },
    midItem: {
        flexDirection: 'row',
        width: width / 2,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
    },
    smText: {
        color: '#999',
        fontSize: 10,
    },
});