import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Modal, ActivityIndicator, TouchableOpacity, Image, Platform } from 'react-native';
import { sizeWidth } from '../utils/Size';
import { Colors } from '../utils/Colors';

const transparent = 'transparent';//Color 
const ANIMATION = ['none', 'slide', 'fade'];//Animation type for modal
const SIZES = ['small', 'normal', 'large'];//Size of Spinner

export default class NetSpinnerOverlay extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visible,    //Spinner visible props
            textContent: this.props.textContent //Text on loading spinner
        };
    }
    //REVIEW: Props 
    static propTypes = {
        cancelable: PropTypes.bool,//For cancle spinnner loading
        color: PropTypes.string,//Color of Spinner
        animation: PropTypes.oneOf(ANIMATION),//Type of animation of modal
        overlayColor: PropTypes.string,//background color of spinner
        size: PropTypes.oneOf(SIZES),//spinner size
        textContent: PropTypes.string,//text on loading spinner
        textStyle: PropTypes.any,//text style on loading spinner
        visible: PropTypes.bool,//spinner visible or not
        indicatorStyle: PropTypes.object,//spinner style
        customIndicator: PropTypes.element,//custom spinner style
        children: PropTypes.element,//Show spinner as children
        spinnerKey: PropTypes.string,//Spinner key
        onClosePress: PropTypes.func
    };
    //REVIEW: Default props 
    static defaultProps = {
        visible: false,//spinner visible or not
        cancelable: false,//For cancle spinnner loading
        textContent: '',//text on loading spinner
        animation: 'none',//Type of animation of modal
        color: 'black',//Color of Spinner
        size: 'large', //spinner size
        overlayColor: 'rgba(0,0,0,0.5)'//background color of spinner
    };

    //REVIEW: Close Modal and hide spinner
    _handleOnRequestClose() {
        if (this.props.cancelable) {
            this.setState({ visible: false });
        }
    }
    //REVIEW: Render
    render() {
        return this._renderSpinner();
    }

    onClosePress = (index) => {
        // alert('called in')
        this.props.onClosePress();
    }

    //REVIEW: Activity Indicator with text
    _renderDefaultContent() {
        // const { onClosePress } = this.props;
        return (
            <View style={{ flex: 1 }}>
                {/* <TouchableOpacity activeOpacity={0.8} onPress={this.onClosePress} style={{ position: 'absolute', height: sizeWidth(7), width: sizeWidth(7), alignSelf: 'flex-end', marginTop: Platform.OS == 'android' ? sizeWidth(5) : sizeWidth(15) , right: sizeWidth(5),zIndex:1 }}>
                    <Image style={{ height: '100%', width: '100%' }} resizeMode="contain" source={Images.closewhite}></Image>
                </TouchableOpacity> */}
                <View style={styles.background}>

                    {this.props.customIndicator ? (
                        this.props.customIndicator
                    ) : (
                        <ActivityIndicator
                            color={this.props.color}
                            size={this.props.size}
                            style={[styles.activityIndicator, { ...this.props.indicatorStyle }]}
                        />
                    )}
                    <View style={[styles.textContainer, { ...this.props.indicatorStyle }]}>
                        <Text style={this.props.textStyle}>
                            {this.state.textContent}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

    //REVIEW: Modal
    _renderSpinner() {
        const spinner = (
            <View
                style={[styles.container, { backgroundColor: this.props.overlayColor }]}
                key={this.props.spinnerKey ? this.props.spinnerKey : `spinner_${Date.now()}`}
            >
                {this.props.children ? this.props.children : this._renderDefaultContent()}
            </View>
        );
        return (
            <Modal
                animationType={this.props.animation} Close Modal
                onRequestClose={() => this._handleOnRequestClose()}
                supportedOrientations={['landscape', 'portrait']}
                transparent
                visible={this.props.visible}
            >
                {spinner}
            </Modal>
        );
    }

}
//REVIEW: StyleSheet
const styles = StyleSheet.create({
    activityIndicator: { flex: 1 },
    background: { alignItems: 'center', bottom: 0, justifyContent: 'center', left: 0, position: 'absolute', right: 0, top: 0 },
    container: { backgroundColor: transparent, bottom: 0, flex: 1, position: 'absolute', top: 0, left: 0, right: 0 },
    textContainer: { alignItems: 'center', bottom: 0, flex: 1, justifyContent: 'center', left: 0, position: 'absolute', right: 0, top: 0 },
    textContent: { fontSize: sizeWidth(5), fontWeight: 'bold', height: 50, top: 80, color: Colors.COLOR_WHITE }
});
