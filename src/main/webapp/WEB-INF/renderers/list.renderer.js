var React = require('react');
var ReactDOMServer = require('react-dom/server');
var List = require('../views/List.jsx');
window.listContent = ReactDOMServer.renderToString(React.createElement(List, null));