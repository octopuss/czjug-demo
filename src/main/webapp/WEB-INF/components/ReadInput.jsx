/** @jsx React.DOM */
'use strict';
var React = require('react');
var ReadInput = React.createClass({
    render: function () {
        return (<div>
            <label>{this.props.label}:</label>{this.props.value}</div>);
    }
});
module.exports = ReadInput;