import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import compose from 'recompose/compose';
import withWidth from 'material-ui/utils/withWidth';

import Slider, { Range , createSliderWithTooltip } from 'rc-slider';

import 'rc-slider/assets/index.css';
import './assets/style.css';

import {PlAYER_MAX_AGE , PLAYER_MIN_AGE} from "../../constants/playerSettings";

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

        this.onAfterChange = this.onAfterChange.bind(this);


        this.state = {
            range: [PLAYER_MIN_AGE , PlAYER_MAX_AGE]
        }
    }

    onAfterChange(value) {
        // this.props.onChange(value);
        // console.log(value);
        // this.setState({range : value} , () => {
        //     console.log(this.state.range);
        // })

        this.props.onChange(value);
    }



    render() {
        const RangeTips = createSliderWithTooltip(Slider.Range);
        const {classes} = this.props;

        return (<div className={classes.root}>
                <RangeTips allowCross={false}
                       min={PLAYER_MIN_AGE}
                       max={PlAYER_MAX_AGE}
                       defaultValue={this.props.values}
                           tipFormatter={value => `${value}`}
                           tipProps={this.topFormatter}
                           onAfterChange={this.onAfterChange}
                />
        </div>)
    }
}

RangeSlider.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styleSheet), withWidth())(RangeSlider);