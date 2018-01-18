/**
 * Created by aleksandr on 8/30/17.
 * moonion.com
 */


import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {withStyles, createStyleSheet} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Hidden from 'material-ui/Hidden';


const styleSheet = createStyleSheet('Trim', theme => ({
    root: {
        [theme.breakpoints.down('md')]: {
            paddingLeft: 16,
            paddingRight: 16,
        }
    },
    title: {
        [theme.breakpoints.down('md')]: {
            textAlign: "left"
        }
    },
    desc: {
        marginTop: 32,
        marginBottom: 32,

    },
    uploadWrap: {
        marginBottom: 16,
        [theme.breakpoints.up('md')]: {
            margin: 16,
        },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    uploadWrapHeight: {
        margin: 'auto',
        width: '50%'

    },
    range: {
        padding: 16,
        position: 'relative'
    },
    buttons: {
        marginTop: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    video: {
        width: '100%'
    },
    imageBg: {
        maxWidth: '100%',
        minWidth: '100%'
    },
    opacityBg: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    imageWrap: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    imageCircle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    divCircle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    circle: {
        borderRadius: '50%',
        border: 'solid 2px #ccad51',
        height: 0,
        width: 0,
        overflow: 'hidden',
        position: 'relative'

    }
}));


const getImage = (image, x, y, r, lineWidth, width, height) => {

    x = parseInt(x);
    y = parseInt(y);
    r = parseInt(r);
    const canvas2 = document.createElement('canvas');
    const context2 = canvas2.getContext('2d');
    canvas2.width = r * 2;
    canvas2.height = r * 2;


    context2.beginPath();
    context2.arc(r, r, r, 0, Math.PI * 2, true);
    context2.closePath();
    context2.fill();
    context2.globalCompositeOperation = 'source-in';
    context2.drawImage(image, -1 * x, -1 * y);


    const circle = context2.getImageData(0, 0, r * 2, r * 2);


    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    context.drawImage(image, 0, 0);
    context.save();
    context.globalCompositeOperation = "multiply";

    context.fillStyle = "black";
    context.globalAlpha = 0.6;
    context.fillRect(0, 0, width, height);
    context.restore();


    const data = circle.data;

    const imageData2 = context.getImageData(x, y, r * 2, r * 2);
    const data2 = imageData2.data;
    for (let y = 0; y < r * 2; y++) {
        for (let x = 0; x < r * 2; x++) {
            const red = data[((r * 2 * y) + x) * 4];
            const green = data[((r * 2 * y) + x) * 4 + 1];
            const blue = data[((r * 2 * y) + x) * 4 + 2];

            if (red > 0 || green > 0 || blue > 0) {
                data2[((r * 2 * y) + x) * 4] = red;
                data2[((r * 2 * y) + x) * 4 + 1] = green;
                data2[((r * 2 * y) + x) * 4 + 2] = blue;
            }
        }
    }
    context.putImageData(imageData2, x, y);

    context.filter = 'none';
    context.beginPath();
    context.arc(x + r, y + r, r, 0, 2 * Math.PI, false);
    context.lineWidth = lineWidth;
    context.strokeStyle = '#CCAD51';
    context.stroke();

    return canvas.toDataURL("image/png");

};


class Trim extends Component {
    drag = false;


    constructor(props) {
        super(props);
        this.state = {};
        if (props.video)
            setTimeout(() =>
                    this.setDefaultPosition(props.video.overlay_x, props.video.overlay_y, props.video.width, props.video.height)
                , 100);


    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.video.overlay_x && !this.props.overlay_x && this.props.overlay_x !== nextProps.video.overlay_x)
            || (nextProps.video.overlay_y && !this.props.overlay_y && this.props.overlay_y !== nextProps.video.overlay_y)
            || (nextProps.video.trim_thumb && !this.props.trim_thumb && this.props.trim_thumb !== nextProps.video.trim_thumb)
            || (nextProps.video.thumb_lg && !this.props.thumb_lg && this.props.thumb_lg !== nextProps.video.thumb_lg)
        ) this.setDefaultPosition(nextProps.video.overlay_x, nextProps.video.overlay_y, nextProps.video.width, nextProps.video.height);
    }

    componentDidMount() {
        document.onmousedown = this.startDrag;
        document.onmouseup = this.stopDrag;

        document.ontouchstart = this.startDrag;
        document.ontouchend = this.stopDrag;
    }

    componentWillUnmount() {
        document.onmousedown = null;
        document.onmouseup = null;

        document.ontouchstart = null;
        document.ontouchend = null;
    }
    imageSrcLoad = () => {
        this.setDefaultPosition(this.props.video.overlay_x, this.props.video.overlay_y, this.props.video.width, this.props.video.height);
    };

    setDefaultPosition = (x, y, width, height) => {

        const circle = document.getElementById("circle");
        const imageCircle = document.getElementById("imageCircle");

        const image = document.getElementById("imageSrc");

        if (image.width !== imageCircle.width)
            imageCircle.width = image.width;
        if (image.height !== imageCircle.height)
            imageCircle.height = image.height;


        const left = Math.max(x * image.width / width - 2, 0);

        const top = Math.max(y * image.height / height - 2, 0);

        const radius = Math.max(Math.round(width / 20) * image.width / width, Math.round(height / 20) * image.height / height);

        circle.style['margin-left'] = left + 'px';
        circle.style['margin-top'] = top + 'px';


        circle.style.width = radius * 2 + 'px';
        circle.style.height = radius * 2 + 'px';

        imageCircle.style.left = (-1 * (left + 2)) + 'px';
        imageCircle.style.top = (-1 * (top + 2)) + 'px';

    };

    startDrag = (e) => {
        if (!e) {
            e = window.event;
        }

        const el = e.target ? e.target : e.srcElement;

        if (el.id !== 'circle' && el.id !== 'divCircle') return;
        if (e.preventDefault) e.preventDefault();

        document.body.style.overflow = 'hidden';

        const imageSrc = document.getElementById("imageSrc");
        const imageCircle = document.getElementById("imageCircle");

        if (imageSrc.width !== imageCircle.width)
            imageCircle.width = imageSrc.width;
        if (imageSrc.height !== imageCircle.height)
            imageCircle.height = imageSrc.height;


        const circle = document.getElementById("circle");

        const x = e.clientX || e.touches[0].clientX;
        const y = e.clientY || e.touches[0].clientY;

        this.offsetX = x;
        this.offsetY = y;

        // assign default values for top and left properties
        if (!circle.style['margin-left']) circle.style['margin-left'] = '0px';
        if (!circle.style['margin-top']) circle.style['margin-top'] = '0px';

        // calculate integer values for top and left
        // properties
        this.coordX = parseInt(circle.style['margin-left']);
        this.coordY = parseInt(circle.style['margin-top']);
        this.drag = true;

        // move div element
        document.onmousemove = this.dragging;
        document.ontouchmove = this.dragging;


        return false;
    };
    dragging = (e) => {

        if (!this.drag) return;
        if (!e) e = window.event;

        e.preventDefault();
        const circle = document.getElementById("circle");
        const imageCircle = document.getElementById("imageCircle");
        const imageWrap = document.getElementById("imageWrap");

        const width = imageWrap.offsetWidth;
        const height = imageWrap.offsetHeight;

        const x = e.clientX || e.touches[0].clientX;
        const y = e.clientY || e.touches[0].clientY;

        let left = this.coordX + x - this.offsetX;
        let top = this.coordY + y - this.offsetY;
        if (left < 0)
            left = 0;
        if (left > width - circle.offsetWidth)
            left = width - circle.offsetWidth;

        if (top < 0)
            top = 0;
        if (top > height - circle.offsetHeight)
            top = height - circle.offsetHeight;


        circle.style['margin-left'] = left + 'px';
        circle.style['margin-top'] = top + 'px';

        imageCircle.style.left = (-1 * (left + 2)) + 'px';
        imageCircle.style.top = (-1 * (top + 2)) + 'px';


        return false;
    };
    stopDrag = () => {

        if (!this.drag) return;
        document.body.style.overflow = 'auto';
        this.drag = false;
        document.onmousemove = null;
        document.ontouchmove = null;


        const width = this.props.video.width;
        const height = this.props.video.height;

        const circle = document.getElementById("circle");
        const image = document.getElementById("imageSrc");

        const border = 2 * this.props.video.width / image.width;
        const x = Math.round(parseInt(circle.style['margin-left']) * width / image.width + border);
        const y = Math.round(parseInt(circle.style['margin-top']) * height / image.height + border);
        const r = Math.round(parseInt(circle.style.width) / 2 * Math.max(width / image.width, height/image.height) + border / 2);

        const uri = getImage(image, x, y, r, border, this.props.video.width, this.props.video.height);

        this.props.updateField('overlay_x', x);
        this.props.updateField('overlay_y', y);
        this.props.updateField('overlayUri', uri);

    };

    render() {
        const {classes, video} = this.props;
        return <div className={classes.root}>
            <Typography className={classes.title} type="subheading" align="center">
                Drag the marker to position it over yourself
            </Typography>
            <Typography className={classes.desc} type="body1">
                This is how the scout identifies you. Drag to move the marker.
            </Typography>

            <Paper
                className={classNames(classes.uploadWrap, {[classes.uploadWrapHeight]: this.props.video.height > this.props.video.width})}
                id="image">

                <img src={video.trim_thumb || video.thumb_lg} className={classes.imageBg} id="imageSrc" onLoad={this.imageSrcLoad}/>
                <div className={classes.opacityBg}/>
                <div className={classes.imageWrap} id="imageWrap">
                    <div className={classes.circle} id="circle">
                        <img src={video.trim_thumb || video.thumb_lg} className={classes.imageCircle} id="imageCircle"/>
                        <div className={classes.divCircle} id="divCircle"/>

                    </div>
                </div>
            </Paper>

            <div className={classes.buttons}>
                <Button onClick={this.props.onPrev} raised>
                    Previous
                </Button>

                <Hidden only={['md', 'lg', 'xl']}>
                    <Button onClick={this.props.onNext} raised
                            color={video.time_end - video.time_start > 60000 ? 'default' : 'primary'}
                            disabled={video.time_end - video.time_start > 60000}>
                        Next
                    </Button>
                </Hidden>

            </div>
        </div>;
    }
}

Trim.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Trim);