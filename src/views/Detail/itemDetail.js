import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import CommentItem from '../../components/commentItem'
import Star from '../../components/star'
import Loading from '../../components/loading'

import { getMovieSubject, getBookById, getBookAnnotations, postCollection } from '../../utils/lib'

export default class ItemDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfLinesDesc: 5,
            textDesc: '展开',
            numberOfLinesAuthor: 5,
            textAuthor: '展开',

            itemDetail: {},
            bookAnnotations: {},
            loading: false,
        }
    }

    render() {
        if (this.state.loading || !this.state.itemDetail.title) {
            return (<Loading />)
        }
        return (
            <View style={{ backgroundColor: '#f5f5f5'}}>
                <ScrollView>
                    <View style={styles.headerImage}>
                        <Image style={styles.mainImage} source={{ uri: this.state.itemDetail.images.large}}></Image>
                    </View>
                    <View style={{padding: 20}}>
                        <View style={{ paddingBottom: 15}}>
                            <View style={styles.mainTitle}>
                                <View style={{flex: 3}}>
                                    <Text numberOfLines={1} style={{ fontSize: 20, fontWeight: '600', color: '#333' }}>{this.state.itemDetail.title}</Text>
                                    <Text numberOfLines={1} style={{color: '#616161', marginTop: 5}}>
                                        {
                                            this.state.itemDetail.subtype === 'movie' ? this.state.itemDetail.aka.join(' ') : ''
                                        }
                                    </Text>
                                    {
                                        this.state.itemDetail.subtype === 'movie' ? (
                                            <View style={{ marginTop: 10 }}>
                                                <Text style={styles.titleInfo}>
                                                    {this.state.itemDetail.year} / {this.state.itemDetail.countries.join(' ')} / {this.state.itemDetail.genres.join(' / ')}
                                                </Text>
                                                <Text style={styles.titleInfo}>原名: {this.state.itemDetail.original_title}</Text>
                                                {/* <Text style={styles.titleInfo}>上映时间: {this.state.itemDetail.current_season || ''}</Text> */}
                                            </View>
                                        ) : (
                                            <View style={{ marginTop: 10 }}>
                                                <Text style={styles.titleInfo}>作者：{this.state.itemDetail.author.join(' ')}</Text>
                                                <Text style={styles.titleInfo}>出版社：{this.state.itemDetail.publisher}</Text>
                                                <Text style={styles.titleInfo}>出版时间：{this.state.itemDetail.pubdate}</Text>
                                            </View>
                                        )
                                    }
                                        
                                </View>
                                <View style={{flex: 1}}>
                                    <View style={styles.pointCard}>
                                        <Text style={styles.titleInfo}>豆瓣评分</Text>
                                        <Text style={{ fontSize: 20, fontWeight: '500', color: '#333' }}>{this.state.itemDetail.rating.average}</Text>
                                        <Star stars={this.state.itemDetail.rating.average}/>
                                        <Text style={{ fontSize: 11, color: '#616161' }}>
                                            {
                                                this.state.itemDetail.subtype === 'movie' ? this.state.itemDetail.ratings_count + '人' : this.state.itemDetail.rating.numRaters+'人'
                                            }
                                        </Text>
                                    </View>
                                </View>
                                
                            </View>
                            <View style={{marginTop: 25}}>
                                <TouchableOpacity onPress={() => this.handleToCollect()} style={styles.mainBtn}>
                                    <Text style={{color: '#ffa000'}}>收藏</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {
                            this.state.itemDetail.subtype === 'movie' ? (
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 }}>
                                    {
                                        this.state.itemDetail.genres.map(item => {
                                            return (
                                                <View key={item} style={{ paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, backgroundColor: '#e6e6e6', margin: 5, borderRadius: 4 }}>
                                                    <Text style={{ color: '#666' }}>{item}</Text>
                                                </View>
                                            )
                                        })
                                    }

                                </View>
                            ) : (
                                <View style={{flexDirection: 'row', flexWrap: 'wrap',marginBottom: 10}}>
                                    {
                                        this.state.itemDetail.tags.map(item => {
                                            return (
                                                <View key={item.name} style={{paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, backgroundColor: '#e6e6e6',margin: 5,borderRadius: 4}}>
                                                    <Text style={{color: '#666'}}>{item.title}</Text>
                                                </View>
                                            )
                                        })
                                    }
                                    
                                </View>
                            )
                        }

                        <View style={styles.mainInfo} style={{ borderTopWidth: 0.5, borderTopColor: '#e0e0e0', paddingTop: 10}}>
                            <Text style={styles.mainInfoTitle}>简介</Text>
                            <Text style={styles.descText} numberOfLines={this.state.numberOfLinesDesc}>
                                {this.state.itemDetail.summary}
                            </Text>
                            <TouchableOpacity activeOpacity={1} onPress={() => this.showMoreInfo('desc')}>
                                <Text style={{color: '#43a047'}}>{this.state.textDesc}</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            this.state.itemDetail.subtype === 'movie' ? (
                                <View style={styles.mainInfo}>
                                    <Text style={styles.mainInfoTitle}>影人</Text>
                                    <ScrollView
                                        horizontal={true}
                                        automaticallyAdjustContentInsets={false}
                                        showsHorizontalScrollIndicator={false}>
                                        {
                                            this.state.itemDetail.directors.concat(this.state.itemDetail.casts).map((item, index) => {
                                                return(
                                                    <View style={{width: 80,height: 140,marginRight: 10, justifyContent: 'center'}} key={item.id}>
                                                        <View style={{ flex: 6 }}>
                                                            <Image style={{ flex: 1, resizeMode: 'cover', borderRadius: 3 }} source={{ uri: item.avatars.small }}></Image>
                                                        </View>
                                                        <Text numberOfLines={1} style={{ fontSize: 11, paddingTop: 3, fontWeight: '400' }}>{item.name}</Text>
                                                        <Text style={{ fontSize: 10, color: '#616161' }}>{ index===0 ? '导演' : '演员' }</Text>
                                                    </View>
                                                )
                                            })
                                        }
                                    </ScrollView>
                                </View>
                            ): (
                                <View>
                                    <View style={styles.mainInfo}>
                                        <Text style={styles.mainInfoTitle}>作者</Text>
                                        <Text style={styles.descText} numberOfLines={this.state.numberOfLinesAuthor}>圣埃克苏佩里（1900－1944）1900年，尼采逝世。这一年，安德烈・纪德在布鲁塞尔一次会议上宣称：“当今文学土地的面貌可以说是一片沼泽。”1900年，圣埃克苏佩里诞生。净化沼泽的意愿和能力历史地落在这个“世纪儿”的身上，圣埃克苏佩里是尼采式的第二代法国作家，拿但业的儿子，琐罗亚斯德的孙子，这个飞行员受到极大的遗传影响。灾种影响使他在探索、忧虑和英雄主义的道路上走到尽头。如尼采所说：“你应该超截止自己，走得更远，登得更高，直至群星在你脚下。”尼采成为他座舱中想象的伙伴。这个飞越沙漠和海洋的年轻驾驶员同样也遵循着纪德的教诲：“与其过宁静的生活，不如过悲怆的生活。”圣埃克苏佩里在他整个的一生中都在反复思考力量和热诚的真谛。{'\n'}圣埃克苏佩里（AntoinedeSaiot-Exupery），1900年出生于法国里昂，1921-1923年在法国空军中服役，曾是后备飞行员，后来又成为民用航空驾驶员，参加了开辟法国――非洲――南美国际航线的工作，其间他还从事文学写作，作品有《南线班机》（1930），《夜航》（1931）等等。{'\n'}1939年德国法西斯入侵法国，鉴于圣埃克苏佩里曾多次受伤，医生认为他不能再入伍参战；但经他坚决要求，参加了抗德战争，被编入2\/33空军侦察大队。1940年法国在战争中溃败，他所在的部队损失惨重，该部被调往阿尔及尔，随后即被复员，他只身流亡美国。在美国期间，他继续从事写作，1940年发表了《战斗飞行员》，1943年发表了《给一个人质的信》以及《小王子》。{'\n'}1943年，在他的强烈要求下，他回到法国在北非的抗战基地阿尔及尔。他的上级考虑到他的身体和年龄状况，只同意他执行五次飞行任务，他却要求到八次，1944年7月31日上午，他出航执行第八次任务，从此再也没有回来，牺牲时，年仅44岁。{'\n'}在欧洲某地的一个湖中，发现了圣・德克旭贝里的飞机残骸。这次搜索是经过对他最后一次出航的线路和德军当时的空军记录研究以后进行的，经过认证确认是那架失踪了半个世纪的侦察机。为了纪念这位伟大的战士和文学家，当地决定为这架飞机的残骸建立一个博物馆，以他的名字命名，陈列他的作品和遗物。</Text>
                                        <TouchableOpacity activeOpacity={1} onPress={() => this.showMoreInfo('author')}>
                                            <Text style={{color: '#43a047'}}>{this.state.textAuthor}</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.mainInfo}>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
                                            <Text style={styles.mainInfoTitle}>读书笔记</Text>
                                            <TouchableOpacity 
                                                style={styles.miniBtn}
                                                activeOpacity={1} onPress={() => this.handleToNoteEdit()}>
                                                <Text style={{color: '#43a047', fontSize: 12}}>写笔记</Text>
                                            </TouchableOpacity>
                                        </View>
                                        
                                        {/* 笔记 */}
                                        <ScrollView
                                            horizontal={true}
                                            automaticallyAdjustContentInsets={false}
                                            showsHorizontalScrollIndicator={false}>
                                            {
                                                this.state.bookAnnotations.annotations.map(item => {
                                                    return (
                                                        <TouchableOpacity onPress={() => this.handleToViewNoteInfo(item)} style={styles.noteCard} key={item.id}>
                                                            <Text style={{ fontSize: 13, fontWeight: '500', color: '#333' }}>{item.chapter}</Text>
                                                            <Text style={{ fontSize: 12, color: '#424242', marginTop: 5, marginBottom: 5 }} numberOfLines={4}>{item.summary}</Text>
                                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                <View>
                                                                    <Text style={{ fontSize: 11, color: '#757575' }}>{item.author_user.name}</Text>
                                                                </View>
                                                                <Text style={{ fontSize: 11, color: '#757575' }}>{item.time}</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            }
                                        </ScrollView>
                                    </View>
                                </View>
                            )
                        }
                        
                    </View>
                    
                    {/* 评论 */}
                    {/* <View style={styles.commentSection}>
                        <View style={styles.commentBar}>
                            <Text style={{fontSize: 16, fontWeight: '200', color: '#424242'}}>评论</Text>
                        </View>
                        <View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 20}}>
                                <Text style={styles.mainInfoTitle}>短评</Text>
                                <TouchableOpacity 
                                    style={styles.miniBtn}
                                    activeOpacity={1} onPress={() => Alert.alert('暂未开放')}>
                                    <Text style={{color: '#43a047', fontSize: 12}}>写短评</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <CommentItem />
                                <CommentItem />
                                <CommentItem />
                            </View>
                        </View>
                    </View> */}
                </ScrollView>
            </View>
        )
    }

    componentDidMount() {
        this.initData();
    }

    initData() {
        const { id, type } = this.props.navigation.state.params;
        const { goBack } = this.props.navigation;
        if (!id) {
            Alert.alert('查找错误！');
            this.props.navigation.goBack();
            return false;
        }
        switch (type) {
            case 'MOVIE': {
                this._handleFetchMovieData(id);
                break;
            }
            case 'BOOK': {
                this._handleFetchBookData(id);
                break;
            }
            default: {
                Alert.alert('暂不支持此类详情的访问！');
                goBack();
            }
        }
        
    }

    _handleFetchMovieData(id) {
        Promise.all([
            getMovieSubject(id),
        ]).then(values => {
            values.forEach(res => {
                if (!res) {
                    Alert.alert('网络请求异常！');
                    this.setState({ loading: false })
                    return false;
                }
            })
            this.state.itemDetail = values[0];
            this.setState({ loading: false })
        }).catch(err => { return false })
    }

    _handleFetchBookData(id) {
        Promise.all([
            getBookById(id),
            getBookAnnotations(id)
        ]).then(values => {
            values.forEach(res => {
                if (!res) {
                    Alert.alert('网络请求异常！');
                    this.setState({ loading: false })
                    return false;
                }
            })
            this.setState({
                itemDetail: values[0],
                bookAnnotations: Object.assign({}, values[1]),
            })
            this.setState({ loading: false })
        }).catch(err => { return false })
    }

    showMoreInfo = (type) => {
        if (type === 'desc') {
            this.setState({
                numberOfLinesDesc: 0,
                textDesc: ''
            })
        } else {
            this.setState({
                numberOfLinesAuthor: 0,
                textAuthor: ''
            })
        }
    }

    handleToCollect = () => {
        const { id, images, title, subtype } = this.state.itemDetail;
        let postData = {
            collection_id: id,
            img_url: images.small,
            title,
            type: subtype ? subtype : 'BOOK'
        };
        storage.load({
            key: 'loginState'
        }).then(data => {
            if (data && data.sessionToken) {
                postData.user_id = data.objectId;
                postData.username = data.username;
            }
            return postData;
        }).then(data => {
            postCollection(data).then(res => {
                if (res && res.objectId) {
                    Alert.alert('收藏成功！');
                }
            }).catch(err => Alert.alert(err))
        }).catch(err => Alert.alert('请登录后再尝试操作！'))
    }

    handleToViewNoteInfo = (item) => {
        const { navigate } = this.props.navigation;
        const dataSource = {
            title: item.chapter,
            username: item.author_user.name,
            avatar: item.author_user.avatar,
            createdAt: item.time,
            content: item.content,
            itemInfo: {
                img_url: item.book.image,
                title: item.book.title,
                collection_id: item.book_id,
                type: 'BOOK'
            }
        }
        navigate('NoteDetail', { dataSource })
    }

    handleToNoteEdit = () => {
        const { navigate } = this.props.navigation;
        const { id, images, title} = this.state.itemDetail
        const itemInfo = {
            img_url: images.small,
            title: title,
            collection_id: id,
            type: 'BOOK'
        }
        navigate('NoteEditModal', { itemInfo })
    }
} 

const styles = StyleSheet.create({
    headerImage: {
        flexDirection: 'row',
        flex: 1,
        height: 330,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    mainImage: {
        width: 200, 
        height: 300,
        resizeMode: 'contain',
        shadowColor: '#000',
        shadowOffset: {
            height: 3,
            width: 10
        },
        shadowRadius: 5,
        shadowOpacity: 0.15,
    },
    mainTitle: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleInfo: {
        fontSize: 13,
        lineHeight: 18,
        color: '#757575'
    },
    pointCard: {
        width: 80,
        height: 80,
        padding: 10,
        marginLeft: 15,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainInfo: {
        marginTop: 20,
    },
    mainInfoTitle: {
        fontSize: 14, 
        color: '#757575',
        fontWeight: '300',
        marginBottom: 10
    },
    descText: {
        color: '#424242',
        lineHeight: 20
    },
    mainBtn: {
        width: 80,
        padding: 7,
        borderWidth: 1,
        borderColor: '#ffa000',
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noteCard: {
        padding: 10,
        backgroundColor: '#fff',
        width: 240,
        height: 120,
        marginLeft: 10,
    },
    miniBtn: {
        width: 50,
        height: 23,
        borderWidth: 1,
        borderColor: '#43a047',
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    commentSection: {
        marginTop: 20
    },
    commentBar: {
        flexDirection: 'row',
        flex: 1,
        height: 40,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
    }
});