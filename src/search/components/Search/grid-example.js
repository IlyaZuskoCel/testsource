const styleSheet = createStyleSheet('Search', theme => ({
    root : {
    },
    content: {
        maxWidth: 1168,
        marginTop: 56,
        width: '100%',
        margin: 'auto',
    },
    headerContainer: {
        backgroundColor: '#f5f5f5',
    }
    ,
    headerFilters: {
    },
    resultContainer: {
        padding: [40 , 0],

        [theme.breakpoints.down('md')]: {
            padding: [40, 15]
        }
    },
    resultCard: {
        height: 192,

        [theme.breakpoints.down('sm')]: {
            height: 160,
        }
    },
    playerInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundImage: "linear-gradient(to bottom, #f3f3f3, rgba(255, 255, 255, 0.5))",
        height: 150,
        boxSizing: 'border-box',
        padding: [12, 15],
        flex: 1,

        [theme.breakpoints.down('sm')]: {
            height: 120,
        }
    },

    leftStripe: {
        float: 'left',
        width: 4,
        height: 192,
        backgroundColor: '#d7001e',

        [theme.breakpoints.down('sm')]: {
            height: 162
        },
    },

    playerPhoto: {
        width: 126,
        height: 126,

        [theme.breakpoints.down('sm')]: {
            width: 96,
            height: 96,
        }
    },

    playerNameContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: 150,
        flex: 1,

        [theme.breakpoints.down('sm')]: {
            width: 120,
            height: 120,
        }

    },

    nameColumn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        height: 126,
        marginLeft: 29,
    },
    nameFont: {
        fontSize: 32 ,
        marginTop: 20,
    },
    playerLeague: {},

    playerBottomInfo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 40,
        backgroundColor: '#fff',
        padding: [0 , 14]
    },

    playerBottomDivider: {
        width: 1,
        height: 18,
        borderLeft: 'solid 1px #cbcbcb',
        margin: [0 , 8],
    },

    bottomPlayerText: {
        fontSize: 18,
    },

    lastItemInRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
    },

    editIcon: {
        fontSize: 18,
        color: '#c2a24d',
    },

    iconWrapper: {
        width: 20,
        height: 19,
    }

}));

class Search extends Component {

    componentDidMount() {
        this.props.uploadPlayers(1);
    }

    constructor(props) {
        super(props);

        this.state = {
            players: null,
        }
    }

    componentWillReceiveProps(nextProp) {
        this.setState({players : nextProp.players});
    }

    render() {
        const {classes} = this.props;

        return (<div className={classes.root}>
                    <div className={classes.content}>

            <div className={classes.headerContainer}>

                <div className={classes.headerFilters}>
                    <span>future Filters</span>
                </div>

            </div>

            <div className={classes.resultContainer}>
                <Grid container justify="left" gutter={40}>

                    {this.state.players && this.state.players.map(player => {
                        return <Grid item xs={12} md={4} sm={6} key={player.id}>
                            <Paper classes={{root: classes.resultCard}} elevation={1}>
                                <div className={classes.leftStripe}></div>

                                <div className={classes.playerInfo}>
                                    <img src={player.profile_picture || defaultPhoto} className={classes.playerPhoto}  alt="Player's photo"/>

                                    <div className={classes.playerNameContainer}>
                                        <div className={classes.nameColumn}>
                                            <Typography type='title' className={classes.nameFont}>
                                                {player.first_name} {player.last_name}
                                            </Typography>
                                                <Typography type='caption' className={classes.playerLeague}>{player.league || 'Unknown'}</Typography>
                                        </div>
                                    </div>
                                </div>

                                <div className={classes.playerBottomInfo}>

                                    {player.position_short !== 'n/a' && <Typography type='body1' className={classes.bottomPlayerText}>{ player.position_short }</Typography>}
                                    {player.position_short !== 'n/a' && <div className={classes.playerBottomDivider}></div>}

                                    {player.height && <Typography type='body1' className={classes.bottomPlayerText}>{player.height[0] + "'" + player.height[1] + '"'}</Typography>}
                                    {player.height && <div className={classes.playerBottomDivider}></div>}

                                    {player.weight && <Typography type='body1' className={classes.bottomPlayerText}>{parseInt(player.weight) + ' lbs'}</Typography>}
                                    {player.weight && <div className={classes.playerBottomDivider}></div>}

                                    {player.birthday !== 'n/a' && <Typography type='body1' className={classes.bottomPlayerText}>{player.birthday}</Typography>}

                                    <div className={classes.lastItemInRow}>
                                        <div className={classes.playerBottomDivider}></div>
                                        {
                                            player.is_tagged ?  <div className={classes.iconWrapper}><Icon className={classes.editIcon}>star-full</Icon></div> : <div className={classes.iconWrapper}><Icon className={classes.editIcon}>star-empty</Icon></div>
                                        }
                                    </div>

                                </div>

                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </div>
                    </div>
        </div>);
    }
}
