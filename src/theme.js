/**
 * Created by aleksandr on 7/28/17.
 * moonion.com
 */

import React from 'react';
import createTypography from 'material-ui/styles/typography';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';

import 'normalize.css';
import './assets/css/font/UnitedSansReg-Heavy/styles.css';
import './assets/css/font/UnitedSansReg-Medium/styles.css';
import './assets/css/font/UnitedSerifCond-Black/styles.css';
import './assets/css/font/UnitedSerifCond-Bold/styles.css';


const theme = (outerTheme) => {
    const typography = createTypography(outerTheme.palette);
    return {
        ...outerTheme,
        typography: {
            ...typography,

            headline: {
                fontSize: 60,
                fontWeight: 900,
                letterSpacing: 0.6,
                color: '#000',
                fontFamily: "UnitedSerifCond",
                [outerTheme.breakpoints.down('sm')]: {
                    fontSize: 40,
                    letterSpacing: 0.4,
                }
            },
            title: {
                fontSize: 40,
                fontWeight: 900,
                letterSpacing: 0.4,
                color: '#000',
                fontFamily: "UnitedSerifCond",
                [outerTheme.breakpoints.down('sm')]: {
                    fontSize: 32,
                    letterSpacing: 0.2,
                }
            },

            subheading: {
                fontSize: 32,
                fontWeight: 500,
                letterSpacing: 0.4,
                color: '#000',
                fontFamily: "UnitedSerifCond",
                [outerTheme.breakpoints.down('sm')]: {
                    fontSize: 24,
                    letterSpacing: 0.2,
                }
            },
            body2: {
                fontSize: 22,
                fontWeight: 900,
                letterSpacing: 0.7,
                color: '#000',
                fontFamily: "UnitedSerifCond",
                [outerTheme.breakpoints.down('sm')]: {
                    fontSize: 20,
                    letterSpacing: 0.6,
                }
            },
            body1: {
                fontSize: 18,
                fontWeight: 500,
                color: '#000',
                fontFamily: "UnitedSansReg",
                [outerTheme.breakpoints.down('sm')]: {
                    fontSize: 14,
                }
            },
            caption: {
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: 0.4,
                color: '#9b9b9b',
                fontFamily: "UnitedSansReg",
            },
        },

        shadows: [
            "none",
            "0 0 6px 0 rgba(0, 0, 0, 0.2)",
            "0 0 6px 0 rgba(0, 0, 0, 0.2)",
            "0 0 6px 0 rgba(0, 0, 0, 0.2)",
            "0 0 6px 0 rgba(0, 0, 0, 0.2)",
            "0 0 6px 0 rgba(0, 0, 0, 0.2)",
            "0 0 6px 0 rgba(0, 0, 0, 0.2)",
            "0 0 6px 0 rgba(0, 0, 0, 0.2)",
            "0 0 6px 0 rgba(0, 0, 0, 0.2)", //use
            "0 0 6px 0 rgba(0, 0, 0, 0.2)",
            "0 0 6px 0 rgba(0, 0, 0, 0.2)",
            "0 0 6px 0 rgba(0, 0, 0, 0.2)",
            "0 0 6px 0 rgba(0, 0, 0, 0.2)",
            "0 0 6px 0 rgba(0, 0, 0, 0.2)",
            "0 0 6px 0 rgba(0, 0, 0, 0.2)",
            "0 0 6px 0 rgba(0, 0, 0, 0.2)",
            "0 0 6px 0 rgba(0, 0, 0, 0.2)",
            "0 0 6px 0 rgba(0, 0, 0, 0.2)",
            "0 0 6px 0 rgba(0, 0, 0, 0.2)",
            "0 0 6px 0 rgba(0, 0, 0, 0.2)",
            "0 0 6px 0 rgba(0, 0, 0, 0.2)",
            "0 0 6px 0 rgba(0, 0, 0, 0.2)",
            "0 0 6px 0 rgba(0, 0, 0, 0.2)",
            "0 0 6px 0 rgba(0, 0, 0, 0.2)",
            "0 0 6px 0 rgba(0, 0, 0, 0.2)"
        ],
        overrides: {
            MuiButton: {
                root: {
                    height: 40,
                    backgroundColor: 'transparent',
                    borderRadius: 0,
                    fontFamily: 'UnitedSansSemiCond',
                    fontSize: 20,
                    lineHeight: '20px',
                    fontWeight: 900,
                    letterSpacing: '0.4px',
                    textAlign: 'center',
                    padding: '8px 16px',


                    [outerTheme.breakpoints.down('sm')]: {
                        minWidth: 120,
                        fontSize: 16,
                        letterSpacing: '0.3px',
                    },


                    '&:hover': {
                        textDecoration: 'none',
                        backgroundColor: '#f5f5f5',
                        color: '#d7001e',
                        '&$disabled': {
                            backgroundColor: 'transparent',
                        },
                    }
                },
                flatPrimary: {
                    color: '#d7001e',

                },
                raised: {
                    boxShadow: '0 0 7px 0 rgba(0, 0, 0, 0.3)',
                },
                raisedPrimary: {
                    backgroundImage: 'linear-gradient(284deg, #f55e58, #c9011b)',
                    color: '#ffffff',
                    '&:hover': {
                        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), linear-gradient(284deg, #f55e58, #d7002b)',
                        color: '#ffffff',
                    },

                    [outerTheme.breakpoints.down('sm')]: {
                        backgroundImage: 'linear-gradient(288deg, #f55e58, #c9011b)',
                    },
                }
            },
            MuiMenuItem: {
                root: {
                    height: 40,
                    backgroundColor: 'transparent',
                    borderRadius: 0,
                    fontFamily: 'UnitedSansSemiCond',
                    fontSize: 20,
                    lineHeight: '20px',
                    fontWeight: 900,
                    letterSpacing: '0.4px',
                    textTransform: 'uppercase',
                    padding: '8px 4px',
                    minWidth: 160,
                    borderBottom: 'solid 1px #e2e2e2',
                    [outerTheme.breakpoints.down('sm')]: {
                        minWidth: 120,
                        fontSize: 16,
                        letterSpacing: '0.3px',
                        textAlign: 'center',
                        padding: '32px 12px',
                        justifyContent: 'center',
                        borderBottom: 'solid 2px #e2e2e2',
                    },
                    '&:focus': {
                        background: 'transparent',
                    },
                    '&:hover': {
                        textDecoration: 'none',
                        backgroundColor: 'transparent',
                        color: '#d7001e',
                    },
                    '&:last-child': {
                        borderBottom: 0,
                    }
                },
                selected: {
                    textDecoration: 'none',
                    backgroundColor: 'transparent',
                    color: '#d7001e',
                }
            },
            MuiList: {
                padding: {
                    paddingTop: 8,
                    paddingBottom: 4,
                    paddingLeft: 12,
                    paddingRight: 12,
                    [outerTheme.breakpoints.down('sm')]: {}
                }
            },
            MuiDrawer: {
                paper: {
                    [outerTheme.breakpoints.down('sm')]: {
                        paddingLeft: 12,
                        paddingRight: 12,
                    }
                }

            }

        }

    }
};


const outerTheme = createMuiTheme();
const ScoutTheme = ({children, ...props}) => (
    <MuiThemeProvider theme={outerTheme}>
        <MuiThemeProvider theme={theme} {...props}>
            {children}
        </MuiThemeProvider>
    </MuiThemeProvider>
);

export default ScoutTheme;