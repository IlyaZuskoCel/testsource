/**
 * Created by aleksandr on 9/5/17.
 * moonion.com
 */



export const absUrl = url => typeof window === "undefined" ? `https://localhost/${url}` : `https://${window.location.hostname}${url}`;