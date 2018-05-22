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
    if(GOOGLE_UA)
        template = template.replace(
            /<!-- Google Analytics -->/g,
            `<!-- Google Analytics -->
            <script>
                (function (i, s, o, g, r, a, m) {
                    i['GoogleAnalyticsObject'] = r;
                    i[r] = i[r] || function () {
                        (i[r].q = i[r].q || []).push(arguments)
                    }, i[r].l = 1 * new Date();
                    a = s.createElement(o),
                        m = s.getElementsByTagName(o)[0];
                    a.async = 1;
                    a.src = g;
                    m.parentNode.insertBefore(a, m)
                })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
                ga('create', '${GOOGLE_UA}', 'auto');
                ga('send', 'pageview');
            </script>`
        )
    if(INTERCOM_ID)
        template = template.replace(
            /<!-- Intercom OFF -->/g,
            `<!-- Intercom OFF -->
                <script>
                  window.INTERCOM_ID = '${INTERCOM_ID}';
                  window.intercomSettings = {
                    app_id: window.INTERCOM_ID,
                    hide_default_launcher: true
                  };
                </script>
                <script>(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',intercomSettings);}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Intercom=i;function l(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/'+window.INTERCOM_ID;var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);}if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})()</script>
`
        )
    return template
        .replace(
            `%BACKEND_URL%`,
            BACKEND_URL
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
            /<head>/g,
            '<head>' + head.meta.toString()
        );



};
