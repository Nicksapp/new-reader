import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, SectionList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getBookBySearch } from '../utils/lib'
import SearchCell from '../components/searchCell'
import Loading from '../components/loading'
import Star from '../components/star'

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            loading: false,
            searchResult: [],
            searchTextArr: [],
        }
    }

    handleToTag() {
        console.log("tag clicked")
    }
    
    handleToClearHistory() {
        storage.remove({
            key: 'searchHistory'
        }).then(() => {
            this.setState({
                searchTextArr: []
            })
        })
    }

    render() {
        
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.goBack()}>
                        <Ionicons name="ios-arrow-back" size={34} style={{ color: '#999', marginTop: 2 }} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, flexDirection: 'row', marginLeft: 15 }}>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(text) => this.setState({ text })}
                            placeholder='搜索'
                            value={this.state.text}
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => {
                                this.setState({text});// 当内容改变时执行该方法  
                            }}  
                            onSubmitEditing={() => {this.handleToSearch()}}></TextInput>
                    </View>
                </View>

                <SectionList
                    style={{ display: this.state.searchResult && this.state.searchResult.length === 0 ? 'none' : 'flex' }}
                    renderItem={this._renderItem}
                    sections={this.state.searchResult} />

                <View style={{ display: this.state.searchResult && this.state.searchResult.length === 0 ? 'flex' : 'none' }}>
                    <View style={styles.mainContainer}>
                        <View style={styles.rowBetween}>
                            <Text style={styles.textHeader}>历史搜索</Text>
                            <TouchableOpacity onPress={this.handleToClearHistory.bind(this)}>
                                <Ionicons name="ios-trash" size={18} style={{ color: '#cecece' }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 15 }}>
                            {
                                this.state.searchTextArr.map((item, index) => {
                                    return (
                                        <TouchableOpacity style={styles.tagCon} activeOpacity={1} key={index} onPress={this.handleToTag.bind(this)}>
                                            <Text style={styles.greyTag}>{item}</Text>
                                        </TouchableOpacity>
                                    )   
                                })
                            }
                        </View>
                    </View>
                    <View style={[styles.mainContainer, { marginTop: 30 }]}>
                        <View>
                            <Text style={styles.textHeader}>热门搜索</Text>
                        </View>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 20 }}>
                            <TouchableOpacity style={styles.tagCon} activeOpacity={1} onPress={this.handleToTag.bind(this)}>
                                <Text style={styles.greyTag}>三块广告牌</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.tagCon} activeOpacity={1} onPress={this.handleToTag.bind(this)}>
                                <Text style={styles.greyTag}>前任3:再见前任</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.tagCon} activeOpacity={1} onPress={this.handleToTag.bind(this)}>
                                <Text style={styles.greyTag}>老男孩</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.tagCon} activeOpacity={1} onPress={this.handleToTag.bind(this)}>
                                <Text style={styles.greyTag}>八卦艺术史</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.tagCon} activeOpacity={1} onPress={this.handleToTag.bind(this)}>
                                <Text style={styles.greyTag}>相亲后的吐槽</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.tagCon} activeOpacity={1} onPress={this.handleToTag.bind(this)}>
                                <Text style={styles.greyTag}>豆瓣2017年度电影榜单</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.tagCon} activeOpacity={1} onPress={this.handleToTag.bind(this)}>
                                <Text style={styles.greyTag}>1984</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
                
               
            </View>
        )
    }

    _renderItem = (section) => {
        const { navigate } = this.props.navigation;
        return (
            <TouchableOpacity activeOpacity={1} onPress={() => navigate('ItemDetaillView', { id: section.item.id, type: 'BOOK' })} key={section.item.id}>
                <View style={styles.cellContainer}>
                    <View style={{ flex: 1, height: 85 }}>
                        <Image style={{ flex: 1, resizeMode: 'contain' }} source={{ uri: section.item.image }} ></Image>
                    </View>
                    <View style={{ flex: 6, marginLeft: 10 }}>
                        <Text style={{color: '#333', fontSize: 16, fontWeight: '500'}}>{section.item.title}</Text>
                        <Text style={{ color: '#666', fontSize: 12, paddingTop: 3, paddingBottom: 3, display: section.item.subtitle?'flex':'none'}}>{section.item.subtitle}</Text>
                        <Star stars={section.item.rating.average} />
                        <Text style={{color: '#666', fontSize: 12}}>{section.item.author[0]} / {section.item.pubdate}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    componentDidMount() {
        storage.load({
            key: 'searchHistory'
        }).then(data => {
            if (data.searchTextArr && data.searchTextArr.length) {
                this.setState({
                    searchTextArr: data.searchTextArr
                })
            }
        })
    }

    handleToSearch = () => {
        if (this.state.text !== '') {
            let params = {
                q: this.state.text
            }
            getBookBySearch(params).then(res => {
                if (res.books && res.books.length) {
                    const responseData = res.books.map(item => {
                        return Object.assign({}, item, {
                            key: item.id
                        })
                    });
                    let result = [{
                        key: 'books',
                        data: responseData
                    }]
                    this.setState({
                        searchResult: result
                    })
                }
            }).catch(err => {console.log(err)})
        }
        storage.load({
            key: 'searchHistory'
        }).then(data => {
            if (data.searchTextArr && data.searchTextArr.length) {
                let temp = data.searchTextArr;
                return temp.push(this.state.text)
            }
        }).then(val => {
            storage.save({
                key: 'searchHistory',
                data: {
                    searchTextArr: val
                },
                expires: 1000 * 3600 * 7
            })
        }).catch(err => {
            storage.save({
                key: 'searchHistory',
                data: {
                    searchTextArr: [this.state.text]
                },
                expires: 1000 * 3600 * 7
            })
        })
        
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        paddingTop: 30,
        paddingLeft: 20,
        paddingRight: 20,
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContainer: {
        // flex: 1,
        height: 60,
        flexDirection: 'row',
    },
    textInput: {
        flex: 1,
        height: 38,
        backgroundColor: '#f8f8f8',
        color: '#666',
        borderRadius: 10,
        padding: 10,
        textDecorationLine: 'none',
        borderBottomColor: '#fff'
    },
    mainContainer: {
        // flex: 1
    },
    textHeader: {
        fontSize: 16,
        fontWeight: "500",
    },
    tagCon: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 10,
        paddingRight: 10,
        margin: 5,
        backgroundColor: '#f7f7f7',
        borderRadius: 5
    },
    greyTag: {
        color: '#666',
    },
    cellContainer: {
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        borderBottomWidth: 0.3,
        borderBottomColor: '#e6e6e6'
    }
});