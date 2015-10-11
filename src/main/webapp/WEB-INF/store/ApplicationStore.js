'use strict';

var AppDispatcher = require('../lib/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var model = window.app.model;
var Util = require('../lib/Util');
var AppValidations = require('../lib/AppModelValidations');
var Promise = require('promise');
var Jquery = require('jquery');
var assign = require('object-assign');
var LS = require('localStorage');

var LS_KEY = 'PARTNER_MODEL';

var ApplicationStore = assign({}, EventEmitter.prototype, {
    init: function () {
        var lsModel = JSON.parse(LS.getItem(LS_KEY));
        if (lsModel !== null) {
            model.data = assign(model.data, lsModel.data);
        }
        window.app.model = model;
        console.log(window.app.model);
        console.log("initialized");
        this.validationFunctions = require('../lib/ValidationFunctions')(model);
        console.log(model);
        this.emitEvent('init');
    },

    emitEvent: function (event, data) {
        if (data !== undefined) {
            this.emit(event);
        } else {
            this.emit(event, data);
        }
        console.log("Emitting " + event + " data - " + data);
    },
    addListener: function (eventType, callback) {
        this.on(eventType, callback);
    },
    removeListener: function (eventType, callback) {
        this.removeListener(eventType, callback);
    },
    addElementSafelyToModel: function (element) {
        if (model.data[element] !== undefined) {
            console.log("model has property " + element);
        } else {
            model.data[element] = null;
        }
        console.log(model);
    },
    setModelValue: function (elementId, newValue) {
        // if (model.data[elementId] !== undefined) {
        model.data[elementId] = newValue;
        //  }
        console.log("Model updated");
        console.log(model);
    },
    setupValidation: function (elementId) {
        if (AppValidations[elementId] !== undefined) {
            return AppValidations[elementId].validationFunctions;
        }
    },
    isFieldValid: function (elementId) {
        var fieldMessages = model.state.messages[elementId];
        return fieldMessages === undefined;
    },
    isFieldEditable: function (elementId) {
        return model.state.editable;
    },
    getValidationMessages: function () {
        return model.state.messages;
    },
    getElementValue: function (elementId) {
        return model.data[elementId];
    },
    validate: function (elementId, functionArray) {
        console.log("in validate");
        if (functionArray === undefined) {
            return;
        }
        for (var i = 0; i < functionArray.length; i++) {
            var fnDef = functionArray[i];
            var fn = this.validationFunctions[fnDef.name];
            var result = fn(elementId);
            if (fnDef.invertResult) {
                result = !result;
            }
            console.log(result);
            if (result === false) { // if invalid we add message in the stack
                model.state.valid = false;
                model.state.messages[elementId] = model.state.messages[elementId] === undefined ? {} : model.state.messages[elementId]; //init array
                model.state.messages[elementId][fnDef.name] = {message: fnDef.message};

            } else { //else we try to remove it
                var fieldMessages = model.state.messages[elementId];
                if (fieldMessages !== undefined) {
                    if (fieldMessages[fnDef.name] !== undefined) {
                        delete  fieldMessages[fnDef.name];
                    }
                    if (Util.isEmpty(fieldMessages)) {
                        delete model.state.messages[elementId];
                    }
                }
            }
        }
        if (Util.isEmpty(model.state.messages)) { // no error messages we assume valid
            model.state.valid = true;
        }
        console.log(model);
        this.emitEvent('validation');
    },
    submitModel: function (targetUrl) {
        console.log('submitting');
        if (model.state.valid) {
            var jqPromise = Jquery.ajax({url: targetUrl, data: model.data, datatype: "jsonp", method: "POST"});
            var promise = Promise.resolve(jqPromise);
            promise.then(
                function (res) {
                    console.log("success");
                    localStorage.removeItem(LS_KEY);
                    window.location.replace(targetUrl);
                }).then(undefined, function (err) { //error - more thens, only one error on final ;)
                    console.log(err);
                    localStorage.setItem(LS_KEY, JSON.stringify(model));
                    ApplicationStore.emit('warning', {errorType: "submitError", message: err.statusText});
                });
        } else {
            ApplicationStore.emit('warning', {errorType: "modelError", message: 'Model is not valid'});
        }

    },
    dispatcherIndex: AppDispatcher.register(function (payload) {
        var action = payload.action;
        console.log("Performed action-->");
        console.log(action);
        switch (action.actionType) {
            case 'save':
                ApplicationStore.submitModel(action.url);
                break;
            case 'init':
                ApplicationStore.init();
                break;
            case 'validate':
                ApplicationStore.setModelValue(action.elementId, action.value);
                ApplicationStore.validate(action.elementId, action.functions);
                break;
        }
        console.log("action - " + action.actionType + " dispatched");
        return true; // No errors. Needed by promise in Dispatcher.
    })

});

module.exports = ApplicationStore;