import Helmet from "react-helmet";

const NODE_ENV = process.env.NODE_ENV || 'development';

const SITE_URL = process.env.SITE_URL;
const LANDING_URL = process.env.LANDING_URL;
const GOOGLE_UA = process.env.GOOGLE_UA;
const INTERCOM_ID = process.env.INTERCOM_ID;


export default ({template, html, css, error, initialProps, store, options}) => {
    const head = Helmet.renderStatic();

    if(error)
        console.log('Server Error',error);

    const errorHtml = error && NODE_ENV === 'development'
        ? `<div id="server-error"><h1>Server Error</h1><pre>${error.stack || error}</pre></div>`
        : '';
    if (GOOGLE_UA)
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
        );
    if (INTERCOM_ID)
        template = template.replace(
            /<!-- Intercom OFF -->/g,
            `<!-- Intercom OFF -->
                <script>
                    var posIntercom = 'left';
                    var width = window.innerWidth
                                || document.documentElement.clientWidth
                                || document.body.clientWidth;

                    // Desktop config
                    if(width > 960) { posIntercom = 'right'; } 


                  window.intercomSettings = {
                    app_id: '${INTERCOM_ID}',
                    hide_default_launcher: false,
                    alignment: posIntercom,
                    horizontal_padding: 20,
                    vertical_padding: 20
                  };
                </script>
                <script>(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',intercomSettings);}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Intercom=i;function l(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/'+window.INTERCOM_ID;var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);}if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})()</script>
`
        );
    return template
        .replace(
            `<div id="app"></div>`,
            `<div id="app"></div>
             <script>window['${options.initialStateKey}'] = ${JSON.stringify(store ? store.getState() : {})};</script>
             <script>window['${options.initialPropsKey}'] = ${JSON.stringify(initialProps || {})};</script>
             <script>window['SITE_URL'] = '${SITE_URL}';</script>
             <script>window['LANDING_URL'] = '${LANDING_URL}';</script>`)
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
            /<\/head>/g,
            head.meta.toString() + '\n</head>'
        );


};
