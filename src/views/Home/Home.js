import React from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView, RefreshControl, Dimensions, Alert} from 'react-native';

import SearchHeader from '../../components/searchHeader'
import ListContainer from '../../components/ListContainer'
import ListItem from '../../components/ListItemHome'


export default class HomeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'search your food',
            isRefreshing: false,
        };
        // this._onRefresh = this._onRefresh.bind(this);
    }

    componentWillMount() {
        // this.props.navigation.navigate('ItemDetaillView')
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
                        <ListContainer
                            listTitle="热点">
                            <ListItem
                                mainTitle="格林兄弟的抗争：“国王违宪了！"
                                descTitle="雅各布·格林和威廉·根林不仅因《格林童话》而闻名天下，在他们那个时代，他们 雅各布·格林和威廉·根林不仅因《格林童话》而闻名天下，在他们那个时代，他们"
                                imgUrl="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2504505108,1276511427&fm=27&gp=0.jpg"
                                author="真知社"
                                label="今日热点"
                                onListClick={() => navigate('DetailView')} />
                            <ListItem
                                mainTitle="格林兄弟的抗争：“国王违宪了！"
                                descTitle="雅各布·格林和威廉·根林不仅因《格林童话》而闻名天下，在他们那个时代，他们 雅各布·格林和威廉·根林不仅因《格林童话》而闻名天下，在他们那个时代，他们"
                                imgUrl="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2504505108,1276511427&fm=27&gp=0.jpg"
                                author="真知社"
                                label="今日热点"
                                onListClick={() => navigate('DetailView')} />
                        </ListContainer> 

                        <ListContainer
                            listTitle="热点">
                            <ListItem
                                mainTitle="格林兄弟的抗争：“国王违宪了！"
                                descTitle="雅各布·格林和威廉·根林不仅因《格林童话》而闻名天下，在他们那个时代，他们 雅各布·格林和威廉·根林不仅因《格林童话》而闻名天下，在他们那个时代，他们"
                                imgUrl="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2504505108,1276511427&fm=27&gp=0.jpg"
                                author="真知社"
                                label="今日热点"
                                onListClick={() => navigate('DetailView')} />
                            <ListItem
                                mainTitle="格林兄弟的抗争：“国王违宪了！"
                                descTitle="雅各布·格林和威廉·根林不仅因《格林童话》而闻名天下，在他们那个时代，他们 雅各布·格林和威廉·根林不仅因《格林童话》而闻名天下，在他们那个时代，他们"
                                imgUrl="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2504505108,1276511427&fm=27&gp=0.jpg"
                                author="真知社"
                                label="今日热点"
                                onListClick={() => navigate('DetailView')} />
                        </ListContainer> 
                       
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