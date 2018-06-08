import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import compose from 'recompose/compose';
import withWidth from 'material-ui/utils/withWidth';

import Slider, {Range, createSliderWithTooltip} from 'rc-slider';
import Tooltip from 'rc-tooltip';

import {PLAYER_MAX_AGE, PLAYER_MIN_AGE} from "../../constants/playerSettings";

const Handle = Slider.Handle;

const styleSheet = createStyleSheet('RangeSlider', theme => ({
    root: {
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    labelContainer: {
        fontFamily: 'UnitedSansReg-Medium',
        fontSize: 14,
        color: '#9b9b9b;',
    }
}));


const handle = ({tipFormatter}) => (props) => {
    const {value, dragging, index, ...restProps} = props;
    return (
        <Tooltip
            prefixCls="rc-slider-tooltip"
            overlay={tipFormatter ? tipFormatter(value, index) : value}
            visible={true}
            placement={index === 0 ? 'topRight' : 'topLeft'}
            key={index}
        >
            <Handle value={value} {...restProps} />
        </Tooltip>
    );
};

class RangeSlider extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {classes, label, ...props} = this.props;

        return (<div>
            {label && <div className={classes.labelContainer}>
                {label}
            </div>}
            <div className={classes.root}>
                <Slider.Range allowCross={false}
                              handle={handle(this.props)}
                              {...props}
                />
            </div>
        </div>)
    }
}

RangeSlider.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styleSheet), withWidth())(RangeSlider);