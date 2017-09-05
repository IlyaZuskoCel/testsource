/**
 * Created by aleksandr on 7/20/17.
 * moonion.com
 */


export const PLAYER_ROLE = 'Player';
export const SCOUT_ROLE = 'General Manager/Head Coach';


export const GENDER_MALE = '1';
export const GENDER_FEMALE = '2';
export const SHOT_RIGHT = '1';
export const SHOT_LEFT = '2';


export const POS_FL = '1'; // Left Forward
export const POS_FR = '2'; // Right Forward
export const POS_C = '3'; //  Center
export const POS_DL = '4'; // Left Defense
export const POS_DR = '5'; // Right Defense
export const POS_G = '6'; // Goalie


export const POS_HC = '7'; // Head Coach
export const POS_GM = '8'; // General Manager
export const POS_AC = '9'; // Assistant Coach
export const POS_S = '10'; // Scout
export const POS_VC = '11'; // Video Coordinator
export const POS_COACH = '12'; // Coach
export const POS_ATHLETE = '13'; // Athlete
export const POS_PARENT = '14'; // Parent
export const POS_SP = '15'; // Pro Scout
export const POS_SA = '16'; // Amateur Scout
export const POS_DPP = '17'; // Director of Player Personnel


export const POS_LIST = {
    [POS_FL]: 'Left Forward',
    [POS_FR]: 'Right Forward',
    [POS_C]: 'Center',
    [POS_DL]: 'Left Defense',
    [POS_DR]: 'Right Defense',
    [POS_G]: 'Goalie',
};

export const SHOT_LIST = {
    [SHOT_RIGHT]: 'Right',
    [SHOT_LEFT]: 'Left',
};

export const GENDER_LIST = {
    [GENDER_MALE]: 'Male',
    [GENDER_FEMALE]: 'Female',
};



export const REPORT_VIDEO = '34'; // Inappropriate video
export const REPORT_PROFILE = '35'; // Inappropriate profile
export const REPORT_ACCOUNT = '36'; // Fake account
export const REPORT_OTHER = '37'; // Other
export const REPORT_DEFAULT = REPORT_PROFILE; // Inappropriate video

export const REPORT_LIST = {
    [REPORT_VIDEO]: 'Inappropriate video',
    [REPORT_PROFILE]: 'Inappropriate profile',
    [REPORT_ACCOUNT]: 'Fake account',
    [REPORT_OTHER]: 'Other',
};


export const DELETE_NO_USE = 0;
export const DELETE_NO_CHANGES = 1;
export const DELETE_NO_EMAILS_FROM_SCOUTS = 2;
export const DELETE_NOTIF = 3;
export const DELETE_NO_HELPFUL = 4;
export const DELETE_PRIVACY = 5;
export const DELETE_OTHER = 6;


export const DELETE_REASON_LIST = {
    [DELETE_NO_USE]: 'I no longer use the Scout Zoo app',
    [DELETE_NO_CHANGES]: 'I do not like the recent changes made to the Scout Zoo app',
    [DELETE_NO_EMAILS_FROM_SCOUTS]: 'I haven’t received any emails from scouts',
    [DELETE_NOTIF]: 'I have received too many notifications from Scout Zoo',
    [DELETE_NO_HELPFUL]: 'I do not find Scout Zoo helpful',
    [DELETE_PRIVACY]: 'I am concerned about my privacy',
    [DELETE_OTHER]: 'Other',
};
