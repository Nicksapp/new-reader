import React from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView} from 'react-native';
import { Video } from 'expo';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import FindItemList from '../../components/findItemList'
import FindItemColumnList from '../../components/findItemColumnList'
import VideoList from '../../components/videoList'

import { getMovieInTheaters, getMovieCommingSoon, getMovieTop250, getBookBySeries } from '../../utils/lib'
import { alertDefault } from '../../utils/utils'

import Loading from '../../components/loading'

export default class FindView extends React.Component {
    constructor() {
        super();
        this.state = {
            movieInTheaters: [],
            movieCommingSoon: [],
            movieTop250: [],
            bookSeries1: [],
            bookSeries2: [],
            bookSeries3: [],
            series1Name: '',
            series2Name: '',
            series3Name: '',
            loading: false,
        }
    }

    render() {
        
        return (
            <View style={styles.container}>

                <ScrollableTabView
                    tabBarUnderlineStyle={{backgroundColor: "#0096ff", height: 3}}
                    tabBarBackgroundColor='#FFFFFF'
                    tabBarActiveTextColor='#0096ff'
                    tabBarInactiveTextColor='#bdbdbd'
                    tabBarTextStyle={{ fontSize: 14, fontWeight: '300' }}
                    renderTabBar={() => <DefaultTabBar style={{height: 45, borderWidth: 0.2, paddingTop: 7}}/> } >

                    <ScrollView tabLabel="图书">
                    {
                        this.state.loading ? (<Loading />) : (
                            <View>
                                <FindItemList
                                    sectionName={this.state.series1Name}
                                    onItemClick={this.handleToBookItemDetail}
                                    source={this.state.bookSeries1} />
                                <FindItemList
                                    sectionName={this.state.series2Name}
                                    onItemClick={this.handleToBookItemDetail}
                                    source={this.state.bookSeries2} />
                                <FindItemColumnList
                                    sectionName={this.state.series3Name}
                                    onItemClick={this.handleToBookItemDetail}
                                    source={this.state.bookSeries3} />
                            </View>
                        )
                    }
                    </ScrollView>
                    
                    <ScrollView tabLabel="课程" >
                        <VideoList source={
                            [{ 
                                key: 'a', 
                                data: [
                                    { 
                                        key: '123',
                                        url: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                                        title: '测量物质密度归类分析',
                                        desc: '测量物质密度归类分析'
                                    }, {
                                        key: '422',
                                        url: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                                        title: '测量物质密度归类分析',
                                        desc: '测量物质密度归类分析'
                                    }
                                ]
                            }]} />
                    </ScrollView>

                    <ScrollView tabLabel="电影">
                       {
                            this.state.loading ? (<Loading />) : (
                                <View>
                                    <FindItemList
                                        sectionName="影院热映"
                                        onItemClick={this.handleToItemDetail}
                                        source={this.state.movieInTheaters} /> 
                                    <FindItemList
                                        sectionName="院线即将上映"
                                        onItemClick={this.handleToItemDetail}
                                        source={this.state.movieCommingSoon} /> 
                                    <FindItemColumnList
                                        sectionName="豆瓣电影Top250"
                                        onItemClick={this.handleToItemDetail}
                                        source={this.state.movieTop250} />
                                </View>
                            )
                       }
                    </ScrollView>
                </ScrollableTabView>
            </View>
        )
    }
    
    componentDidMount() {
        storage.load({
            key: 'findData'
        }).then(data => {
            if (JSON.stringify(data.movieInTheaters) == "{}" || JSON.stringify(data.movieCommingSoon) == "{}" || JSON.stringify(data.movieTop250) == "{}") {
                this.initData();
            } else {
                this.setState({ 
                    movieInTheaters: data.movieInTheaters,
                    movieCommingSoon: data.movieCommingSoon,
                    movieTop250: data.movieTop250,
                    bookSeries1: data.bookSeries1,
                    bookSeries2: data.bookSeries2,
                    bookSeries3: data.bookSeries3,
                    series1Name: data.series1Name,
                    series2Name: data.series2Name,
                    series3Name: data.series3Name,
                    loading: false
                })
            }
        }).catch(err=> {
            this.initData();
        })
    }

    initData() {
        this.setState({loading: true})
        const seriesId1 = Math.floor(Math.random() * 10000);
        const seriesId2 = Math.floor(Math.random() * 10000);
        const seriesId3 = Math.floor(Math.random() * 10000);
        Promise.all([
            getMovieInTheaters(),
            getMovieCommingSoon(),
            getMovieTop250(),
            getBookBySeries(seriesId1),
            getBookBySeries(seriesId2),
            getBookBySeries(seriesId3),
        ]).then(values => {
            values.forEach(res => {
                if (!res) {
                    alertDefault('网络请求异常！');
                    this.setState({ loading: false })
                    return false;
                }
            })
            this.setState({
                movieInTheaters: values[0].subjects,
                movieCommingSoon: values[1].subjects,
                movieTop250: values[2].subjects,
                bookSeries1: values[3].books,
                series1Name: values[3].books[0].series.title,
                bookSeries2: values[4].books,
                series2Name: values[4].books[0].series.title,
                bookSeries3: values[5].books,
                series3Name: values[5].books[0].series.title,
                loading: false
            })
            
            storage.save({
                key: 'findData',
                data: {
                    movieInTheaters: values[0].subjects,
                    movieCommingSoon: values[1].subjects,
                    movieTop250: values[2].subjects,
                    bookSeries1: values[3].books,
                    bookSeries2: values[4].books,
                    bookSeries3: values[5].books,
                    series1Name: values[3].books[0].series.title,
                    series2Name: values[4].books[0].series.title,
                    series3Name: values[5].books[0].series.title,
                },
                expires: 1000 * 3600
            })
        }).catch(err => { return false })
    }

    handleToItemDetail = (id) => {
        const { navigate } = this.props.navigation;
        navigate('ItemDetaillView', { id , type: 'MOVIE' })
    }
    
    handleToBookItemDetail = (id) => {
        const { navigate } = this.props.navigation;
        navigate('ItemDetaillView', { id , type: 'BOOK' })
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
});

