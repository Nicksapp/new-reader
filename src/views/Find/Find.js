import React from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView } from 'react-native';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import FindItemList from '../../components/findItemList'
import FindItemColumnList from '../../components/findItemColumnList'

export default FindView = ({ navigation }) => {
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
                    <Text>图书</Text>
                </ScrollView>

                <ScrollView tabLabel="音乐">
                    <Text>图书</Text>
                </ScrollView>
            </ScrollableTabView>
        </View>
    )
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

