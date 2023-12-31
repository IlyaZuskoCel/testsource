/**
 * Created by aleksandr on 7/28/17.
 * moonion.com
 */

import React from 'react';

import {create as createJss} from 'jss';
import {JssProvider} from 'react-jss';
import vendorPrefixer from 'jss-vendor-prefixer';
import jssPresetDefault from 'jss-preset-default';


import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';



const theme = (outerTheme) => {
    const typography = {
        fontFamily: "UnitedSansReg-Medium",
        fontSize: 18,
        fontWeight: 500,
        [outerTheme.breakpoints.down('md')]: {
            fontSize: 14,
        },

        fontWeightLight: 900,
        fontWeightRegular: 500,
        fontWeightMedium: 500,


        display4: {
            fontSize: 112,
            fontWeight: 900,
            fontFamily: "UnitedSansReg-Medium",
            letterSpacing: '-.04em',
            lineHeight: 1,
            color: '#000',
        },
        display3: {
            fontSize: 56,
            fontWeight: 500,
            fontFamily: "UnitedSansReg-Medium",
            letterSpacing: '-.02em',
            lineHeight: 1.35,
            color: '#000',
        },
        display2: {
            fontSize: 45,
            fontWeight: 500,
            fontFamily: "UnitedSansReg-Medium",
            lineHeight: '48px',
            color: '#000',
        },
        display1: {
            fontSize: 34,
            fontWeight: 500,
            fontFamily: "UnitedSansReg-Medium",
            lineHeight: '40px',
            color: '#000',
        },


        headline: {
            fontSize: 60,
            lineHeight: '60px',
            fontWeight: 900,
            letterSpacing: 0.6,
            color: '#000',
            fontFamily: "UnitedSerifCond-Black",
            [outerTheme.breakpoints.down('md')]: {
                fontSize: 40,
                lineHeight: '40px',
                letterSpacing: 0.4,
            }
        },
        title: {
            fontSize: 40,
            lineHeight: '40px',
            fontWeight: 900,
            letterSpacing: 0.4,
            color: '#000',
            fontFamily: "UnitedSerifCond-Heavy",
            [outerTheme.breakpoints.down('md')]: {
                fontSize: 32,
                lineHeight: '32px',
                letterSpacing: 0.2,
            }
        },

        subheading: {
            fontSize: 32,
            lineHeight: '32px',
            fontWeight: 500,
            letterSpacing: 0.4,
            color: '#000',
            fontFamily: "UnitedSerifCond-Medium",
            [outerTheme.breakpoints.down('md')]: {
                fontSize: 24,
                lineHeight: '24px',
                letterSpacing: 0.2,
            }
        },
        body2: {
            fontSize: 22,
            fontWeight: 900,
            letterSpacing: 0.7,
            lineHeight: '22px',
            color: '#000',
            fontFamily: "UnitedSerifCond-Heavy",
            [outerTheme.breakpoints.down('md')]: {
                fontSize: 20,
                lineHeight: '20px',
                letterSpacing: 0.6,
            }
        },
        body1: {
            fontSize: 18,
            lineHeight: '18px',
            fontWeight: 500,
            color: '#000',
            fontFamily: "UnitedSansReg-Medium",
            [outerTheme.breakpoints.down('md')]: {
                fontSize: 14,
                lineHeight: '14px',
            }
        },
        caption: {
            fontSize: 14,
            lineHeight: '14px',
            fontWeight: 500,
            letterSpacing: 0.4,
            color: '#9b9b9b',
            fontFamily: "UnitedSansReg-Medium",
        },
        button: {
            fontSize: 20,
            lineHeight: '20px',
            textTransform: 'uppercase',
            fontWeight: 900,
            fontFamily: 'UnitedSansSemiCond-Heavy',
            letterSpacing: '0.4px',
            [outerTheme.breakpoints.down('md')]: {
                fontSize: 16,
                lineHeight: '16px',
                letterSpacing: '0.3px',
            },
        },
    };

    const palette = {
        ...outerTheme.palette,
        error: {
            ...outerTheme.palette.error,
            A400: '#d7001e'
        },
        primary: {
            ...outerTheme.palette.primary,
            A200: '#c2a24d',
            A700: '#c2a24d',
            500: '#c2a24d'
        },
        accent: {
            ...outerTheme.palette.accent,
            A100: '#eb3941',
            A400: '#d7001e'

        },
        input: {
            ...outerTheme.palette.input,
            bottomLine: '#cbcbcb'

        },
        text: {
            ...outerTheme.palette.text,
            disabled: '#cbcbcb'
        }

    };

    const MuiInputPlaceholder = {
        opacity: 1,
        color: '#cbcbcb'
    };


    return {
        ...outerTheme,
        palette,
        typography,

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
                    ...typography.button,
                    height: 40,
                    backgroundColor: 'transparent',
                    borderRadius: 0,
                    lineHeight: '20px',
                    fontWeight: 900,
                    textAlign: 'center',
                    padding: '8px 16px',


                    [outerTheme.breakpoints.down('md')]: {
                        minWidth: 120,
                    },


                    '&:hover': {
                        textDecoration: 'none',
                        backgroundColor: 'transparent',
                        color: '#d7001e',
                        '&$disabled': {
                            backgroundColor: '#cbcbcb',
                            color: '#fff',
                        },
                    }
                },
                flatPrimary: {
                    color: '#d7001e',

                },
                raised: {
                    minWidth: 160,
                    boxShadow: '0 0 7px 0 rgba(0, 0, 0, 0.3)',
                    backgroundColor: '#ffffff',
                    color: '#d7001e',
                    '&:hover': {
                        backgroundColor: '#f5f5f5'
                    },
                    '&$disabled': {
                        color: '#fff',
                        backgroundColor: '#cbcbcb',
                    },
                },
                raisedPrimary: {
                    backgroundImage: 'linear-gradient(284deg, #f55e58, #c9011b)',
                    color: '#ffffff',
                    '&:hover': {
                        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), linear-gradient(284deg, #f55e58, #d7002b)',
                        color: '#ffffff',
                    },

                    [outerTheme.breakpoints.down('md')]: {
                        backgroundImage: 'linear-gradient(288deg, #f55e58, #c9011b)',
                    },
                }
            },
            MuiMenuItem: {
                root: {
                    ...typography.body1,
                    minWidth: 100,
                    padding: 0,
                    height: 40,

                    '&:focus': {
                        background: 'transparent',
                    },

                    '&:hover': {
                        textDecoration: 'none',
                        backgroundColor: 'transparent',
                        color: '#d7001e',
                    },

                },
                selected: {
                    textDecoration: 'none',
                    backgroundColor: 'transparent',
                    color: '#d7001e',
                }
            },
            MuiMenu: {
                root: {
                    borderRadius: 0
                }
            },
            MuiList: {
                padding: {

                    paddingTop: 8,
                    paddingBottom: 4,
                    paddingLeft: 12,
                    paddingRight: 12,
                    [outerTheme.breakpoints.down('md')]: {}
                }
            },
            MuiDrawer: {
                paper: {
                    [outerTheme.breakpoints.down('md')]: {
                        paddingLeft: 12,
                        paddingRight: 12,
                    }
                }

            },
            MuiInput: {
                input: {
                    ...typography.body2,
                    paddingLeft: 8,
                    paddingRight: 8,
                    '&::-webkit-input-placeholder': MuiInputPlaceholder,
                    '&::-moz-placeholder': MuiInputPlaceholder, // Firefox 19+
                    '&:-ms-input-placeholder': MuiInputPlaceholder, // IE 11
                    '&::-ms-input-placeholder': MuiInputPlaceholder, // Edge
                },
                inputMultiline: {
                    ...typography.body1,
                    resize: 'none',
                    overflow: 'auto',
                    paddingLeft: 8,
                    paddingRight: 8,

                },
                disabled: {
                    '&:parent': {
                        paddingLeft: 80,
                    }
                },
                inputDisabled: {
                    color: '#000'
                },
                error: {
                    '&:after': {
                        backgroundColor: palette.error.A400,
                        transform: 'scaleX(1)', // error is always underlined in red
                        height: 1
                    },
                },
                inkbar: {
                    '&:after': {
                        backgroundColor: '#cbcbcb'
                    },
                    '&$focused:after': {
                        transform: 'scaleX(1)',
                        height: 1
                    },
                },
                underline: {
                    '&:hover:not($disabled):before': {
                        backgroundColor: '#cbcbcb',
                        height: 1,
                    },

                    '&$disabled:before': {
                        backgroundColor: '#cbcbcb',
                        height: 1,
                    },
                }
            },
            MuiFormLabel: {
                root: {
                    paddingLeft: 8,
                    paddingRight: 8,
                    ...typography.body1
                },

            },
            MuiFormControlLabel: {
                label: {
                    ...typography.body1
                }
            },
            MuiFormHelperText: {
                root: {
                    paddingLeft: 8,
                    paddingRight: 8,
                    fontSize: 14,
                    fontWeight: '500',
                },
                error: {
                    '&:after': {
                        content: ''
                    }
                }
            },
            MuiCheckbox: {
                default: {
                    color: '#4a4a4a',
                    width: 18,
                    height: 18,
                    marginRight: 11,
                    marginLeft: 10,
                }
            },
            MuiRadio: {
                default: {
                    color: '#4a4a4a',
                    width: 20,
                    height: 20,
                    marginRight: 11,
                    marginLeft: 25,
                }
            },
            MuiSwitch: {
                icon: {
                    width: 16,
                    height: 16,
                    boxShadow: 'unset',
                    backgroundColor: '#e2e2e2',
                    borderStyle: 'solid',
                    borderWidth: 0.5,
                    borderImageSource: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06) 20%, rgba(255, 255, 255, 0.0))',
                    borderImageSlice: 1,
                    [outerTheme.breakpoints.down(425)]: {
                       marginLeft: -10,
                    }
                },
                bar: {
                    border: 'solid 2px #e2e2e2',
                    borderRadius: 100,
                    width: 40,
                    height: 20,
                    backgroundColor: 'transparent',
                    opacity: 1,
                    marginTop: -12,
                    marginLeft: -20,

                },
                checked: {
                    transform: 'translateX(18px)',
                    '& + $bar': {
                        borderColor: palette.primary[500],
                        backgroundColor: 'transparent'
                    },
                    '& $icon': {
                        backgroundColor: '#c2a24d',
                    },

                },
            },
            MuiSnackbar: {
                anchorTopCenter: {
                    zIndex: 1000,
                    top: 80,

                    [outerTheme.breakpoints.down('md')]: {
                        top: 70,
                    }
                }
            },
            MuiSnackbarContent: {
                root: {
                    minHeight: 70,
                    height:'auto',
                    backgroundColor: '#fff',
                    [outerTheme.breakpoints.down('sm')]: {
                        width: 'auto'
                    },
                    [outerTheme.breakpoints.up('sm')]: {
                        width: '100%',
                        maxWidth: 1168,
                    },
                    [outerTheme.breakpoints.down('sm')]: {
                        width: '100%',
                        top: 50,
                        maxWidth: 344,
                    }
                },
                message: {
                    width:'100%'
                }
            },
            MuiTabIndicator: {
                colorAccent: {
                    backgroundColor: '#d7001e'
                }
            },
            MuiTab: {
                root: {
                    ...typography.body2,
                    textTransform: 'none',

                },
                rootInheritSelected: {
                    color: '#d7001e'
                },
                label: {}
            },
            MuiTabs: {
                flexContainer: {
                    // borderBottom: 'solid 1px #cbcbcb60'
                }
            }

        }

    }
};


const outerTheme = createMuiTheme();


//const jss = createJss(jssPresetDefault());
// jss.use(vendorPrefixer());


// const ScoutTheme = ({children, ...props}) => (
//     <JssProvider jss={jss}>
//         <MuiThemeProvider theme={outerTheme}>
//             <MuiThemeProvider theme={theme} {...props}>
//                 {children}
//             </MuiThemeProvider>
//         </MuiThemeProvider>
//     </JssProvider>
// );
const ScoutTheme = (sheetsManager) => ({children, ...props}) => (
    <MuiThemeProvider theme={outerTheme} sheetsManager={sheetsManager}>
        <MuiThemeProvider theme={theme} {...props}>
            {children}
        </MuiThemeProvider>
    </MuiThemeProvider>
);

export default ScoutTheme;