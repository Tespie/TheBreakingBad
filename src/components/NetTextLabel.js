import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";
import propTypes from 'prop-types'

export default class NetTextLabel extends Component {
    //REVIEW:  Props
    static propTypes = {
        onPress: propTypes.func,
        style: propTypes.any,
        ellipsizeMode: propTypes.any,
        numberOfLines: propTypes.any,
        label: propTypes.any,
    };
    //REVIEW:  render
    render() {
        const { style, onPress, ellipsizeMode, numberOfLines, label } = this.props;
        return (
            <Text
                numberOfLines={numberOfLines}
                ellipsizeMode={ellipsizeMode}
                onPress={onPress}
                style={style}
            >
                {label}
            </Text>
        );
    }
}
//REVIEW: SytleSheet
const styles = StyleSheet.create({
})


