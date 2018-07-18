/**
 * Created by aleksandr on 9/5/17.
 * moonion.com
 */



export const absUrl = url => typeof window === "undefined" ? `${process.env.SITE_URL}${url}` : `${SITE_URL}${url}`;
export const getLandingUrl = url => typeof window === "undefined" ? `${process.env.LANDING_URL}${url}` : `${LANDING_URL}${url}`;