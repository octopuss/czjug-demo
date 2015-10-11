/** @jsx React.DOM */
'use strict';
var Button = require("react-bootstrap/Button");
var React = require('react');
var AppDispatcher = require('../lib/AppDispatcher');
require("../css/components/Button/button.css");
var GefButton = React.createClass({
    onClick: function () {
        console.log('clicked');
        AppDispatcher.handleViewAction({
                actionType: this.props.actionType,
                url: this.props.url
            }
        );
    },
    render: function () {
        return (<Button bsStyle="primary" onClick={this.onClick}>{this.props.text}</Button>)
    }
});
module.exports = GefButton;