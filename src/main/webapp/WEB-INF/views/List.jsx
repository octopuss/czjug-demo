'use strict';
var Layout = require("../layouts/Layout.jsx");
var Table = require("../components/Table.jsx");
var AppStore = require('../store/ApplicationStore');
var Button = require("react-bootstrap/Button");
var React = require('react');


var List = React.createClass({


    displayName: "List of partners view",

    componentWillMount: function () {
        this.setState({partnersListData: AppStore.getElementValue("partnerList")});
    },

    render: function () {

        var tableHeaders = {
            name: 'Name', birthNr: "Birth number"
        };
        var actions = [{name: 'Edit', link: ''}, {name: 'View', link: '/view'}];
        return (
            <Layout title="Partners list">
                <Button href="/new">New</Button>
                <Table headers={tableHeaders} data={this.state.partnersListData} rowIdProperty="id" actions={actions} id="partnersTable"/>
            </Layout>
        );
    }
});
module.exports=List;