import React from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView } from 'react-native';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import FindItemList from '../../components/findItemList'
import FindItemColumnList from '../../components/findItemColumnList'

import { getMovieInTheaters, getMovieCommingSoon, getMovieTop250 } from '../../utils/lib'
import { alertDefault } from '../../utils/utils'

import Loading from '../../components/loading'

export default class FindView extends React.Component {
    constructor() {
        super();
        this.state = {
            movieInTheaters: [],
            movieCommingSoon: [],
            movieTop250: [],
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
                    renderTabBar={() => <DefaultTabBar style={{height: 45, borderWidth: 0.2, }}/> } >

                    <ScrollView tabLabel="图书">
                        <FindItemList
                            sectionName="最受关注的虚构类图书" />
                        <FindItemColumnList
                            sectionName="你可能感兴趣" />
                    </ScrollView>
                    
                    <ScrollView tabLabel="课程" >
                        <Text>课程</Text>
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

                    <ScrollView tabLabel="音乐">
                        <Text>图书</Text>
                    </ScrollView>
                </ScrollableTabView>
            </View>
        )
    }
    
    componentDidMount() {
        this.initData();
    }

    initData() {
        this.setState({loading: true})
        Promise.all([
            getMovieInTheaters(),
            getMovieCommingSoon(),
            getMovieTop250()
        ]).then(values => {
            values.forEach(res => {
                if (!res) {
                    alertDefault('网络请求异常！');
                    this.setState({ loading: false })
                    return false;
                }
            })
            this.state.movieInTheaters = values[0].subjects;
            this.state.movieCommingSoon = values[1].subjects;
            this.state.movieTop250 = values[2].subjects;
            this.setState({ loading: false })
        })
    }

    handleToItemDetail = (id) => {
        const { navigate } = this.props.navigation;
        navigate('ItemDetaillView', { id })
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

