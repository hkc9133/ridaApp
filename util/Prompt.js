import React, { Component, PropTypes } from 'react';
import {
    Modal,
    Platform,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import styles from './styles';

export default class Prompt extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        visible: PropTypes.bool,
        defaultValue: PropTypes.string,
        placeholder: PropTypes.string,
        defaultValueSecond: PropTypes.string,
        placeholderSecond: PropTypes.string,
        onCancel: PropTypes.func.isRequired,
        cancelText: PropTypes.string,
        onSubmit: PropTypes.func.isRequired,
        submitText: PropTypes.string,
        onChangeText: PropTypes.func.isRequired,
        borderColor: PropTypes.string,
        promptStyle: PropTypes.object,
        titleStyle: PropTypes.object,
        buttonStyle: PropTypes.object,
        buttonTextStyle: PropTypes.object,
        submitButtonStyle: PropTypes.object,
        submitButtonTextStyle: PropTypes.object,
        cancelButtonStyle: PropTypes.object,
        cancelButtonTextStyle: PropTypes.object,
        inputStyle: PropTypes.object,
        textInputProps: PropTypes.object,
    };

    static defaultProps = {
        visible: false,
        defaultValue: '',
        defaultValueSecond:'',
        cancelText: 'Cancel',
        submitText: 'OK',
        borderColor:'#ccc',
        promptStyle: {},
        titleStyle: {},
        buttonStyle: {},
        buttonTextStyle: {},
        submitButtonStyle: {},
        submitButtonTextStyle: {},
        cancelButtonStyle: {},
        cancelButtonTextStyle: {},
        inputStyle: {},
        onChangeText: () => {},
    };

    state = {
        value: '',
        valueSecond: '',
        visible: false,
    };

    componentDidMount() {
        this.setState({value: this.props.defaultValue,valueSecond:this.props.defaultValueSecond});
    }

    componentWillReceiveProps(nextProps) {
        const { visible, defaultValue,defaultValueSecond } = nextProps;
        this.setState({ visible, value:defaultValue,valueSecond:defaultValueSecond });
    }

    _onChangeText = (value) => {
        this.setState({ value });
        this.props.onChangeText(value);
    }

    _onChangeTextSecond=(valueSecond)=>{
        this.setState({ valueSecond });
        this.props.onChangeText(valueSecond);
    }

    _onSubmitPress = () => {
        const { value,valueSecond } = this.state;
        this.props.onSubmit(value,valueSecond);
    };

    _onCancelPress = () => {
        this.props.onCancel();
    };

    close = () => {
        this.setState({visible: false});
    };

    _renderDialog = () => {
        const {
            title,
            placeholder,
            placeholderSecond,
            defaultValue,
            defaultValueSecond,
            cancelText,
            submitText,
            borderColor,
            promptStyle,
            titleStyle,
            buttonStyle,
            buttonTextStyle,
            submitButtonStyle,
            submitButtonTextStyle,
            cancelButtonStyle,
            cancelButtonTextStyle,
            inputStyle
        } = this.props;
        return (
            <View style={styles.dialog} key="prompt">
                <View style={styles.dialogOverlay}/>
                <View style={[styles.dialogContent, { borderColor }, promptStyle]}>
                    <View style={[styles.dialogTitle, { borderColor }]}>
                        <Text style={[styles.dialogTitleText, titleStyle]}>
                            { title }
                        </Text>
                    </View>
                    <View style={styles.dialogBody}>
                        <TextInput
                            style={[styles.dialogInput, inputStyle]}
                            defaultValue={defaultValue}
                            onChangeText={this._onChangeText}
                            placeholder={placeholder}
                            autoFocus={true}
                            underlineColorAndroid="white"
                            {...this.props.textInputProps} />
                        <TextInput
                            style={[styles.dialogInput, inputStyle]}
                            defaultValue={defaultValueSecond}
                            onChangeText={this._onChangeTextSecond}
                            placeholder={placeholderSecond}
                            autoFocus={true}
                            underlineColorAndroid="white"
                            {...this.props.textInputProps} />
                    </View>
                    <View style={[styles.dialogFooter, { borderColor }]}>
                        <TouchableWithoutFeedback onPress={this._onCancelPress}>
                            <View style={[styles.dialogAction, buttonStyle, cancelButtonStyle]}>
                                <Text style={[styles.dialogActionText, buttonTextStyle, cancelButtonTextStyle]}>
                                    {cancelText}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this._onSubmitPress}>
                            <View style={[styles.dialogAction, buttonStyle, submitButtonStyle]}>
                                <Text style={[styles.dialogActionText, buttonTextStyle, submitButtonTextStyle]}>
                                    {submitText}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
        );
    };

    render() {
        return (
            <Modal onRequestClose={() => this.close()} transparent={true} visible={this.props.visible}>
                {this._renderDialog()}
            </Modal>
        );
    }
};
