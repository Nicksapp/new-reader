import React from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView, RefreshControl, Dimensions, Alert} from 'react-native';
import { WebBrowser } from 'expo';

import SearchHeader from '../../components/searchHeader'
import ListContainer from '../../components/ListContainer'
import ListItem from '../../components/ListItemHome'

import { getTodayRecommend } from '../../utils/lib'
import { tempHomeData } from '../../api/tempHomeData'

export default class HomeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'search your food',
            isRefreshing: false,
            todayRecommend: [],
        };
    }

    componentWillMount() {
        // this.props.navigation.navigate('DemoView')

        storage.load({
            key: 'homeData'
        }).then(data => {
            if (data.todayRecommend && data.todayRecommend.length) {
                this.setState({ todayRecommend: data.todayRecommend })
            } else {
                storage.save({
                    key: 'homeData',
                    data: {
                        todayRecommend: tempHomeData
                    },
                    expires: 1000 * 3600 * 24 * 30
                })
                this.setState({ todayRecommend : tempHomeData })
                this._onRefresh();
            }
        }).catch(err => this._onRefresh())
    }

    _onRefresh = () => {
        this.setState({ isRefreshing: true });
        getTodayRecommend().then(res => {
            if (res && res.length) {
                this.setState({ todayRecommend: res })
                storage.save({
                    key: 'homeData',
                    data: {
                        todayRecommend: res
                    },
                    expires: 1000 * 3600 * 24 * 30
                })
            }
            this.setState({ isRefreshing: false });
        }).catch(err => { this.setState({ isRefreshing: false }); })
    }

    _onScroll = () => {

    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <SearchHeader
                    onSearchClick={() => navigate('SearchView')}
                    onScanClick={() => navigate('ScanView')} />
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
                    {
                        this.state.todayRecommend.length > 0 ? (
                            <ListContainer
                                listTitle="今日精选">
                                {
                                    this.state.todayRecommend.map(item => {
                                        if (item.title) {
                                            return(
                                                <ListItem
                                                    key={item.id}
                                                    mainTitle={item.title}
                                                    descTitle={item.desc}
                                                    imgUrl={item.image}
                                                    author={item.author.name}
                                                    authorImage={item.author.avatar}
                                                    label="今日精选"
                                                    onListClick={() => WebBrowser.openBrowserAsync(item.pointUrl)} />
                                            )
                                        }
                                    })
                                }
                            </ListContainer> 
                        ) : (null)
                    }
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
        backgroundColor: '#f5f5f5',
        marginTop: 10,
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