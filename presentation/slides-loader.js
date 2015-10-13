/**
 * Created by moro on 13.10.2015.
 */
"use strict";
require('./css/reveal.css');
require('./css/white.css');
require('./lib/css/zenburn.css');

require('script!./lib/js/head.min.js');
require('script!./lib/js/classList.js');
require('script!./lib/js/reveal.js');

window.Reveal.initialize({
    controls: true,
    progress: true,
    history: true,
    center: false,
    theme: window.Reveal.getQueryHash().theme, // available themes are in /css/theme
    transition: 'linear' // default/cube/page/concave/zoom/linear/fade/none
});

require.ensure([], function() {
    //require('script!./plugin/highlight/highlight.js');
    //window.hljs.initHighlightingOnLoad();
    require('script!./plugin/zoom-js/zoom.js');
    require('script!./plugin/markdown/marked.js');
    require('script!./plugin/markdown/markdown.js');
});
