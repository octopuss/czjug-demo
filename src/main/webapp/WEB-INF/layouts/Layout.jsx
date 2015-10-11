/**
 * @jsx React.DOM
 */
var Panel = require("react-bootstrap/Panel");
var Alert = require("../components/ValidationAlert.jsx");
var AppAlert = require("../components/AppAlert.jsx");
var React = require('react');
var AppDispatcher = require('../lib/AppDispatcher');
require("../css/components/Layout/panel.css");
require("../css/components/Layout/normalize.css");

var Layout = React.createClass({

    getInitialState: function () {
        return {
            style: {
                width: '800',
                margin: '20'
            }
        };
    },
    componentDidMount: function () {
        AppDispatcher.handleViewAction({
                actionType: 'init',
                url: this.state.url
            }
        );
    },
    render: function () {
        var title = (
            <h3>{this.props.title}</h3>
        );
        return (<div style={this.state.style}>
            <AppAlert/>
            <Alert/>
            <Panel header={title}>
            {this.props.children}
            </Panel>
        </div>);
    }
});
module.exports = Layout;