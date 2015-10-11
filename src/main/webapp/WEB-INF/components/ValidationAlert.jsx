/** @jsx React.DOM */
'use strict';
var Alert = require("react-bootstrap/Alert");
var AppStore = require('../store/ApplicationStore');
var Util = require('../lib/Util');
var React = require('react');
require("../css/components/Alert/alert.css");

var ValidationAlert = React.createClass({
    getInitialState: function () {
        return {
            visible: false,
            messages: {}
        };
    },
    componentDidMount: function () {
        AppStore.addListener('validation', this.handleValidation);
    },
    handleValidation: function () {
        var vMessages = AppStore.getValidationMessages();
        if (!Util.isEmpty(vMessages)) {
            this.setState({visible: true, messages: vMessages});
        } else {
            this.setState({visible: false});
        }
    }
    ,
    render: function () {
        var messages = [];
        for (var elementId in this.state.messages) {
            var fldMessages = this.state.messages[elementId];
            for (var fn in fldMessages) {
                var msg = fldMessages[fn];

                messages.push(<li>{elementId} - {msg.message}</li>);
            }
            ;
        }
        ;

        if (this.state.visible == true) {
            return (<Alert bs bsStyle="danger">
                <ul>{messages}</ul>
            </Alert>);
        } else {
            return (<div/>);
        }

    }
});
module.exports = ValidationAlert;
