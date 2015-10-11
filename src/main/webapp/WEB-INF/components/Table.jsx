/** @jsx React.DOM */
'use strict';
var BTable = require("react-bootstrap/Table");
var React = require('react');
var Button = require("react-bootstrap/Button");
require("../css/components/Table/table.css");

var TableRow = React.createClass({
    // columns, data
    propTypes: {
        columnNames: React.PropTypes.array.isRequired,
        data: React.PropTypes.object.isRequired,
        actions: React.PropTypes.array,
        rowId: React.PropTypes.string.isRequired
    },
    render: function () {
        var tds = [];
        var acs = [];
        var data = this.props.data;
        var columnNames = this.props.columnNames;
        var actions = this.props.actions;
        for (var i = 0; i < columnNames.length; i++) {
            tds.push(<td>{data[columnNames[i]]}</td>);
        }
        ;

        if (actions !== undefined) {
            for (var j = 0; j < actions.length; j++) {
                var link = actions[j].link + "/" + data[this.props.rowId];
                acs.push(<span>
                    <Button bsStyle="primary" href={link}>{actions[j].name}</Button>
                &nbsp;</span>);
            }
        }
        if (acs.length > 0) {
            tds.push(<td>{acs}</td>);
        }
        return (
            <tr id={data[this.props.rowId]}>{tds}</tr>
        );
    }
});

var TableHeader = React.createClass({

    render: function () {
        var headers = this.props.columns;
        var keys = Object.keys(this.props.columns);
        var ths = [];
        for (var i = 0; i < keys.length; i++) {
            ths.push(<th>{headers[keys[i]]}</th>);
        }
        if (this.props.actions !== undefined) {
            ths.push(<th>Actions</th>);
        }
        return (<tr>{ths}</tr>);
    }
});

var Table = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        headers: React.PropTypes.object.isRequired,
        data: React.PropTypes.array.isRequired,
        rowIdProperty: React.PropTypes.string.isRequired
    },

    render: function () {

        var tableData = this.props.data;
        var tableRows = [];

        for (var i = 0; i < tableData.length; i++) {
            tableRows.push(<TableRow columnNames={Object.keys(this.props.headers)} rowId={this.props.rowIdProperty} data={tableData[i]} actions={this.props.actions}/>);
        }

        var tableHeader = <TableHeader columns={this.props.headers} actions={this.props.actions !== undefined}/>;

        return (<BTable stripped bordered hover id={this.props.id}>
        {tableHeader}
        {tableRows}
        </BTable>);
    }
});
module.exports = Table;