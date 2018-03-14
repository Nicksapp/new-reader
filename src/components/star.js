import React from 'react';
import { View, Text, StyleSheet, Platform} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 *  point
 */
export default class Star extends React.Component {
    constructor(props) {
        super(props);
        this.total = this.props.total || 5;
        let stars = this.props.stars || 0; //评分
        this.state = {
            starArr: [0,0,0,0,0],
            stars
        }
    }
    
    componentWillMount() {
        const temp = this.state.stars / 2;
        const tempStarArr = [0,0,0,0,0];
        if (temp > 0) {
            const tempFir = Math.floor(temp);
            const tempSec = temp - tempFir;
            for (let i = 0; i < tempFir; i++) {
                tempStarArr[i] = 1
            }
            if (tempSec > 0) {
                tempStarArr[tempFir] = 0.5;
            }
            this.setState({
                starArr: tempStarArr
            })
        }
    }

    render() {

        return (
            <View style={styles.cellContainer}>
                {this.state.starArr.map((val, index) => {
                    let sign = val === 0.5 ? '-half' : '-outline';
                    return(
                        <Ionicons
                            name={Platform.OS === 'ios'
                                ? `ios-star${val === 1 ? '' : sign }`
                                : `md-star${val === 1 ? '' : sign }`}
                            size={14}
                            style={{ color: '#f4ae4b' }}
                            key={index}
                        />
                    )  
                })}
            </View>

        )
    }
    
}

const styles = StyleSheet.create({
    cellContainer: {
        flexDirection: 'row'
    },
    
});