import Helmet from "react-helmet";

const NODE_ENV = process.env.NODE_ENV || 'development';

const BACKEND_URL = process.env.BACKEND_URL;
const GOOGLE_UA = process.env.GOOGLE_UA;
const INTERCOM_ID = process.env.INTERCOM_ID;


export default ({template, html, css, error}) => {
    const head = Helmet.renderStatic();


    const errorHtml = error && NODE_ENV === 'development'
        ? `<div id="server-error"><h1>Server Error</h1><pre>${error.stack || error}</pre></div>`
        : '';
    return template
        .replace(
            `%BACKEND_URL%`,
            BACKEND_URL
        )
        .replace(
            `%GOOGLE_UA%`,
            GOOGLE_UA
        )
        .replace(
            `%INTERCOM_ID%`,
            INTERCOM_ID
        )
        .replace(
            `<div id="app"></div>`,
            `${errorHtml}<div id="app">${html}</div>`
        )
        .replace(
            `<style id="jss-server-side"></style>`,
            `<style id="jss-server-side">${css}</style>`
        )
        .replace(
            /<title>.*?<\/title>/g,
            head.title.toString()
        )
        .replace(
            /<html>/g,
            '<html ' + head.htmlAttributes.toString() + '>'
        );

};
