var React = require('react');
var ReactDOMServer = require('react-dom/server');
var List = require('../views/List.jsx');
console.log(ReactDOMServer.renderToString(React.createElement(List, null)));