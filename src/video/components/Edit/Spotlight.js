/**
 * Created by aleksandr on 8/30/17.
 * moonion.com
 */


import React, {Component} from 'react';
import PropTypes from 'prop-types';


import {withStyles, createStyleSheet} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Hidden from 'material-ui/Hidden';


const styleSheet = createStyleSheet('Trim', theme => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            paddingLeft: 16,
            paddingRight: 16,
        }
    },
    title: {
        [theme.breakpoints.down('sm')]: {
            textAlign: "left"
        }
    },
    desc: {
        marginTop: 32,
        marginBottom: 32,

    },
    uploadWrap: {
        marginBottom: 16,
        [theme.breakpoints.up('sm')]: {
            margin: 16,
        },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
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
        height: 100,
        width: 100,
        overflow: 'hidden',
        position: 'relative'

    }
}));


const getImage = (image, x, y, r, lineWidth) => {

    x = parseInt(x);
    y = parseInt(y);
    r = parseInt(r);
    const canvas2 = document.createElement('canvas');
    const context2 = canvas2.getContext('2d');
    canvas2.width = r * 2;
    canvas2.height = r * 2;


    context2.beginPath();
    //x, y, radius, startAngle, endAngle, anticlockwise
    context2.arc(r, r, r, 0, Math.PI * 2, true);
    context2.closePath();
    context2.fill();//рисуем закрашенную фигуру.
    /*теперь задаем наложение для картинки. При таком наложении,отображается только та часть новой фигуры, которая накладыва-
    ется на старую. Остальные части новой и старой фигур не выводятся;*/
    context2.globalCompositeOperation = 'source-in';
    context2.drawImage(image, -1 * x, -1 * y);


    const circle = context2.getImageData(0, 0, r * 2, r * 2);


    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    context.filter = 'brightness(30%)';
    context.drawImage(image, 0, 0);

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
    state = {image: false};
    drag = false;

    image = '';

    componentDidMount() {
        document.onmousedown = this.startDrag;
        document.onmouseup = this.stopDrag;

        document.ontouchstart = this.startDrag;
        document.ontouchend = this.stopDrag;

        const video = document.getElementById("video");
        if (this.props.video.time_start)
            video.currentTime = this.props.video.time_start / 1000;
    }

    componentWillUnmount() {
        document.onmousedown = null;
        document.onmouseup = null;

        document.ontouchstart = null;
        document.ontouchend = null;
    }

    handlePlay = () => {
        const video = document.getElementById("video");
        video.pause();
        const width = video.videoWidth;
        const height = video.videoHeight;
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);
        this.image = canvas.toDataURL("image/png");

        this.setState({image: true}, () => {
            const circle = document.getElementById("circle");
            const imageCircle = document.getElementById("imageCircle");


            const image = document.getElementById("imageSrc");

            if (image.width !== imageCircle.width)
                imageCircle.width = image.width;
            if (image.height !== imageCircle.height)
                imageCircle.height = image.height;


            const left = this.props.video.overlay_x * image.width / width - 2;
            const top = this.props.video.overlay_y * image.height / height - 2;


            circle.style['margin-left'] = left + 'px';
            circle.style['margin-top'] = top + 'px';

            imageCircle.style.left = (-1 * (left + 2)) + 'px';
            imageCircle.style.top = (-1 * (top + 2)) + 'px';
        });


    };


    startDrag = (e) => {
        if (!e) {
            e = window.event;
        }

        const el = e.target ? e.target : e.srcElement;
        this.setState({tmp: el.id});
        if (el.id !== 'circle' && el.id !== 'divCircle') return;
        if (e.preventDefault) e.preventDefault();
        const imageSrc = document.getElementById("imageSrc");
        const imageCircle = document.getElementById("imageCircle");

        if (imageSrc.width !== imageCircle.width)
            imageCircle.width = imageSrc.width;
        if (imageSrc.height !== imageCircle.height)
            imageCircle.height = imageSrc.height;


        const circle = document.getElementById("circle");

        this.offsetX = e.clientX;
        this.offsetY = e.clientY;

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
        const circle = document.getElementById("circle");
        const imageCircle = document.getElementById("imageCircle");
        const imageWrap = document.getElementById("imageWrap");

        const width = imageWrap.offsetWidth;
        const height = imageWrap.offsetHeight;


        let left = this.coordX + e.clientX - this.offsetX;
        let top = this.coordY + e.clientY - this.offsetY;
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
        this.drag = false;
        document.onmousemove = null;
        document.ontouchmove = null;

        const circle = document.getElementById("circle");
        const image = document.getElementById("imageSrc");

        const imageObj = new Image();
        imageObj.onload = () => {
            const border = 2 * imageObj.width / image.width;
            const x = (parseInt(circle.style['margin-left'])) * imageObj.width / image.width + border;
            const y = (parseInt(circle.style['margin-top'])) * imageObj.height / image.height + border;
            const r = 50 * imageObj.width / image.width + border / 2;

            const uri = getImage(imageObj, x, y, r, border);

            this.props.updateField('overlay_x', Math.round(x));
            this.props.updateField('overlay_y', Math.round(y));
            this.props.updateField('overlayUri', uri);

        };

        imageObj.src = this.image;


    };

    render() {
        const {classes, video} = this.props;
        return <div className={classes.root}>
            <Typography className={classes.title} type="subheading" align="center">
                Drag the marker to position it over yourself
            </Typography>
            <Typography className={classes.desc} type="body1">
                This is how the scout identifies you. Pinch and drag with 2 fingers to resize the marker.
                {this.state.tmp}
            </Typography>

            {this.state.image ? (
                <Paper className={classes.uploadWrap} id="image">

                    <img src={this.image} className={classes.imageBg} id="imageSrc"/>
                    <div className={classes.opacityBg}/>
                    <div className={classes.imageWrap} id="imageWrap">
                        <div className={classes.circle} id="circle">
                            <img src={this.image} className={classes.imageCircle} id="imageCircle"/>
                            <div className={classes.divCircle} id="divCircle"/>

                        </div>
                    </div>
                </Paper>
            ) : (
                <Paper className={classes.uploadWrap} id="image">
                    <video src={video.video_path}
                           id="video"
                           autoPlay
                           preload
                           className={classes.video}
                           onPlay={this.handlePlay}
                           controls/>
                </Paper>
            )}


            <div className={classes.buttons}>
                <Button onClick={this.props.onPrev} raised>
                    Previous
                </Button>

                <Hidden smUp>
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