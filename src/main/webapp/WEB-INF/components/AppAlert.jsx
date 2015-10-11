/** @jsx React.DOM */
'use strict';
var Alert = require("react-bootstrap/Alert");
var React = require('react');
var AppStore = require('../store/ApplicationStore');
require("../css/components/Alert/alert.css");
var AppAlert = React.createClass({
    getInitialState: function () {
        return {
            alertVisible: false,
            error: {}
        };
    },
    componentDidMount: function () {
        AppStore.addListener('warning', this.handleWarning);
    },
    handleWarning: function (data) {
        this.setState({alertVisible: true, error: data});
    },
    render: function () {
        if (this.state.alertVisible) {
            return (
                <Alert bsStyle="warning" onDismiss={this.handleAlertDismiss}>
                    {this.state.error.errorType}-{this.state.error.message}
                </Alert>
            );
        } else {
            return (<div/>);
        }
    },

    handleAlertDismiss: function () {
        this.setState({alertVisible: false});
    }

});
module.exports = AppAlert;