import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SectionList } from 'react-native';
import { Video } from 'expo';

export default class VideoList extends React.Component {
    constructor(props) {
        super(props);
    }

    _renderItem = (section) => {
        return (
            <View style={styles.cellContainer}>
                <Video
                    source={{ uri: section.item.url }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="contain"
                    useNativeControls={true}
                    style={{ flex: 1, height: 200 }}
                />
                <View style={{flex: 1}}>
                    <Text style={{ fontSize: 16, color: '#333', fontWeight: '600', marginTop: 5, marginBottom: 5 }}>{section.item.title}</Text>
                    <Text style={{fontSize: 12, color: '#666'}}>{section.item.desc}</Text>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <SectionList
                    renderItem={this._renderItem}
                    sections={this.props.source} />
            </View>
        )
    }
    
}
VideoList.defaultProps = {
    source: [],
};


const styles = StyleSheet.create({
    cellContainer: {
        marginBottom: 15
    }
})