import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';

export default class ItemDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfLinesDesc: 5,
            textDesc: '展开',
            numberOfLinesAuthor: 5,
            textAuthor: '展开'
        }
    }

    render() {
        return (
            <View>
                <ScrollView>
                    <View style={styles.headerImage}>
                        <Image style={styles.mainImage} source={{ uri: 'https://img3.doubanio.com/lpic/s29699274.jpg'}}></Image>
                    </View>
                    <View style={{padding: 20}}>
                        <View style={{borderBottomWidth: 0.5, borderBottomColor: '#e0e0e0', paddingBottom: 15}}>
                            <View style={styles.mainTitle}>
                                <View>
                                    <Text style={{fontSize: 20, fontWeight: '500', color: '#333'}}>远见</Text>
                                    <Text style={{color: '#616161', marginTop: 5}}>如何规划职业生涯3大阶段</Text>
                                    <View style={{marginTop: 10}}>
                                        <Text style={styles.titleInfo}>作者：[美]布莱恩·费瑟思通豪</Text>
                                        <Text style={styles.titleInfo}>出版社：北京联合出版公司</Text>
                                        <Text style={styles.titleInfo}>出版时间：2018-1</Text>
                                    </View>
                                </View>
                                <View style={styles.pointCard}>
                                    <Text style={styles.titleInfo}>豆瓣评分</Text>
                                    <Text style={{fontSize: 20, fontWeight: '500', color: '#333'}}>8.0</Text>
                                    {/* <Text style={{fontSize: 14}}>xxxxxx</Text> */}
                                    <Text style={{fontSize: 11, color: '#616161'}}>169人</Text>
                                </View>
                            </View>
                            <View style={{marginTop: 25}}>
                                <TouchableOpacity style={styles.mainBtn}>
                                    <Text style={{color: '#ffa000'}}>收藏</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        

                        <View style={styles.mainInfo}>
                            <Text style={styles.mainInfoTitle}>简介</Text>
                            <Text style={styles.descText} numberOfLines={this.state.numberOfLinesDesc}>
                               {"小王子驾到！大家好，我是小王子，生活在B612星球，别看我是王子出生，我要做的事也不少，有时给花浇水，有时我还得耐心地把火山口通一通。实在闷得发慌的时候，为了找些事做，学点东西，我也访问一些其他的星球，像325号、326号、327号之类的。当然，我经历的事情也不少，有开心的，也有不开心的。这些事我通常会向地球上一个叫圣埃克苏佩里的人倾诉。对了，你可不要小瞧他，他是拿但业的儿子，琐罗亚斯德的孙子。他还被人们认为尼采式的第二代法国作家。他一生有两大爱好：飞行和写作。我之所以能够这样受欢迎也是他的功劳。因为他把我在其他星球的所见所闻编成了一本小书，也就是你们即将看到的这一本。它不但被誉为有史以来阅读仅次于《圣经》的书，全球发行的语言更是超过100种。可惜的是，在这本书出版后没多久，他在一次架机执行任务时一去不复返了，没有人知道他去了哪里。今天我第一次来到中国，还希望大家同样能够喜欢我。在这本书里他收藏了很多我在其他星球的精美彩图，而且，值得一提的是，中国著名的评论家周国平先生也特意为我作序。可以说，这本书不仅小朋友们爱不释手，就连大人们也会看得如痴如醉。糟糕，我还忘了告诉你，你只有在卓越网（www.joyo.com）才能找到我。有缘的话，我们很快就能相见了。\n尼采、纪德、圣埃克苏佩里是同一家庭的成员，由无可否认的联系连在一起。圣埃克苏佩里热爱尼采。纪德热爱圣埃克苏佩里。\n1945年2月1日《费加罗报》上，他谈到这位飞行员：\"他无论在何处着陆，都是为了带去欢乐。\"\n但是圣埃克苏佩里将公正置于友谊之上。他在《札记》中写道：\"纪德评价，却不曾体验。\"确切的见解。这是行动者面对思想者所感到的骄傲。尼采和纪德孕育了一种道德，并用美妙的文学冲动表现出来。只有圣埃克苏佩里一人在危险和充实中体验了这种道德。他是翱翔于九天的琐罗亚斯德，是乘风飞去的拿但业。他的书房便是机舱。他的格言：事事体验。他的作品：生活。圣埃克苏佩里对尼采的力量和纪德的热诚做作了合理的总结：他的冒险为职业，把写作当嗜好，他在飞行员的位置上实现着克尔桤郭尔的愿望：\"做一个思想家和做一个人，二者尽量不要区别开来，这样才是明智的。\"--（法）玛雅·戴斯特莱姆"}
                            </Text>
                            <TouchableOpacity activeOpacity={1} onPress={() => this.showMoreInfo('desc')}>
                                <Text style={{color: '#43a047'}}>{this.state.textDesc}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.mainInfo}>
                            <Text style={styles.mainInfoTitle}>作者</Text>
                            <Text style={styles.descText} numberOfLines={this.state.numberOfLinesAuthor}>圣埃克苏佩里（1900－1944）1900年，尼采逝世。这一年，安德烈・纪德在布鲁塞尔一次会议上宣称：“当今文学土地的面貌可以说是一片沼泽。”1900年，圣埃克苏佩里诞生。净化沼泽的意愿和能力历史地落在这个“世纪儿”的身上，圣埃克苏佩里是尼采式的第二代法国作家，拿但业的儿子，琐罗亚斯德的孙子，这个飞行员受到极大的遗传影响。灾种影响使他在探索、忧虑和英雄主义的道路上走到尽头。如尼采所说：“你应该超截止自己，走得更远，登得更高，直至群星在你脚下。”尼采成为他座舱中想象的伙伴。这个飞越沙漠和海洋的年轻驾驶员同样也遵循着纪德的教诲：“与其过宁静的生活，不如过悲怆的生活。”圣埃克苏佩里在他整个的一生中都在反复思考力量和热诚的真谛。{'\n'}圣埃克苏佩里（AntoinedeSaiot-Exupery），1900年出生于法国里昂，1921-1923年在法国空军中服役，曾是后备飞行员，后来又成为民用航空驾驶员，参加了开辟法国――非洲――南美国际航线的工作，其间他还从事文学写作，作品有《南线班机》（1930），《夜航》（1931）等等。{'\n'}1939年德国法西斯入侵法国，鉴于圣埃克苏佩里曾多次受伤，医生认为他不能再入伍参战；但经他坚决要求，参加了抗德战争，被编入2\/33空军侦察大队。1940年法国在战争中溃败，他所在的部队损失惨重，该部被调往阿尔及尔，随后即被复员，他只身流亡美国。在美国期间，他继续从事写作，1940年发表了《战斗飞行员》，1943年发表了《给一个人质的信》以及《小王子》。{'\n'}1943年，在他的强烈要求下，他回到法国在北非的抗战基地阿尔及尔。他的上级考虑到他的身体和年龄状况，只同意他执行五次飞行任务，他却要求到八次，1944年7月31日上午，他出航执行第八次任务，从此再也没有回来，牺牲时，年仅44岁。{'\n'}在欧洲某地的一个湖中，发现了圣・德克旭贝里的飞机残骸。这次搜索是经过对他最后一次出航的线路和德军当时的空军记录研究以后进行的，经过认证确认是那架失踪了半个世纪的侦察机。为了纪念这位伟大的战士和文学家，当地决定为这架飞机的残骸建立一个博物馆，以他的名字命名，陈列他的作品和遗物。</Text>
                            <TouchableOpacity activeOpacity={1} onPress={() => this.showMoreInfo('author')}>
                                <Text style={{color: '#43a047'}}>{this.state.textAuthor}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.mainInfo}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={styles.mainInfoTitle}>读书笔记</Text>
                                <TouchableOpacity 
                                    style={styles.miniBtn}
                                    activeOpacity={1} onPress={() => Alert.alert('暂未开放')}>
                                    <Text style={{color: '#43a047', fontSize: 12}}>写笔记</Text>
                                </TouchableOpacity>
                            </View>
                            
                            <ScrollView
                                horizontal={true}
                                automaticallyAdjustContentInsets={false}
                                showsHorizontalScrollIndicator={false}
                                style={styles.noteScrollView}>
                                <View style={styles.noteCard}>
                                    <Text style={{fontSize: 13, fontWeight: '500', color: '#333'}}>第一页</Text>
                                    <Text style={{fontSize: 12, color: '#424242', marginTop: 5 ,marginBottom: 5}} numberOfLines={4}>所擅长的，所热爱的，这个世界所需要的三大让廖访问量您访问分为范围你发了五年范围看哪个方位开关文革我看那个翁老翁范围来看给你热快乐那个个人干呢人来看过呢人看过呢，废物废物各位个人人格二哥</Text>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <View>
                                            <Text style={{fontSize: 11, color: '#757575'}}>野人五姑娘</Text>
                                        </View>
                                        <Text style={{fontSize: 11, color: '#757575'}}>1个月前</Text>
                                    </View>
                                </View>
                                <View style={styles.noteCard}>
                                    <Text style={{fontSize: 13, fontWeight: '500', color: '#333'}}>第一页</Text>
                                    <Text style={{fontSize: 12, color: '#424242', marginTop: 5 ,marginBottom: 5}} numberOfLines={4}>所擅长的，所热爱的，这个世界所需要的三大让廖访问量您访问分为范围你发了五年范围看哪个方位开关文革我看那个翁老翁范围来看给你热快乐那个个人干呢人来看过呢人看过呢，废物废物各位个人人格二哥</Text>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <View>
                                            <Text style={{fontSize: 11, color: '#757575'}}>野人五姑娘</Text>
                                        </View>
                                        <Text style={{fontSize: 11, color: '#757575'}}>1个月前</Text>
                                    </View>
                                </View>
                                <View style={styles.noteCard}>
                                    <Text style={{fontSize: 13, fontWeight: '500', color: '#333'}}>第一页</Text>
                                    <Text style={{fontSize: 12, color: '#424242', marginTop: 5 ,marginBottom: 5}} numberOfLines={4}>所擅长的，所热爱的，这个世界所需要的三大让廖访问量您访问分为范围你发了五年范围看哪个方位开关文革我看那个翁老翁范围来看给你热快乐那个个人干呢人来看过呢人看过呢，废物废物各位个人人格二哥</Text>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <View>
                                            <Text style={{fontSize: 11, color: '#757575'}}>野人五姑娘</Text>
                                        </View>
                                        <Text style={{fontSize: 11, color: '#757575'}}>1个月前</Text>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
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
            height:10,
            width:10
        },
        shadowRadius:3,
        shadowOpacity:0.8,
    },
    mainTitle: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleInfo: {
        fontSize: 11,
        lineHeight: 13,
        color: '#757575'
    },
    pointCard: {
        width: 80,
        height: 80,
        padding: 10,
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
    noteScrollView: {

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
    }
});