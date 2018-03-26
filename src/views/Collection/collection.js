import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SectionList, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getCollection } from '../../utils/lib'
import Loading from '../../components/loading'

export default class Collection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            source: [{
                key: 'a',
                data: [],
            }],
            loading: false,
       }
    }

    _renderItem = (section) => {
        return (
            <TouchableOpacity
                style={styles.cellContainer}
                key={section.item.collection_id}>
                <View style={styles.cellPart}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={{ width: 32, height: 24, resizeMode: 'contain' }} source={{ uri: section.item.img_url}}></Image>
                        <Text style={{ marginLeft: 15, lineHeight: 26, }}>{section.item.title}</Text>
                    </View>
                    <Ionicons
                        name={Platform.OS === 'ios'
                            ? `ios-arrow-forward`
                            : 'md-arrow-dropright'}
                        size={26}
                        style={{ color: "#dddee1", marginRight: 15 }}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>
            {
                this.state.loading ? (<Loading />) : (
                    <SectionList
                        renderItem={this._renderItem}
                        sections={this.state.source} />
                )
            }
                
            </View>
        )
    }

    componentDidMount() {
        const { title } = this.props.navigation.state.params;
        this.setState({loading: true})
        switch (title) {
            case '收藏': {
                storage.load({
                    key: 'loginState'
                }).then(data => {
                    console.log(data)
                    if (data && data.objectId) {
                        const user_id = data.objectId;
                        getCollection({ user_id }).then(res => {
                            const { results = [] } = res;
                            for (var i = 0; i < results.length; i++) {
                                results[i].key = results[i].objectId
                            }
                            const source = [{
                                key: 'a',
                                data: results
                            }]
                            this.setState({
                                source,
                                loading: false
                            })
                        })
                    }
                }).catch(err => {
                    Alert.alert('请登录后再尝试操作！')
                    this.setState({ loading: false })
                })
                break;
            }
            default: this.setState({ loading: false });
        }
    }

    fetchDataByType(type) {
        
    }
}

Collection.navigationOptions = props => {
    const { navigation } = props;
    const { title } = props.navigation.state.params;
    return {
        title
    };
}


const styles = StyleSheet.create({
    cellContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingTop: 15,
        paddingLeft: 20,
    },
    cellPart: {
        borderBottomWidth: 1,
        borderBottomColor: '#e9eaec',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        paddingBottom: 10,
    }
})