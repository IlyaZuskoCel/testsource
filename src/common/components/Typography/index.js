/**
 * Created by aleksandr on 7/20/17.
 * moonion.com
 */

import React from 'react';
import PropTypes from 'prop-types';

import Typography from 'material-ui/Typography';
import {withStyles, createStyleSheet} from 'material-ui/styles';

import Grid from 'material-ui/Grid';


const styleSheet = createStyleSheet('Typography', theme => ({
    root: {
        paddingLeft: 136,
        paddingRight: 136,
        [theme.breakpoints.down('md')]: {
            paddingLeft: 16,
            paddingRight: 16,
        }
    },
    row: {
        marginTop: 40,
    }
}));


const TypographyPage = ({location, classes}) => (
    <Grid container gutter={8} className={classes.root}>
        <Grid item xs={12}>
            <Typography type="headline">Typography</Typography>
        </Grid>


        <Grid item xs={12} className={classes.row}>
            <Typography type="body1">headline</Typography>
            <Typography type="headline">This is a big header</Typography>
        </Grid>

        <Grid item xs={12} style={{backgroundColor: 'black', paddingTop: 20, paddingBottom: 20}}
              className={classes.row}>
            <Typography type="body1" style={{color: 'white'}}>headline</Typography>
            <Typography type="headline" style={{color: 'white'}}>
                This is a big header on dark background
            </Typography>
        </Grid>

        <Grid item xs={12} className={classes.row}>
            <Typography type="body1">title</Typography>
            <Typography type="title">And this is a subtitle</Typography>
        </Grid>
        <Grid item xs={12} className={classes.row}>
            <Typography type="body1">subheading</Typography>
            <Typography type="subheading">This is a smaller subtitle</Typography>
        </Grid>
        <Grid item xs={12} className={classes.row}>
            <Typography type="body1">body2</Typography>
            <Typography type="body2">This is an h4</Typography>
        </Grid>
        <Grid item xs={12} className={classes.row}>
            <Typography type="body1">body1</Typography>
            <Typography type="body1">This is the body copy</Typography>
        </Grid>
        <Grid item xs={12} className={classes.row}>
            <Typography type="body1">caption</Typography>
            <Typography type="caption">This is for really small copy</Typography>
        </Grid>
    </Grid>
);

TypographyPage.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(TypographyPage);