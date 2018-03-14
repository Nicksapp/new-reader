import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        }
    }

    handleToTag() {
        console.log("tag clicked")
    }
    handleToClearHistory() {
        console.log("history cleared")
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
                            underlineColorAndroid="transparent"></TextInput>
                    </View>
                </View>
                <View style={styles.mainContainer}>
                    <View style={styles.rowBetween}>
                        <Text style={styles.textHeader}>历史搜索</Text>
                        <TouchableOpacity onPress={this.handleToClearHistory.bind(this)}>
                            <Ionicons name="ios-trash" size={18} style={{ color: '#cecece' }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 15 }}>
                        <TouchableOpacity style={styles.tagCon} activeOpacity={1} onPress={this.handleToTag.bind(this)}>
                            <Text style={styles.greyTag}>恐吓运动</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tagCon} activeOpacity={1} onPress={this.handleToTag.bind(this)}>
                            <Text style={styles.greyTag}>前任3</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tagCon} activeOpacity={1} onPress={this.handleToTag.bind(this)}>
                            <Text style={styles.greyTag}>其他</Text>
                        </TouchableOpacity>
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
        )
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
    }
});