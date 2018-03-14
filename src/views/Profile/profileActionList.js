import React from 'react';
import { StyleSheet, Text, View, SectionList, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import sections from '../../config/profileActionSections'

export default class ProfileActionList extends React.Component {
    constructor(props) {
        super(props);
    }
    
    _renderItem = (section) => {
        return (
            <TouchableOpacity activeOpacity={1} onPress={() => this.props.onNavigatorClick(section.item.navigateTo)} style={styles.cellWrapper}>
                <View style={styles.cellPart}>
                    <View style={{flexDirection: 'row'}}>
                        <Ionicons
                            name={Platform.OS === 'ios'
                                ? section.item.iconIos
                                : section.item.iconAnd}
                            size={26}
                            style={{ color: section.item.color, width: 25, textAlign: 'center' }}
                        />
                        <Text style={{marginLeft: 15, lineHeight: 26,}}>{section.item.title}</Text>
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
                <SectionList 
                    renderItem={this._renderItem}
                    sections={sections.sections}/>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    },
    cellWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingTop: 10,   
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
});

