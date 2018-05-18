import React from 'react';

import {Paper, Typography} from 'material-ui';
import classNames from 'classnames';
import defaultPhoto from '../../../user/components/Profile/assets/images/default-photo.png';
import {SHOT_LIST} from "../../../user/constants";


export const Card = (props) => {
    const {classes, user} = props;
    let userPhotoSrc = defaultPhoto;
    if (user.profile_picture) {
        userPhotoSrc = user.profile_picture;
    }
    return (
        <Paper className={classNames(classes.uploadWrap, classes.videoWrap)}>

            <div className={classes.infoLeft}>
                <img className={classes.infoLeftPhoto} src={userPhotoSrc} />
            </div>

            <div className={classes.infoRight}>
                <Typography type="headline"
                            className={classes.infoRightName}>{user.first_name} {user.last_name}
                </Typography>

                <Typography className={classes.infoRightNameInfo}>
                    {user.team}, {user.team_location !== 'n/a' ? `${user.team_location}, ` : ''} {user.team_country}
                </Typography>

                <div className={classes.infoRightColumn}>
                    <div>
                        <Typography type="caption" className={classes.infoRightCaption}>
                            Team
                        </Typography>
                        <Typography type="subheading" className={classes.infoRightValue}>
                            {user.team} - {user.league_short}
                        </Typography>
                    </div>
                </div>

                <div className={classes.info}>
                    <div className={classes.infoRow}>
                        <Typography type="caption" className={classes.infoRightCaption}>
                            Jersey
                        </Typography>
                        <Typography type="body2" className={classes.infoRightValue}>
                            {user.jersey_number || '--'}
                        </Typography>
                    </div>

                    <div className={classes.infoRow}>
                        <Typography type="caption" className={classes.infoRightCaption}>
                            Position
                        </Typography>
                        <Typography type="body2" className={classes.infoRightValue}>
                            {user.position_full || 'Unknown'}
                        </Typography>
                    </div>

                    {user.shot && (
                        <div className={classes.infoRow}>
                            <Typography type="caption" className={classes.infoRightCaption}>Shot</Typography>
                            <Typography type="body2" className={classes.infoRightValue}>
                                {SHOT_LIST[user.shot]}
                            </Typography>
                        </div>
                    )}
                </div>
            </div>

        </Paper>
    )
};