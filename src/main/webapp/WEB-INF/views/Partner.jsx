/** @jsx React.DOM */
'use strict';
var Btn = require("../components/Button.jsx");
var GefInput = require("../components/Input.jsx");
var Datetime = require("../components/Datetimeselector.jsx");
var Layout = require("../layouts/Layout.jsx");
var OverlayTrigger = require("react-bootstrap/OverlayTrigger");
var Tooltip = require("react-bootstrap/Tooltip");
var AppStore = require('../store/ApplicationStore');
require("../css/components/Index/tooltip.css");

var React = require('react');


var Partner = React.createClass({


    render: function () {
        var tooltip = <Tooltip>When clicked data stored into localstorage.</Tooltip>;
        return (
            <Layout title="Partner detail">
                <GefInput label="Name" id="name" />
                <GefInput label="Birth nr." id="birthNr" />
                <Datetime id="birthDate" label="Date"/>
                <OverlayTrigger placement="top"  delayShow={300} delayHide={150} overlay={tooltip}>

                    <span>
                    {AppStore.isFieldEditable(null) ? <Btn text="Submit" actionType="save" url="/save"/> : false}
                    </span>
                </OverlayTrigger>
            </Layout>
        );
    }
});

React.render(<Partner/>, document.getElementById('app'));