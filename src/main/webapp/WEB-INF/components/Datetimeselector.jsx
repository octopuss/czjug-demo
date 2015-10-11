/** @jsx React.DOM */
/*
 DatetimeSelector module
 */
'use strict';

var React = require('react');
var jQuery = require('jquery');
var moment = require('moment');
var AppDispatcher = require('../lib/AppDispatcher');
var AppStore = require('../store/ApplicationStore');
var ReadInput = require('../components/ReadInput.jsx');
require("../external/datetimepicker/jquery.datetimepicker.css");


Date.parseDate = function (input, format) {
    return moment(input, format).toDate();
};
Date.prototype.dateFormat = function (format) {
    return moment(this).format(format);
};

var DatetimeSelector = React.createClass({
    getInitialState: function () {
        return {
            datetime: moment(new Date()),
            options: {
                format: "d.m.Y H:i",
                formatTime: "H:i",
                formatDate: "d.m.Y",
                lang: "cs",
                dayOfWeekStart: 1,
                onChangeDateTime: this.onInputChange
            },
            value: '',
            editable: true,
            validations: [],
            validationClass: 'error'
        };
    },
    componentWillMount: function () {
        AppStore.addElementSafelyToModel(this.props.id);
        var vals = AppStore.setupValidation(this.props.id);
        if (vals !== undefined && vals.length > 0) {
            AppStore.addListener("validation", this.changeValid);
        } else {
            this.setState({validationClass: ''});
        }
        this.setState({validations: vals, editable: AppStore.isFieldEditable(this.props.id)});

    },
    init: function () {
        if (AppStore.getElementValue(this.props.id) !== null) {
            this.setState({value: AppStore.getElementValue(this.props.id)}, function () {
                if (this.state.value !== null) {
                    this.setState({datetime: moment(this.state.value)}, function () {
                        this.setState({value: this.state.datetime.toString()});
                    });

                }
            });
        } else {
            this.setState({value: this.state.datetime.toString()});
        }
        this.validate();
    },
    componentDidMount: function () {
        console.log(this.state.options);
        if (this.state.editable) {
            require('../external/datetimepicker/jquery.datetimepicker.js');
            jQuery(this.refs.datetimefield.getDOMNode()).datetimepicker(this.state.options);
        }
        AppStore.addListener('init', this.init);
    },
    onInputChange: function (e) {
        var m = moment(e);
        if (m.toString() !== this.state.datetime.toString()) { //only if datetime really changed
            var out = this.state.datetime;
            out += "->";
            this.setState({value: m.toString(), datetime: m});
            out += this.state.datetime;
            console.log(out);
            this.validate();
        }
    },
    validate: function () {
        AppDispatcher.handleViewAction({
            actionType: 'validate',
            elementId: this.props.id,
            value: this.state.value,

            functions: this.state.validations
        });
    },

    formatDatetime: function (val) {
        return moment(val).format("DD.MM.YYYY HH:mm");
    },

    render: function () {
        return (this.state.editable ? <div>
            <label htmlFor={this.props.id}>{this.props.label}</label>
            <input ref="datetimefield" name={this.props.id} value={this.formatDatetime(this.state.datetime)} readOnly/>
        </div> : <ReadInput label={this.props.label} value={this.state.value}/>);
    }
});

module.exports = DatetimeSelector;