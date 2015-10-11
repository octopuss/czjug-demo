/** @jsx React.DOM */
'use strict';
var BInput = require("react-bootstrap/Input");
var React = require('react');
var AppStore = require('../store/ApplicationStore');
var AppDispatcher = require('../lib/AppDispatcher');
var ReadInput = require('../components/ReadInput.jsx');
require("../css/components/Input/input.css");

var Input = React.createClass({
        propTypes: {
            id: React.PropTypes.string.isRequired
        },

        getInitialState: function () {
            return {
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
        componentDidMount: function () {
            AppStore.addListener('init', this.init);
        },
        init: function () {
            this.setState({value: AppStore.getElementValue(this.props.id)});
        },
        changeValid: function () {
            if (AppStore.isFieldValid(this.props.id)) {
                this.setState({validationClass: 'success'});
            } else {
                this.setState({validationClass: 'error'});
            }
            this.forceUpdate();
        },
        validate: function () {
            AppDispatcher.handleViewAction({
                actionType: 'validate',
                elementId: this.props.id,
                value: this.state.value,
                functions: this.state.validations
            });
        },

        handleChange: function () {

            // This could also be done using ReactLink:
            // http://facebook.github.io/react/docs/two-way-binding-helpers.html
            this.setState({
                value: this.refs.input.getValue()
            }, function () {
                this.validate();
            });


        },

        render: function () {
            if (this.state.editable) {
                return (
                    <BInput
                        type="text"
                        value={this.state.value}
                        placeholder="Enter text"
                        label={this.props.label}
                        help={this.props.help}
                        bsStyle={this.state.validationClass}
                        hasFeedback
                        ref="input"
                        groupClassName="group-class"
                        wrapperClassName="wrapper-class"
                        labelClassName="label-class"
                        id={this.props.id}
                        onChange={this.handleChange} />
                );
            } else {
                return (<ReadInput label={this.props.label} value={this.state.value}/>);
            }

        }
    })
    ;

module.exports = Input;