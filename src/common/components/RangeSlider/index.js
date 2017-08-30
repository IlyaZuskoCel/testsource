import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import compose from 'recompose/compose';
import withWidth from 'material-ui/utils/withWidth';

import Slider, { Range , createSliderWithTooltip } from 'rc-slider';

import 'rc-slider/assets/index.css';
import './assets/style.css';

const styleSheet = createStyleSheet('RangeSlider' , theme => ({
    root: {
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
}));

class RangeSlider extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.onChangeComplete = this.onChangeComplete.bind(this);
    }


    handleChange(value) {
        this.setState({range : value});
        console.log('We are changing input right now');
    }

    onChangeComplete() {
        console.log('finishing validation');
    }

    render() {
        const RangeTips = createSliderWithTooltip(Slider.Range);
        const {
            classes,
            className,
            disabled,
            error,
            id,
            label,
            labelClassName,
            InputLabelProps,
            helperText,
            helperTextClassName,
            FormHelperTextProps,
            fullWidth,
            required,
            rootRef,
            value,
        } = this.props;


        return (<div className={classes.root}>
                <RangeTips allowCross={false}
                       min={this.props.min}
                       max={this.props.max}
                       defaultValue={[this.props.min , this.props.max]}
                           value={this.props.value}
                           tipFormatter={value => `${value}`}
                           onChange={this.props.onChange}
                />
        </div>)
    }
}


RangeSlider.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styleSheet), withWidth())(RangeSlider);