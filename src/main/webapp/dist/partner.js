webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	var Btn = __webpack_require__(196);
	var Input = __webpack_require__(198);
	var Datetime = __webpack_require__(202);
	var Layout = __webpack_require__(1);
	var OverlayTrigger = __webpack_require__(207);
	var Tooltip = __webpack_require__(212);
	var AppStore = __webpack_require__(169);
	__webpack_require__(213);

	var React = __webpack_require__(3);



	var Partner = React.createClass({displayName: "Partner",


	    render: function () { //TODO [11]
	        var tooltip = React.createElement(Tooltip, null, "When clicked data stored into localstorage.");
	        return (
	            React.createElement(Layout, {title: "Partner detail"}, 
	                React.createElement(Input, {label: "Name", id: "name"}), 
	                React.createElement(Input, {label: "Birth nr.", id: "birthNr"}), 
	                React.createElement(Datetime, {id: "birthDate", label: "Date"}), 
	                React.createElement(OverlayTrigger, {placement: "top", delayShow: 300, delayHide: 150, overlay: tooltip}, 

	                    React.createElement("span", null, 
	                    AppStore.isFieldEditable(null) ? React.createElement(Btn, {text: "Submit", actionType: "save", url: "/save"}) : false
	                    )
	                )
	            )
	        );
	    }
	});

	// Just workaround for server rendering
	if(typeof document !== "undefined") {
	    var ReactDOM = __webpack_require__(194);
	    ReactDOM.render(React.createElement(Partner, null), document.getElementById('app'));
	} else {
	    var ReactDOMServer = __webpack_require__(195);
	    window.partnerContent = ReactDOMServer.renderToString(React.createElement(Partner, null));
	}

/***/ },

/***/ 196:
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	var Button = __webpack_require__(192);
	var React = __webpack_require__(3);
	var AppDispatcher = __webpack_require__(170);
	__webpack_require__(197);
	var GefButton = React.createClass({displayName: "GefButton",
	    onClick: function () {
	        console.log('clicked');
	        AppDispatcher.handleViewAction({
	                actionType: this.props.actionType,
	                url: this.props.url
	            }
	        );
	    },
	    render: function () {
	        return (React.createElement(Button, {bsStyle: "primary", onClick: this.onClick}, this.props.text))
	    }
	});
	module.exports = GefButton;

/***/ },

/***/ 197:
186,

/***/ 198:
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	var BInput = __webpack_require__(199);
	var React = __webpack_require__(3);
	var AppStore = __webpack_require__(169);
	var AppDispatcher = __webpack_require__(170);
	var ReadInput = __webpack_require__(200);
	__webpack_require__(201);

	var Input = React.createClass({displayName: "Input",
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

	        componentWillMount: function () { //TODO [8]
	            AppStore.addElementSafelyToModel(this.props.id);
	            var vals = AppStore.setupValidation(this.props.id);
	            if (vals !== undefined && vals.length > 0) {
	                AppStore.addListener("validation", this.changeValid);
	            } else {
	                this.setState({validationClass: ''});
	            }
	            this.setState({validations: vals, editable: AppStore.isFieldEditable(this.props.id)});


	        },
	        componentDidMount: function () { //TODO [6]
	            AppStore.addListener('init', this.init);
	        },
	        init: function () { //TODO [7]
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

	        handleChange: function () { //TODO [9]

	            // This could also be done using ReactLink:
	            // http://facebook.github.io/react/docs/two-way-binding-helpers.html
	            this.setState({
	                value: this.refs.input.getValue()
	            }, function () {
	                this.validate();
	            });


	        },

	        render: function () { //TODO [10]
	            if (this.state.editable) {
	                return (
	                    React.createElement(BInput, {
	                        type: "text", 
	                        value: this.state.value, 
	                        placeholder: "Enter text", 
	                        label: this.props.label, 
	                        help: this.props.help, 
	                        bsStyle: this.state.validationClass, 
	                        hasFeedback: true, 
	                        ref: "input", 
	                        groupClassName: "group-class", 
	                        wrapperClassName: "wrapper-class", 
	                        labelClassName: "label-class", 
	                        id: this.props.id, 
	                        onChange: this.handleChange})
	                );
	            } else {
	                return (React.createElement(ReadInput, {label: this.props.label, value: this.state.value}));
	            }

	        }
	    })
	    ;

	module.exports = Input;

/***/ },

/***/ 199:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(3);
	var joinClasses = __webpack_require__(159);
	var classSet = __webpack_require__(160);
	var Button = __webpack_require__(192);

	var Input = React.createClass({displayName: "Input",
	  propTypes: {
	    type: React.PropTypes.string,
	    label: React.PropTypes.node,
	    help: React.PropTypes.node,
	    addonBefore: React.PropTypes.node,
	    addonAfter: React.PropTypes.node,
	    buttonBefore: React.PropTypes.node,
	    buttonAfter: React.PropTypes.node,
	    bsStyle: function(props) {
	      if (props.type === 'submit') {
	        // Return early if `type=submit` as the `Button` component
	        // it transfers these props to has its own propType checks.
	        return;
	      }

	      return React.PropTypes.oneOf(['success', 'warning', 'error']).apply(null, arguments);
	    },
	    hasFeedback: React.PropTypes.bool,
	    groupClassName: React.PropTypes.string,
	    wrapperClassName: React.PropTypes.string,
	    labelClassName: React.PropTypes.string,
	    disabled: React.PropTypes.bool
	  },

	  getInputDOMNode: function () {
	    return this.refs.input.getDOMNode();
	  },

	  getValue: function () {
	    if (this.props.type === 'static') {
	      return this.props.value;
	    }
	    else if (this.props.type) {
	      return this.getInputDOMNode().value;
	    }
	    else {
	      throw Error('Cannot use getValue without specifying input type.');
	    }
	  },

	  getChecked: function () {
	    return this.getInputDOMNode().checked;
	  },

	  isCheckboxOrRadio: function () {
	    return this.props.type === 'radio' || this.props.type === 'checkbox';
	  },

	  isFile: function () {
	    return this.props.type === 'file';
	  },

	  renderInput: function () {
	    var input = null;

	    if (!this.props.type) {
	      return this.props.children
	    }

	    switch (this.props.type) {
	      case 'select':
	        input = (
	          React.createElement("select", React.__spread({},  this.props, {className: joinClasses(this.props.className, 'form-control'), ref: "input", key: "input"}), 
	            this.props.children
	          )
	        );
	        break;
	      case 'textarea':
	        input = React.createElement("textarea", React.__spread({},  this.props, {className: joinClasses(this.props.className, 'form-control'), ref: "input", key: "input"}));
	        break;
	      case 'static':
	        input = (
	          React.createElement("p", React.__spread({},  this.props, {className: joinClasses(this.props.className, 'form-control-static'), ref: "input", key: "input"}), 
	            this.props.value
	          )
	        );
	        break;
	      case 'submit':
	        input = (
	          React.createElement(Button, React.__spread({},  this.props, {componentClass: "input", ref: "input", key: "input"}))
	        );
	        break;
	      default:
	        var className = this.isCheckboxOrRadio() || this.isFile() ? '' : 'form-control';
	        input = React.createElement("input", React.__spread({},  this.props, {className: joinClasses(this.props.className, className), ref: "input", key: "input"}));
	    }

	    return input;
	  },

	  renderInputGroup: function (children) {
	    var addonBefore = this.props.addonBefore ? (
	      React.createElement("span", {className: "input-group-addon", key: "addonBefore"}, 
	        this.props.addonBefore
	      )
	    ) : null;

	    var addonAfter = this.props.addonAfter ? (
	      React.createElement("span", {className: "input-group-addon", key: "addonAfter"}, 
	        this.props.addonAfter
	      )
	    ) : null;

	    var buttonBefore = this.props.buttonBefore ? (
	      React.createElement("span", {className: "input-group-btn"}, 
	        this.props.buttonBefore
	      )
	    ) : null;

	    var buttonAfter = this.props.buttonAfter ? (
	      React.createElement("span", {className: "input-group-btn"}, 
	        this.props.buttonAfter
	      )
	    ) : null;

	    return addonBefore || addonAfter || buttonBefore || buttonAfter ? (
	      React.createElement("div", {className: "input-group", key: "input-group"}, 
	        addonBefore, 
	        buttonBefore, 
	        children, 
	        addonAfter, 
	        buttonAfter
	      )
	    ) : children;
	  },

	  renderIcon: function () {
	    var classes = {
	      'glyphicon': true,
	      'form-control-feedback': true,
	      'glyphicon-ok': this.props.bsStyle === 'success',
	      'glyphicon-warning-sign': this.props.bsStyle === 'warning',
	      'glyphicon-remove': this.props.bsStyle === 'error'
	    };

	    return this.props.hasFeedback ? (
	      React.createElement("span", {className: classSet(classes), key: "icon"})
	    ) : null;
	  },

	  renderHelp: function () {
	    return this.props.help ? (
	      React.createElement("span", {className: "help-block", key: "help"}, 
	        this.props.help
	      )
	    ) : null;
	  },

	  renderCheckboxandRadioWrapper: function (children) {
	    var classes = {
	      'checkbox': this.props.type === 'checkbox',
	      'radio': this.props.type === 'radio'
	    };

	    return (
	      React.createElement("div", {className: classSet(classes), key: "checkboxRadioWrapper"}, 
	        children
	      )
	    );
	  },

	  renderWrapper: function (children) {
	    return this.props.wrapperClassName ? (
	      React.createElement("div", {className: this.props.wrapperClassName, key: "wrapper"}, 
	        children
	      )
	    ) : children;
	  },

	  renderLabel: function (children) {
	    var classes = {
	      'control-label': !this.isCheckboxOrRadio()
	    };
	    classes[this.props.labelClassName] = this.props.labelClassName;

	    return this.props.label ? (
	      React.createElement("label", {htmlFor: this.props.id, className: classSet(classes), key: "label"}, 
	        children, 
	        this.props.label
	      )
	    ) : children;
	  },

	  renderFormGroup: function (children) {
	    var classes = {
	      'form-group': true,
	      'has-feedback': this.props.hasFeedback,
	      'has-success': this.props.bsStyle === 'success',
	      'has-warning': this.props.bsStyle === 'warning',
	      'has-error': this.props.bsStyle === 'error'
	    };
	    classes[this.props.groupClassName] = this.props.groupClassName;

	    return (
	      React.createElement("div", {className: classSet(classes)}, 
	        children
	      )
	    );
	  },

	  render: function () {
	    if (this.isCheckboxOrRadio()) {
	      return this.renderFormGroup(
	        this.renderWrapper([
	          this.renderCheckboxandRadioWrapper(
	            this.renderLabel(
	              this.renderInput()
	            )
	          ),
	          this.renderHelp()
	        ])
	      );
	    }
	    else {
	      return this.renderFormGroup([
	        this.renderLabel(),
	        this.renderWrapper([
	          this.renderInputGroup(
	            this.renderInput()
	          ),
	          this.renderIcon(),
	          this.renderHelp()
	        ])
	      ]);
	    }
	  }
	});

	module.exports = Input;


/***/ },

/***/ 200:
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	var React = __webpack_require__(3);
	var ReadInput = React.createClass({displayName: "ReadInput",
	    render: function () {
	        return (React.createElement("div", null, 
	            React.createElement("label", null, this.props.label, ":"), this.props.value));
	    }
	});
	module.exports = ReadInput;

/***/ },

/***/ 201:
186,

/***/ 202:
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	/*
	 DatetimeSelector module
	 */
	'use strict';

	var React = __webpack_require__(3);
	var jQuery = __webpack_require__(183);
	var moment = __webpack_require__(203);
	var AppDispatcher = __webpack_require__(170);
	var AppStore = __webpack_require__(169);
	var ReadInput = __webpack_require__(200);
	__webpack_require__(205);


	Date.parseDate = function (input, format) {
	    return moment(input, format).toDate();
	};
	Date.prototype.dateFormat = function (format) {
	    return moment(this).format(format);
	};

	var DatetimeSelector = React.createClass({displayName: "DatetimeSelector",
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
	            __webpack_require__(206);
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
	        return (this.state.editable ? React.createElement("div", null, 
	            React.createElement("label", {htmlFor: this.props.id}, this.props.label), 
	            React.createElement("input", {ref: "datetimefield", name: this.props.id, value: this.formatDatetime(this.state.datetime), readOnly: true})
	        ) : React.createElement(ReadInput, {label: this.props.label, value: this.state.value}));
	    }
	});

	module.exports = DatetimeSelector;

/***/ },

/***/ 203:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {//! moment.js
	//! version : 2.10.6
	//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
	//! license : MIT
	//! momentjs.com

	(function (global, factory) {
	     true ? module.exports = factory() :
	    typeof define === 'function' && define.amd ? define(factory) :
	    global.moment = factory()
	}(this, function () { 'use strict';

	    var hookCallback;

	    function utils_hooks__hooks () {
	        return hookCallback.apply(null, arguments);
	    }

	    // This is done to register the method called with moment()
	    // without creating circular dependencies.
	    function setHookCallback (callback) {
	        hookCallback = callback;
	    }

	    function isArray(input) {
	        return Object.prototype.toString.call(input) === '[object Array]';
	    }

	    function isDate(input) {
	        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
	    }

	    function map(arr, fn) {
	        var res = [], i;
	        for (i = 0; i < arr.length; ++i) {
	            res.push(fn(arr[i], i));
	        }
	        return res;
	    }

	    function hasOwnProp(a, b) {
	        return Object.prototype.hasOwnProperty.call(a, b);
	    }

	    function extend(a, b) {
	        for (var i in b) {
	            if (hasOwnProp(b, i)) {
	                a[i] = b[i];
	            }
	        }

	        if (hasOwnProp(b, 'toString')) {
	            a.toString = b.toString;
	        }

	        if (hasOwnProp(b, 'valueOf')) {
	            a.valueOf = b.valueOf;
	        }

	        return a;
	    }

	    function create_utc__createUTC (input, format, locale, strict) {
	        return createLocalOrUTC(input, format, locale, strict, true).utc();
	    }

	    function defaultParsingFlags() {
	        // We need to deep clone this object.
	        return {
	            empty           : false,
	            unusedTokens    : [],
	            unusedInput     : [],
	            overflow        : -2,
	            charsLeftOver   : 0,
	            nullInput       : false,
	            invalidMonth    : null,
	            invalidFormat   : false,
	            userInvalidated : false,
	            iso             : false
	        };
	    }

	    function getParsingFlags(m) {
	        if (m._pf == null) {
	            m._pf = defaultParsingFlags();
	        }
	        return m._pf;
	    }

	    function valid__isValid(m) {
	        if (m._isValid == null) {
	            var flags = getParsingFlags(m);
	            m._isValid = !isNaN(m._d.getTime()) &&
	                flags.overflow < 0 &&
	                !flags.empty &&
	                !flags.invalidMonth &&
	                !flags.invalidWeekday &&
	                !flags.nullInput &&
	                !flags.invalidFormat &&
	                !flags.userInvalidated;

	            if (m._strict) {
	                m._isValid = m._isValid &&
	                    flags.charsLeftOver === 0 &&
	                    flags.unusedTokens.length === 0 &&
	                    flags.bigHour === undefined;
	            }
	        }
	        return m._isValid;
	    }

	    function valid__createInvalid (flags) {
	        var m = create_utc__createUTC(NaN);
	        if (flags != null) {
	            extend(getParsingFlags(m), flags);
	        }
	        else {
	            getParsingFlags(m).userInvalidated = true;
	        }

	        return m;
	    }

	    var momentProperties = utils_hooks__hooks.momentProperties = [];

	    function copyConfig(to, from) {
	        var i, prop, val;

	        if (typeof from._isAMomentObject !== 'undefined') {
	            to._isAMomentObject = from._isAMomentObject;
	        }
	        if (typeof from._i !== 'undefined') {
	            to._i = from._i;
	        }
	        if (typeof from._f !== 'undefined') {
	            to._f = from._f;
	        }
	        if (typeof from._l !== 'undefined') {
	            to._l = from._l;
	        }
	        if (typeof from._strict !== 'undefined') {
	            to._strict = from._strict;
	        }
	        if (typeof from._tzm !== 'undefined') {
	            to._tzm = from._tzm;
	        }
	        if (typeof from._isUTC !== 'undefined') {
	            to._isUTC = from._isUTC;
	        }
	        if (typeof from._offset !== 'undefined') {
	            to._offset = from._offset;
	        }
	        if (typeof from._pf !== 'undefined') {
	            to._pf = getParsingFlags(from);
	        }
	        if (typeof from._locale !== 'undefined') {
	            to._locale = from._locale;
	        }

	        if (momentProperties.length > 0) {
	            for (i in momentProperties) {
	                prop = momentProperties[i];
	                val = from[prop];
	                if (typeof val !== 'undefined') {
	                    to[prop] = val;
	                }
	            }
	        }

	        return to;
	    }

	    var updateInProgress = false;

	    // Moment prototype object
	    function Moment(config) {
	        copyConfig(this, config);
	        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
	        // Prevent infinite loop in case updateOffset creates new moment
	        // objects.
	        if (updateInProgress === false) {
	            updateInProgress = true;
	            utils_hooks__hooks.updateOffset(this);
	            updateInProgress = false;
	        }
	    }

	    function isMoment (obj) {
	        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
	    }

	    function absFloor (number) {
	        if (number < 0) {
	            return Math.ceil(number);
	        } else {
	            return Math.floor(number);
	        }
	    }

	    function toInt(argumentForCoercion) {
	        var coercedNumber = +argumentForCoercion,
	            value = 0;

	        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
	            value = absFloor(coercedNumber);
	        }

	        return value;
	    }

	    function compareArrays(array1, array2, dontConvert) {
	        var len = Math.min(array1.length, array2.length),
	            lengthDiff = Math.abs(array1.length - array2.length),
	            diffs = 0,
	            i;
	        for (i = 0; i < len; i++) {
	            if ((dontConvert && array1[i] !== array2[i]) ||
	                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
	                diffs++;
	            }
	        }
	        return diffs + lengthDiff;
	    }

	    function Locale() {
	    }

	    var locales = {};
	    var globalLocale;

	    function normalizeLocale(key) {
	        return key ? key.toLowerCase().replace('_', '-') : key;
	    }

	    // pick the locale from the array
	    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
	    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
	    function chooseLocale(names) {
	        var i = 0, j, next, locale, split;

	        while (i < names.length) {
	            split = normalizeLocale(names[i]).split('-');
	            j = split.length;
	            next = normalizeLocale(names[i + 1]);
	            next = next ? next.split('-') : null;
	            while (j > 0) {
	                locale = loadLocale(split.slice(0, j).join('-'));
	                if (locale) {
	                    return locale;
	                }
	                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
	                    //the next array item is better than a shallower substring of this one
	                    break;
	                }
	                j--;
	            }
	            i++;
	        }
	        return null;
	    }

	    function loadLocale(name) {
	        var oldLocale = null;
	        // TODO: Find a better way to register and load all the locales in Node
	        if (!locales[name] && typeof module !== 'undefined' &&
	                module && module.exports) {
	            try {
	                oldLocale = globalLocale._abbr;
	                !(function webpackMissingModule() { var e = new Error("Cannot find module \"./locale\""); e.code = 'MODULE_NOT_FOUND'; throw e; }());
	                // because defineLocale currently also sets the global locale, we
	                // want to undo that for lazy loaded locales
	                locale_locales__getSetGlobalLocale(oldLocale);
	            } catch (e) { }
	        }
	        return locales[name];
	    }

	    // This function will load locale and then set the global locale.  If
	    // no arguments are passed in, it will simply return the current global
	    // locale key.
	    function locale_locales__getSetGlobalLocale (key, values) {
	        var data;
	        if (key) {
	            if (typeof values === 'undefined') {
	                data = locale_locales__getLocale(key);
	            }
	            else {
	                data = defineLocale(key, values);
	            }

	            if (data) {
	                // moment.duration._locale = moment._locale = data;
	                globalLocale = data;
	            }
	        }

	        return globalLocale._abbr;
	    }

	    function defineLocale (name, values) {
	        if (values !== null) {
	            values.abbr = name;
	            locales[name] = locales[name] || new Locale();
	            locales[name].set(values);

	            // backwards compat for now: also set the locale
	            locale_locales__getSetGlobalLocale(name);

	            return locales[name];
	        } else {
	            // useful for testing
	            delete locales[name];
	            return null;
	        }
	    }

	    // returns locale data
	    function locale_locales__getLocale (key) {
	        var locale;

	        if (key && key._locale && key._locale._abbr) {
	            key = key._locale._abbr;
	        }

	        if (!key) {
	            return globalLocale;
	        }

	        if (!isArray(key)) {
	            //short-circuit everything else
	            locale = loadLocale(key);
	            if (locale) {
	                return locale;
	            }
	            key = [key];
	        }

	        return chooseLocale(key);
	    }

	    var aliases = {};

	    function addUnitAlias (unit, shorthand) {
	        var lowerCase = unit.toLowerCase();
	        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
	    }

	    function normalizeUnits(units) {
	        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
	    }

	    function normalizeObjectUnits(inputObject) {
	        var normalizedInput = {},
	            normalizedProp,
	            prop;

	        for (prop in inputObject) {
	            if (hasOwnProp(inputObject, prop)) {
	                normalizedProp = normalizeUnits(prop);
	                if (normalizedProp) {
	                    normalizedInput[normalizedProp] = inputObject[prop];
	                }
	            }
	        }

	        return normalizedInput;
	    }

	    function makeGetSet (unit, keepTime) {
	        return function (value) {
	            if (value != null) {
	                get_set__set(this, unit, value);
	                utils_hooks__hooks.updateOffset(this, keepTime);
	                return this;
	            } else {
	                return get_set__get(this, unit);
	            }
	        };
	    }

	    function get_set__get (mom, unit) {
	        return mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]();
	    }

	    function get_set__set (mom, unit, value) {
	        return mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
	    }

	    // MOMENTS

	    function getSet (units, value) {
	        var unit;
	        if (typeof units === 'object') {
	            for (unit in units) {
	                this.set(unit, units[unit]);
	            }
	        } else {
	            units = normalizeUnits(units);
	            if (typeof this[units] === 'function') {
	                return this[units](value);
	            }
	        }
	        return this;
	    }

	    function zeroFill(number, targetLength, forceSign) {
	        var absNumber = '' + Math.abs(number),
	            zerosToFill = targetLength - absNumber.length,
	            sign = number >= 0;
	        return (sign ? (forceSign ? '+' : '') : '-') +
	            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
	    }

	    var formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

	    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

	    var formatFunctions = {};

	    var formatTokenFunctions = {};

	    // token:    'M'
	    // padded:   ['MM', 2]
	    // ordinal:  'Mo'
	    // callback: function () { this.month() + 1 }
	    function addFormatToken (token, padded, ordinal, callback) {
	        var func = callback;
	        if (typeof callback === 'string') {
	            func = function () {
	                return this[callback]();
	            };
	        }
	        if (token) {
	            formatTokenFunctions[token] = func;
	        }
	        if (padded) {
	            formatTokenFunctions[padded[0]] = function () {
	                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
	            };
	        }
	        if (ordinal) {
	            formatTokenFunctions[ordinal] = function () {
	                return this.localeData().ordinal(func.apply(this, arguments), token);
	            };
	        }
	    }

	    function removeFormattingTokens(input) {
	        if (input.match(/\[[\s\S]/)) {
	            return input.replace(/^\[|\]$/g, '');
	        }
	        return input.replace(/\\/g, '');
	    }

	    function makeFormatFunction(format) {
	        var array = format.match(formattingTokens), i, length;

	        for (i = 0, length = array.length; i < length; i++) {
	            if (formatTokenFunctions[array[i]]) {
	                array[i] = formatTokenFunctions[array[i]];
	            } else {
	                array[i] = removeFormattingTokens(array[i]);
	            }
	        }

	        return function (mom) {
	            var output = '';
	            for (i = 0; i < length; i++) {
	                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
	            }
	            return output;
	        };
	    }

	    // format date using native date object
	    function formatMoment(m, format) {
	        if (!m.isValid()) {
	            return m.localeData().invalidDate();
	        }

	        format = expandFormat(format, m.localeData());
	        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

	        return formatFunctions[format](m);
	    }

	    function expandFormat(format, locale) {
	        var i = 5;

	        function replaceLongDateFormatTokens(input) {
	            return locale.longDateFormat(input) || input;
	        }

	        localFormattingTokens.lastIndex = 0;
	        while (i >= 0 && localFormattingTokens.test(format)) {
	            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
	            localFormattingTokens.lastIndex = 0;
	            i -= 1;
	        }

	        return format;
	    }

	    var match1         = /\d/;            //       0 - 9
	    var match2         = /\d\d/;          //      00 - 99
	    var match3         = /\d{3}/;         //     000 - 999
	    var match4         = /\d{4}/;         //    0000 - 9999
	    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
	    var match1to2      = /\d\d?/;         //       0 - 99
	    var match1to3      = /\d{1,3}/;       //       0 - 999
	    var match1to4      = /\d{1,4}/;       //       0 - 9999
	    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

	    var matchUnsigned  = /\d+/;           //       0 - inf
	    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

	    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z

	    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

	    // any word (or two) characters or numbers including two/three word month in arabic.
	    var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;

	    var regexes = {};

	    function isFunction (sth) {
	        // https://github.com/moment/moment/issues/2325
	        return typeof sth === 'function' &&
	            Object.prototype.toString.call(sth) === '[object Function]';
	    }


	    function addRegexToken (token, regex, strictRegex) {
	        regexes[token] = isFunction(regex) ? regex : function (isStrict) {
	            return (isStrict && strictRegex) ? strictRegex : regex;
	        };
	    }

	    function getParseRegexForToken (token, config) {
	        if (!hasOwnProp(regexes, token)) {
	            return new RegExp(unescapeFormat(token));
	        }

	        return regexes[token](config._strict, config._locale);
	    }

	    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
	    function unescapeFormat(s) {
	        return s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
	            return p1 || p2 || p3 || p4;
	        }).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	    }

	    var tokens = {};

	    function addParseToken (token, callback) {
	        var i, func = callback;
	        if (typeof token === 'string') {
	            token = [token];
	        }
	        if (typeof callback === 'number') {
	            func = function (input, array) {
	                array[callback] = toInt(input);
	            };
	        }
	        for (i = 0; i < token.length; i++) {
	            tokens[token[i]] = func;
	        }
	    }

	    function addWeekParseToken (token, callback) {
	        addParseToken(token, function (input, array, config, token) {
	            config._w = config._w || {};
	            callback(input, config._w, config, token);
	        });
	    }

	    function addTimeToArrayFromToken(token, input, config) {
	        if (input != null && hasOwnProp(tokens, token)) {
	            tokens[token](input, config._a, config, token);
	        }
	    }

	    var YEAR = 0;
	    var MONTH = 1;
	    var DATE = 2;
	    var HOUR = 3;
	    var MINUTE = 4;
	    var SECOND = 5;
	    var MILLISECOND = 6;

	    function daysInMonth(year, month) {
	        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
	    }

	    // FORMATTING

	    addFormatToken('M', ['MM', 2], 'Mo', function () {
	        return this.month() + 1;
	    });

	    addFormatToken('MMM', 0, 0, function (format) {
	        return this.localeData().monthsShort(this, format);
	    });

	    addFormatToken('MMMM', 0, 0, function (format) {
	        return this.localeData().months(this, format);
	    });

	    // ALIASES

	    addUnitAlias('month', 'M');

	    // PARSING

	    addRegexToken('M',    match1to2);
	    addRegexToken('MM',   match1to2, match2);
	    addRegexToken('MMM',  matchWord);
	    addRegexToken('MMMM', matchWord);

	    addParseToken(['M', 'MM'], function (input, array) {
	        array[MONTH] = toInt(input) - 1;
	    });

	    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
	        var month = config._locale.monthsParse(input, token, config._strict);
	        // if we didn't find a month name, mark the date as invalid.
	        if (month != null) {
	            array[MONTH] = month;
	        } else {
	            getParsingFlags(config).invalidMonth = input;
	        }
	    });

	    // LOCALES

	    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
	    function localeMonths (m) {
	        return this._months[m.month()];
	    }

	    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
	    function localeMonthsShort (m) {
	        return this._monthsShort[m.month()];
	    }

	    function localeMonthsParse (monthName, format, strict) {
	        var i, mom, regex;

	        if (!this._monthsParse) {
	            this._monthsParse = [];
	            this._longMonthsParse = [];
	            this._shortMonthsParse = [];
	        }

	        for (i = 0; i < 12; i++) {
	            // make the regex if we don't have it already
	            mom = create_utc__createUTC([2000, i]);
	            if (strict && !this._longMonthsParse[i]) {
	                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
	                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
	            }
	            if (!strict && !this._monthsParse[i]) {
	                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
	                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
	            }
	            // test the regex
	            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
	                return i;
	            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
	                return i;
	            } else if (!strict && this._monthsParse[i].test(monthName)) {
	                return i;
	            }
	        }
	    }

	    // MOMENTS

	    function setMonth (mom, value) {
	        var dayOfMonth;

	        // TODO: Move this out of here!
	        if (typeof value === 'string') {
	            value = mom.localeData().monthsParse(value);
	            // TODO: Another silent failure?
	            if (typeof value !== 'number') {
	                return mom;
	            }
	        }

	        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
	        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
	        return mom;
	    }

	    function getSetMonth (value) {
	        if (value != null) {
	            setMonth(this, value);
	            utils_hooks__hooks.updateOffset(this, true);
	            return this;
	        } else {
	            return get_set__get(this, 'Month');
	        }
	    }

	    function getDaysInMonth () {
	        return daysInMonth(this.year(), this.month());
	    }

	    function checkOverflow (m) {
	        var overflow;
	        var a = m._a;

	        if (a && getParsingFlags(m).overflow === -2) {
	            overflow =
	                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
	                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
	                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
	                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
	                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
	                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
	                -1;

	            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
	                overflow = DATE;
	            }

	            getParsingFlags(m).overflow = overflow;
	        }

	        return m;
	    }

	    function warn(msg) {
	        if (utils_hooks__hooks.suppressDeprecationWarnings === false && typeof console !== 'undefined' && console.warn) {
	            console.warn('Deprecation warning: ' + msg);
	        }
	    }

	    function deprecate(msg, fn) {
	        var firstTime = true;

	        return extend(function () {
	            if (firstTime) {
	                warn(msg + '\n' + (new Error()).stack);
	                firstTime = false;
	            }
	            return fn.apply(this, arguments);
	        }, fn);
	    }

	    var deprecations = {};

	    function deprecateSimple(name, msg) {
	        if (!deprecations[name]) {
	            warn(msg);
	            deprecations[name] = true;
	        }
	    }

	    utils_hooks__hooks.suppressDeprecationWarnings = false;

	    var from_string__isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

	    var isoDates = [
	        ['YYYYYY-MM-DD', /[+-]\d{6}-\d{2}-\d{2}/],
	        ['YYYY-MM-DD', /\d{4}-\d{2}-\d{2}/],
	        ['GGGG-[W]WW-E', /\d{4}-W\d{2}-\d/],
	        ['GGGG-[W]WW', /\d{4}-W\d{2}/],
	        ['YYYY-DDD', /\d{4}-\d{3}/]
	    ];

	    // iso time formats and regexes
	    var isoTimes = [
	        ['HH:mm:ss.SSSS', /(T| )\d\d:\d\d:\d\d\.\d+/],
	        ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],
	        ['HH:mm', /(T| )\d\d:\d\d/],
	        ['HH', /(T| )\d\d/]
	    ];

	    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

	    // date from iso format
	    function configFromISO(config) {
	        var i, l,
	            string = config._i,
	            match = from_string__isoRegex.exec(string);

	        if (match) {
	            getParsingFlags(config).iso = true;
	            for (i = 0, l = isoDates.length; i < l; i++) {
	                if (isoDates[i][1].exec(string)) {
	                    config._f = isoDates[i][0];
	                    break;
	                }
	            }
	            for (i = 0, l = isoTimes.length; i < l; i++) {
	                if (isoTimes[i][1].exec(string)) {
	                    // match[6] should be 'T' or space
	                    config._f += (match[6] || ' ') + isoTimes[i][0];
	                    break;
	                }
	            }
	            if (string.match(matchOffset)) {
	                config._f += 'Z';
	            }
	            configFromStringAndFormat(config);
	        } else {
	            config._isValid = false;
	        }
	    }

	    // date from iso format or fallback
	    function configFromString(config) {
	        var matched = aspNetJsonRegex.exec(config._i);

	        if (matched !== null) {
	            config._d = new Date(+matched[1]);
	            return;
	        }

	        configFromISO(config);
	        if (config._isValid === false) {
	            delete config._isValid;
	            utils_hooks__hooks.createFromInputFallback(config);
	        }
	    }

	    utils_hooks__hooks.createFromInputFallback = deprecate(
	        'moment construction falls back to js Date. This is ' +
	        'discouraged and will be removed in upcoming major ' +
	        'release. Please refer to ' +
	        'https://github.com/moment/moment/issues/1407 for more info.',
	        function (config) {
	            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
	        }
	    );

	    function createDate (y, m, d, h, M, s, ms) {
	        //can't just apply() to create a date:
	        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
	        var date = new Date(y, m, d, h, M, s, ms);

	        //the date constructor doesn't accept years < 1970
	        if (y < 1970) {
	            date.setFullYear(y);
	        }
	        return date;
	    }

	    function createUTCDate (y) {
	        var date = new Date(Date.UTC.apply(null, arguments));
	        if (y < 1970) {
	            date.setUTCFullYear(y);
	        }
	        return date;
	    }

	    addFormatToken(0, ['YY', 2], 0, function () {
	        return this.year() % 100;
	    });

	    addFormatToken(0, ['YYYY',   4],       0, 'year');
	    addFormatToken(0, ['YYYYY',  5],       0, 'year');
	    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

	    // ALIASES

	    addUnitAlias('year', 'y');

	    // PARSING

	    addRegexToken('Y',      matchSigned);
	    addRegexToken('YY',     match1to2, match2);
	    addRegexToken('YYYY',   match1to4, match4);
	    addRegexToken('YYYYY',  match1to6, match6);
	    addRegexToken('YYYYYY', match1to6, match6);

	    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
	    addParseToken('YYYY', function (input, array) {
	        array[YEAR] = input.length === 2 ? utils_hooks__hooks.parseTwoDigitYear(input) : toInt(input);
	    });
	    addParseToken('YY', function (input, array) {
	        array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input);
	    });

	    // HELPERS

	    function daysInYear(year) {
	        return isLeapYear(year) ? 366 : 365;
	    }

	    function isLeapYear(year) {
	        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
	    }

	    // HOOKS

	    utils_hooks__hooks.parseTwoDigitYear = function (input) {
	        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
	    };

	    // MOMENTS

	    var getSetYear = makeGetSet('FullYear', false);

	    function getIsLeapYear () {
	        return isLeapYear(this.year());
	    }

	    addFormatToken('w', ['ww', 2], 'wo', 'week');
	    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

	    // ALIASES

	    addUnitAlias('week', 'w');
	    addUnitAlias('isoWeek', 'W');

	    // PARSING

	    addRegexToken('w',  match1to2);
	    addRegexToken('ww', match1to2, match2);
	    addRegexToken('W',  match1to2);
	    addRegexToken('WW', match1to2, match2);

	    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
	        week[token.substr(0, 1)] = toInt(input);
	    });

	    // HELPERS

	    // firstDayOfWeek       0 = sun, 6 = sat
	    //                      the day of the week that starts the week
	    //                      (usually sunday or monday)
	    // firstDayOfWeekOfYear 0 = sun, 6 = sat
	    //                      the first week is the week that contains the first
	    //                      of this day of the week
	    //                      (eg. ISO weeks use thursday (4))
	    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
	        var end = firstDayOfWeekOfYear - firstDayOfWeek,
	            daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),
	            adjustedMoment;


	        if (daysToDayOfWeek > end) {
	            daysToDayOfWeek -= 7;
	        }

	        if (daysToDayOfWeek < end - 7) {
	            daysToDayOfWeek += 7;
	        }

	        adjustedMoment = local__createLocal(mom).add(daysToDayOfWeek, 'd');
	        return {
	            week: Math.ceil(adjustedMoment.dayOfYear() / 7),
	            year: adjustedMoment.year()
	        };
	    }

	    // LOCALES

	    function localeWeek (mom) {
	        return weekOfYear(mom, this._week.dow, this._week.doy).week;
	    }

	    var defaultLocaleWeek = {
	        dow : 0, // Sunday is the first day of the week.
	        doy : 6  // The week that contains Jan 1st is the first week of the year.
	    };

	    function localeFirstDayOfWeek () {
	        return this._week.dow;
	    }

	    function localeFirstDayOfYear () {
	        return this._week.doy;
	    }

	    // MOMENTS

	    function getSetWeek (input) {
	        var week = this.localeData().week(this);
	        return input == null ? week : this.add((input - week) * 7, 'd');
	    }

	    function getSetISOWeek (input) {
	        var week = weekOfYear(this, 1, 4).week;
	        return input == null ? week : this.add((input - week) * 7, 'd');
	    }

	    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

	    // ALIASES

	    addUnitAlias('dayOfYear', 'DDD');

	    // PARSING

	    addRegexToken('DDD',  match1to3);
	    addRegexToken('DDDD', match3);
	    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
	        config._dayOfYear = toInt(input);
	    });

	    // HELPERS

	    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
	    function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
	        var week1Jan = 6 + firstDayOfWeek - firstDayOfWeekOfYear, janX = createUTCDate(year, 0, 1 + week1Jan), d = janX.getUTCDay(), dayOfYear;
	        if (d < firstDayOfWeek) {
	            d += 7;
	        }

	        weekday = weekday != null ? 1 * weekday : firstDayOfWeek;

	        dayOfYear = 1 + week1Jan + 7 * (week - 1) - d + weekday;

	        return {
	            year: dayOfYear > 0 ? year : year - 1,
	            dayOfYear: dayOfYear > 0 ?  dayOfYear : daysInYear(year - 1) + dayOfYear
	        };
	    }

	    // MOMENTS

	    function getSetDayOfYear (input) {
	        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
	        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
	    }

	    // Pick the first defined of two or three arguments.
	    function defaults(a, b, c) {
	        if (a != null) {
	            return a;
	        }
	        if (b != null) {
	            return b;
	        }
	        return c;
	    }

	    function currentDateArray(config) {
	        var now = new Date();
	        if (config._useUTC) {
	            return [now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()];
	        }
	        return [now.getFullYear(), now.getMonth(), now.getDate()];
	    }

	    // convert an array to a date.
	    // the array should mirror the parameters below
	    // note: all values past the year are optional and will default to the lowest possible value.
	    // [year, month, day , hour, minute, second, millisecond]
	    function configFromArray (config) {
	        var i, date, input = [], currentDate, yearToUse;

	        if (config._d) {
	            return;
	        }

	        currentDate = currentDateArray(config);

	        //compute day of the year from weeks and weekdays
	        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
	            dayOfYearFromWeekInfo(config);
	        }

	        //if the day of the year is set, figure out what it is
	        if (config._dayOfYear) {
	            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

	            if (config._dayOfYear > daysInYear(yearToUse)) {
	                getParsingFlags(config)._overflowDayOfYear = true;
	            }

	            date = createUTCDate(yearToUse, 0, config._dayOfYear);
	            config._a[MONTH] = date.getUTCMonth();
	            config._a[DATE] = date.getUTCDate();
	        }

	        // Default to current date.
	        // * if no year, month, day of month are given, default to today
	        // * if day of month is given, default month and year
	        // * if month is given, default only year
	        // * if year is given, don't default anything
	        for (i = 0; i < 3 && config._a[i] == null; ++i) {
	            config._a[i] = input[i] = currentDate[i];
	        }

	        // Zero out whatever was not defaulted, including time
	        for (; i < 7; i++) {
	            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
	        }

	        // Check for 24:00:00.000
	        if (config._a[HOUR] === 24 &&
	                config._a[MINUTE] === 0 &&
	                config._a[SECOND] === 0 &&
	                config._a[MILLISECOND] === 0) {
	            config._nextDay = true;
	            config._a[HOUR] = 0;
	        }

	        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
	        // Apply timezone offset from input. The actual utcOffset can be changed
	        // with parseZone.
	        if (config._tzm != null) {
	            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
	        }

	        if (config._nextDay) {
	            config._a[HOUR] = 24;
	        }
	    }

	    function dayOfYearFromWeekInfo(config) {
	        var w, weekYear, week, weekday, dow, doy, temp;

	        w = config._w;
	        if (w.GG != null || w.W != null || w.E != null) {
	            dow = 1;
	            doy = 4;

	            // TODO: We need to take the current isoWeekYear, but that depends on
	            // how we interpret now (local, utc, fixed offset). So create
	            // a now version of current config (take local/utc/offset flags, and
	            // create now).
	            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year);
	            week = defaults(w.W, 1);
	            weekday = defaults(w.E, 1);
	        } else {
	            dow = config._locale._week.dow;
	            doy = config._locale._week.doy;

	            weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year);
	            week = defaults(w.w, 1);

	            if (w.d != null) {
	                // weekday -- low day numbers are considered next week
	                weekday = w.d;
	                if (weekday < dow) {
	                    ++week;
	                }
	            } else if (w.e != null) {
	                // local weekday -- counting starts from begining of week
	                weekday = w.e + dow;
	            } else {
	                // default to begining of week
	                weekday = dow;
	            }
	        }
	        temp = dayOfYearFromWeeks(weekYear, week, weekday, doy, dow);

	        config._a[YEAR] = temp.year;
	        config._dayOfYear = temp.dayOfYear;
	    }

	    utils_hooks__hooks.ISO_8601 = function () {};

	    // date from string and format string
	    function configFromStringAndFormat(config) {
	        // TODO: Move this to another part of the creation flow to prevent circular deps
	        if (config._f === utils_hooks__hooks.ISO_8601) {
	            configFromISO(config);
	            return;
	        }

	        config._a = [];
	        getParsingFlags(config).empty = true;

	        // This array is used to make a Date, either with `new Date` or `Date.UTC`
	        var string = '' + config._i,
	            i, parsedInput, tokens, token, skipped,
	            stringLength = string.length,
	            totalParsedInputLength = 0;

	        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

	        for (i = 0; i < tokens.length; i++) {
	            token = tokens[i];
	            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
	            if (parsedInput) {
	                skipped = string.substr(0, string.indexOf(parsedInput));
	                if (skipped.length > 0) {
	                    getParsingFlags(config).unusedInput.push(skipped);
	                }
	                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
	                totalParsedInputLength += parsedInput.length;
	            }
	            // don't parse if it's not a known token
	            if (formatTokenFunctions[token]) {
	                if (parsedInput) {
	                    getParsingFlags(config).empty = false;
	                }
	                else {
	                    getParsingFlags(config).unusedTokens.push(token);
	                }
	                addTimeToArrayFromToken(token, parsedInput, config);
	            }
	            else if (config._strict && !parsedInput) {
	                getParsingFlags(config).unusedTokens.push(token);
	            }
	        }

	        // add remaining unparsed input length to the string
	        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
	        if (string.length > 0) {
	            getParsingFlags(config).unusedInput.push(string);
	        }

	        // clear _12h flag if hour is <= 12
	        if (getParsingFlags(config).bigHour === true &&
	                config._a[HOUR] <= 12 &&
	                config._a[HOUR] > 0) {
	            getParsingFlags(config).bigHour = undefined;
	        }
	        // handle meridiem
	        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

	        configFromArray(config);
	        checkOverflow(config);
	    }


	    function meridiemFixWrap (locale, hour, meridiem) {
	        var isPm;

	        if (meridiem == null) {
	            // nothing to do
	            return hour;
	        }
	        if (locale.meridiemHour != null) {
	            return locale.meridiemHour(hour, meridiem);
	        } else if (locale.isPM != null) {
	            // Fallback
	            isPm = locale.isPM(meridiem);
	            if (isPm && hour < 12) {
	                hour += 12;
	            }
	            if (!isPm && hour === 12) {
	                hour = 0;
	            }
	            return hour;
	        } else {
	            // this is not supposed to happen
	            return hour;
	        }
	    }

	    function configFromStringAndArray(config) {
	        var tempConfig,
	            bestMoment,

	            scoreToBeat,
	            i,
	            currentScore;

	        if (config._f.length === 0) {
	            getParsingFlags(config).invalidFormat = true;
	            config._d = new Date(NaN);
	            return;
	        }

	        for (i = 0; i < config._f.length; i++) {
	            currentScore = 0;
	            tempConfig = copyConfig({}, config);
	            if (config._useUTC != null) {
	                tempConfig._useUTC = config._useUTC;
	            }
	            tempConfig._f = config._f[i];
	            configFromStringAndFormat(tempConfig);

	            if (!valid__isValid(tempConfig)) {
	                continue;
	            }

	            // if there is any input that was not parsed add a penalty for that format
	            currentScore += getParsingFlags(tempConfig).charsLeftOver;

	            //or tokens
	            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

	            getParsingFlags(tempConfig).score = currentScore;

	            if (scoreToBeat == null || currentScore < scoreToBeat) {
	                scoreToBeat = currentScore;
	                bestMoment = tempConfig;
	            }
	        }

	        extend(config, bestMoment || tempConfig);
	    }

	    function configFromObject(config) {
	        if (config._d) {
	            return;
	        }

	        var i = normalizeObjectUnits(config._i);
	        config._a = [i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond];

	        configFromArray(config);
	    }

	    function createFromConfig (config) {
	        var res = new Moment(checkOverflow(prepareConfig(config)));
	        if (res._nextDay) {
	            // Adding is smart enough around DST
	            res.add(1, 'd');
	            res._nextDay = undefined;
	        }

	        return res;
	    }

	    function prepareConfig (config) {
	        var input = config._i,
	            format = config._f;

	        config._locale = config._locale || locale_locales__getLocale(config._l);

	        if (input === null || (format === undefined && input === '')) {
	            return valid__createInvalid({nullInput: true});
	        }

	        if (typeof input === 'string') {
	            config._i = input = config._locale.preparse(input);
	        }

	        if (isMoment(input)) {
	            return new Moment(checkOverflow(input));
	        } else if (isArray(format)) {
	            configFromStringAndArray(config);
	        } else if (format) {
	            configFromStringAndFormat(config);
	        } else if (isDate(input)) {
	            config._d = input;
	        } else {
	            configFromInput(config);
	        }

	        return config;
	    }

	    function configFromInput(config) {
	        var input = config._i;
	        if (input === undefined) {
	            config._d = new Date();
	        } else if (isDate(input)) {
	            config._d = new Date(+input);
	        } else if (typeof input === 'string') {
	            configFromString(config);
	        } else if (isArray(input)) {
	            config._a = map(input.slice(0), function (obj) {
	                return parseInt(obj, 10);
	            });
	            configFromArray(config);
	        } else if (typeof(input) === 'object') {
	            configFromObject(config);
	        } else if (typeof(input) === 'number') {
	            // from milliseconds
	            config._d = new Date(input);
	        } else {
	            utils_hooks__hooks.createFromInputFallback(config);
	        }
	    }

	    function createLocalOrUTC (input, format, locale, strict, isUTC) {
	        var c = {};

	        if (typeof(locale) === 'boolean') {
	            strict = locale;
	            locale = undefined;
	        }
	        // object construction must be done this way.
	        // https://github.com/moment/moment/issues/1423
	        c._isAMomentObject = true;
	        c._useUTC = c._isUTC = isUTC;
	        c._l = locale;
	        c._i = input;
	        c._f = format;
	        c._strict = strict;

	        return createFromConfig(c);
	    }

	    function local__createLocal (input, format, locale, strict) {
	        return createLocalOrUTC(input, format, locale, strict, false);
	    }

	    var prototypeMin = deprecate(
	         'moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',
	         function () {
	             var other = local__createLocal.apply(null, arguments);
	             return other < this ? this : other;
	         }
	     );

	    var prototypeMax = deprecate(
	        'moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',
	        function () {
	            var other = local__createLocal.apply(null, arguments);
	            return other > this ? this : other;
	        }
	    );

	    // Pick a moment m from moments so that m[fn](other) is true for all
	    // other. This relies on the function fn to be transitive.
	    //
	    // moments should either be an array of moment objects or an array, whose
	    // first element is an array of moment objects.
	    function pickBy(fn, moments) {
	        var res, i;
	        if (moments.length === 1 && isArray(moments[0])) {
	            moments = moments[0];
	        }
	        if (!moments.length) {
	            return local__createLocal();
	        }
	        res = moments[0];
	        for (i = 1; i < moments.length; ++i) {
	            if (!moments[i].isValid() || moments[i][fn](res)) {
	                res = moments[i];
	            }
	        }
	        return res;
	    }

	    // TODO: Use [].sort instead?
	    function min () {
	        var args = [].slice.call(arguments, 0);

	        return pickBy('isBefore', args);
	    }

	    function max () {
	        var args = [].slice.call(arguments, 0);

	        return pickBy('isAfter', args);
	    }

	    function Duration (duration) {
	        var normalizedInput = normalizeObjectUnits(duration),
	            years = normalizedInput.year || 0,
	            quarters = normalizedInput.quarter || 0,
	            months = normalizedInput.month || 0,
	            weeks = normalizedInput.week || 0,
	            days = normalizedInput.day || 0,
	            hours = normalizedInput.hour || 0,
	            minutes = normalizedInput.minute || 0,
	            seconds = normalizedInput.second || 0,
	            milliseconds = normalizedInput.millisecond || 0;

	        // representation for dateAddRemove
	        this._milliseconds = +milliseconds +
	            seconds * 1e3 + // 1000
	            minutes * 6e4 + // 1000 * 60
	            hours * 36e5; // 1000 * 60 * 60
	        // Because of dateAddRemove treats 24 hours as different from a
	        // day when working around DST, we need to store them separately
	        this._days = +days +
	            weeks * 7;
	        // It is impossible translate months into days without knowing
	        // which months you are are talking about, so we have to store
	        // it separately.
	        this._months = +months +
	            quarters * 3 +
	            years * 12;

	        this._data = {};

	        this._locale = locale_locales__getLocale();

	        this._bubble();
	    }

	    function isDuration (obj) {
	        return obj instanceof Duration;
	    }

	    function offset (token, separator) {
	        addFormatToken(token, 0, 0, function () {
	            var offset = this.utcOffset();
	            var sign = '+';
	            if (offset < 0) {
	                offset = -offset;
	                sign = '-';
	            }
	            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
	        });
	    }

	    offset('Z', ':');
	    offset('ZZ', '');

	    // PARSING

	    addRegexToken('Z',  matchOffset);
	    addRegexToken('ZZ', matchOffset);
	    addParseToken(['Z', 'ZZ'], function (input, array, config) {
	        config._useUTC = true;
	        config._tzm = offsetFromString(input);
	    });

	    // HELPERS

	    // timezone chunker
	    // '+10:00' > ['10',  '00']
	    // '-1530'  > ['-15', '30']
	    var chunkOffset = /([\+\-]|\d\d)/gi;

	    function offsetFromString(string) {
	        var matches = ((string || '').match(matchOffset) || []);
	        var chunk   = matches[matches.length - 1] || [];
	        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
	        var minutes = +(parts[1] * 60) + toInt(parts[2]);

	        return parts[0] === '+' ? minutes : -minutes;
	    }

	    // Return a moment from input, that is local/utc/zone equivalent to model.
	    function cloneWithOffset(input, model) {
	        var res, diff;
	        if (model._isUTC) {
	            res = model.clone();
	            diff = (isMoment(input) || isDate(input) ? +input : +local__createLocal(input)) - (+res);
	            // Use low-level api, because this fn is low-level api.
	            res._d.setTime(+res._d + diff);
	            utils_hooks__hooks.updateOffset(res, false);
	            return res;
	        } else {
	            return local__createLocal(input).local();
	        }
	    }

	    function getDateOffset (m) {
	        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
	        // https://github.com/moment/moment/pull/1871
	        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
	    }

	    // HOOKS

	    // This function will be called whenever a moment is mutated.
	    // It is intended to keep the offset in sync with the timezone.
	    utils_hooks__hooks.updateOffset = function () {};

	    // MOMENTS

	    // keepLocalTime = true means only change the timezone, without
	    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
	    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
	    // +0200, so we adjust the time as needed, to be valid.
	    //
	    // Keeping the time actually adds/subtracts (one hour)
	    // from the actual represented time. That is why we call updateOffset
	    // a second time. In case it wants us to change the offset again
	    // _changeInProgress == true case, then we have to adjust, because
	    // there is no such time in the given timezone.
	    function getSetOffset (input, keepLocalTime) {
	        var offset = this._offset || 0,
	            localAdjust;
	        if (input != null) {
	            if (typeof input === 'string') {
	                input = offsetFromString(input);
	            }
	            if (Math.abs(input) < 16) {
	                input = input * 60;
	            }
	            if (!this._isUTC && keepLocalTime) {
	                localAdjust = getDateOffset(this);
	            }
	            this._offset = input;
	            this._isUTC = true;
	            if (localAdjust != null) {
	                this.add(localAdjust, 'm');
	            }
	            if (offset !== input) {
	                if (!keepLocalTime || this._changeInProgress) {
	                    add_subtract__addSubtract(this, create__createDuration(input - offset, 'm'), 1, false);
	                } else if (!this._changeInProgress) {
	                    this._changeInProgress = true;
	                    utils_hooks__hooks.updateOffset(this, true);
	                    this._changeInProgress = null;
	                }
	            }
	            return this;
	        } else {
	            return this._isUTC ? offset : getDateOffset(this);
	        }
	    }

	    function getSetZone (input, keepLocalTime) {
	        if (input != null) {
	            if (typeof input !== 'string') {
	                input = -input;
	            }

	            this.utcOffset(input, keepLocalTime);

	            return this;
	        } else {
	            return -this.utcOffset();
	        }
	    }

	    function setOffsetToUTC (keepLocalTime) {
	        return this.utcOffset(0, keepLocalTime);
	    }

	    function setOffsetToLocal (keepLocalTime) {
	        if (this._isUTC) {
	            this.utcOffset(0, keepLocalTime);
	            this._isUTC = false;

	            if (keepLocalTime) {
	                this.subtract(getDateOffset(this), 'm');
	            }
	        }
	        return this;
	    }

	    function setOffsetToParsedOffset () {
	        if (this._tzm) {
	            this.utcOffset(this._tzm);
	        } else if (typeof this._i === 'string') {
	            this.utcOffset(offsetFromString(this._i));
	        }
	        return this;
	    }

	    function hasAlignedHourOffset (input) {
	        input = input ? local__createLocal(input).utcOffset() : 0;

	        return (this.utcOffset() - input) % 60 === 0;
	    }

	    function isDaylightSavingTime () {
	        return (
	            this.utcOffset() > this.clone().month(0).utcOffset() ||
	            this.utcOffset() > this.clone().month(5).utcOffset()
	        );
	    }

	    function isDaylightSavingTimeShifted () {
	        if (typeof this._isDSTShifted !== 'undefined') {
	            return this._isDSTShifted;
	        }

	        var c = {};

	        copyConfig(c, this);
	        c = prepareConfig(c);

	        if (c._a) {
	            var other = c._isUTC ? create_utc__createUTC(c._a) : local__createLocal(c._a);
	            this._isDSTShifted = this.isValid() &&
	                compareArrays(c._a, other.toArray()) > 0;
	        } else {
	            this._isDSTShifted = false;
	        }

	        return this._isDSTShifted;
	    }

	    function isLocal () {
	        return !this._isUTC;
	    }

	    function isUtcOffset () {
	        return this._isUTC;
	    }

	    function isUtc () {
	        return this._isUTC && this._offset === 0;
	    }

	    var aspNetRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/;

	    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
	    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
	    var create__isoRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;

	    function create__createDuration (input, key) {
	        var duration = input,
	            // matching against regexp is expensive, do it on demand
	            match = null,
	            sign,
	            ret,
	            diffRes;

	        if (isDuration(input)) {
	            duration = {
	                ms : input._milliseconds,
	                d  : input._days,
	                M  : input._months
	            };
	        } else if (typeof input === 'number') {
	            duration = {};
	            if (key) {
	                duration[key] = input;
	            } else {
	                duration.milliseconds = input;
	            }
	        } else if (!!(match = aspNetRegex.exec(input))) {
	            sign = (match[1] === '-') ? -1 : 1;
	            duration = {
	                y  : 0,
	                d  : toInt(match[DATE])        * sign,
	                h  : toInt(match[HOUR])        * sign,
	                m  : toInt(match[MINUTE])      * sign,
	                s  : toInt(match[SECOND])      * sign,
	                ms : toInt(match[MILLISECOND]) * sign
	            };
	        } else if (!!(match = create__isoRegex.exec(input))) {
	            sign = (match[1] === '-') ? -1 : 1;
	            duration = {
	                y : parseIso(match[2], sign),
	                M : parseIso(match[3], sign),
	                d : parseIso(match[4], sign),
	                h : parseIso(match[5], sign),
	                m : parseIso(match[6], sign),
	                s : parseIso(match[7], sign),
	                w : parseIso(match[8], sign)
	            };
	        } else if (duration == null) {// checks for null or undefined
	            duration = {};
	        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
	            diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to));

	            duration = {};
	            duration.ms = diffRes.milliseconds;
	            duration.M = diffRes.months;
	        }

	        ret = new Duration(duration);

	        if (isDuration(input) && hasOwnProp(input, '_locale')) {
	            ret._locale = input._locale;
	        }

	        return ret;
	    }

	    create__createDuration.fn = Duration.prototype;

	    function parseIso (inp, sign) {
	        // We'd normally use ~~inp for this, but unfortunately it also
	        // converts floats to ints.
	        // inp may be undefined, so careful calling replace on it.
	        var res = inp && parseFloat(inp.replace(',', '.'));
	        // apply sign while we're at it
	        return (isNaN(res) ? 0 : res) * sign;
	    }

	    function positiveMomentsDifference(base, other) {
	        var res = {milliseconds: 0, months: 0};

	        res.months = other.month() - base.month() +
	            (other.year() - base.year()) * 12;
	        if (base.clone().add(res.months, 'M').isAfter(other)) {
	            --res.months;
	        }

	        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

	        return res;
	    }

	    function momentsDifference(base, other) {
	        var res;
	        other = cloneWithOffset(other, base);
	        if (base.isBefore(other)) {
	            res = positiveMomentsDifference(base, other);
	        } else {
	            res = positiveMomentsDifference(other, base);
	            res.milliseconds = -res.milliseconds;
	            res.months = -res.months;
	        }

	        return res;
	    }

	    function createAdder(direction, name) {
	        return function (val, period) {
	            var dur, tmp;
	            //invert the arguments, but complain about it
	            if (period !== null && !isNaN(+period)) {
	                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
	                tmp = val; val = period; period = tmp;
	            }

	            val = typeof val === 'string' ? +val : val;
	            dur = create__createDuration(val, period);
	            add_subtract__addSubtract(this, dur, direction);
	            return this;
	        };
	    }

	    function add_subtract__addSubtract (mom, duration, isAdding, updateOffset) {
	        var milliseconds = duration._milliseconds,
	            days = duration._days,
	            months = duration._months;
	        updateOffset = updateOffset == null ? true : updateOffset;

	        if (milliseconds) {
	            mom._d.setTime(+mom._d + milliseconds * isAdding);
	        }
	        if (days) {
	            get_set__set(mom, 'Date', get_set__get(mom, 'Date') + days * isAdding);
	        }
	        if (months) {
	            setMonth(mom, get_set__get(mom, 'Month') + months * isAdding);
	        }
	        if (updateOffset) {
	            utils_hooks__hooks.updateOffset(mom, days || months);
	        }
	    }

	    var add_subtract__add      = createAdder(1, 'add');
	    var add_subtract__subtract = createAdder(-1, 'subtract');

	    function moment_calendar__calendar (time, formats) {
	        // We want to compare the start of today, vs this.
	        // Getting start-of-today depends on whether we're local/utc/offset or not.
	        var now = time || local__createLocal(),
	            sod = cloneWithOffset(now, this).startOf('day'),
	            diff = this.diff(sod, 'days', true),
	            format = diff < -6 ? 'sameElse' :
	                diff < -1 ? 'lastWeek' :
	                diff < 0 ? 'lastDay' :
	                diff < 1 ? 'sameDay' :
	                diff < 2 ? 'nextDay' :
	                diff < 7 ? 'nextWeek' : 'sameElse';
	        return this.format(formats && formats[format] || this.localeData().calendar(format, this, local__createLocal(now)));
	    }

	    function clone () {
	        return new Moment(this);
	    }

	    function isAfter (input, units) {
	        var inputMs;
	        units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
	        if (units === 'millisecond') {
	            input = isMoment(input) ? input : local__createLocal(input);
	            return +this > +input;
	        } else {
	            inputMs = isMoment(input) ? +input : +local__createLocal(input);
	            return inputMs < +this.clone().startOf(units);
	        }
	    }

	    function isBefore (input, units) {
	        var inputMs;
	        units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
	        if (units === 'millisecond') {
	            input = isMoment(input) ? input : local__createLocal(input);
	            return +this < +input;
	        } else {
	            inputMs = isMoment(input) ? +input : +local__createLocal(input);
	            return +this.clone().endOf(units) < inputMs;
	        }
	    }

	    function isBetween (from, to, units) {
	        return this.isAfter(from, units) && this.isBefore(to, units);
	    }

	    function isSame (input, units) {
	        var inputMs;
	        units = normalizeUnits(units || 'millisecond');
	        if (units === 'millisecond') {
	            input = isMoment(input) ? input : local__createLocal(input);
	            return +this === +input;
	        } else {
	            inputMs = +local__createLocal(input);
	            return +(this.clone().startOf(units)) <= inputMs && inputMs <= +(this.clone().endOf(units));
	        }
	    }

	    function diff (input, units, asFloat) {
	        var that = cloneWithOffset(input, this),
	            zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4,
	            delta, output;

	        units = normalizeUnits(units);

	        if (units === 'year' || units === 'month' || units === 'quarter') {
	            output = monthDiff(this, that);
	            if (units === 'quarter') {
	                output = output / 3;
	            } else if (units === 'year') {
	                output = output / 12;
	            }
	        } else {
	            delta = this - that;
	            output = units === 'second' ? delta / 1e3 : // 1000
	                units === 'minute' ? delta / 6e4 : // 1000 * 60
	                units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
	                units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
	                units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
	                delta;
	        }
	        return asFloat ? output : absFloor(output);
	    }

	    function monthDiff (a, b) {
	        // difference in months
	        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
	            // b is in (anchor - 1 month, anchor + 1 month)
	            anchor = a.clone().add(wholeMonthDiff, 'months'),
	            anchor2, adjust;

	        if (b - anchor < 0) {
	            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
	            // linear across the month
	            adjust = (b - anchor) / (anchor - anchor2);
	        } else {
	            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
	            // linear across the month
	            adjust = (b - anchor) / (anchor2 - anchor);
	        }

	        return -(wholeMonthDiff + adjust);
	    }

	    utils_hooks__hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';

	    function toString () {
	        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
	    }

	    function moment_format__toISOString () {
	        var m = this.clone().utc();
	        if (0 < m.year() && m.year() <= 9999) {
	            if ('function' === typeof Date.prototype.toISOString) {
	                // native implementation is ~50x faster, use it when we can
	                return this.toDate().toISOString();
	            } else {
	                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
	            }
	        } else {
	            return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
	        }
	    }

	    function format (inputString) {
	        var output = formatMoment(this, inputString || utils_hooks__hooks.defaultFormat);
	        return this.localeData().postformat(output);
	    }

	    function from (time, withoutSuffix) {
	        if (!this.isValid()) {
	            return this.localeData().invalidDate();
	        }
	        return create__createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
	    }

	    function fromNow (withoutSuffix) {
	        return this.from(local__createLocal(), withoutSuffix);
	    }

	    function to (time, withoutSuffix) {
	        if (!this.isValid()) {
	            return this.localeData().invalidDate();
	        }
	        return create__createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
	    }

	    function toNow (withoutSuffix) {
	        return this.to(local__createLocal(), withoutSuffix);
	    }

	    function locale (key) {
	        var newLocaleData;

	        if (key === undefined) {
	            return this._locale._abbr;
	        } else {
	            newLocaleData = locale_locales__getLocale(key);
	            if (newLocaleData != null) {
	                this._locale = newLocaleData;
	            }
	            return this;
	        }
	    }

	    var lang = deprecate(
	        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
	        function (key) {
	            if (key === undefined) {
	                return this.localeData();
	            } else {
	                return this.locale(key);
	            }
	        }
	    );

	    function localeData () {
	        return this._locale;
	    }

	    function startOf (units) {
	        units = normalizeUnits(units);
	        // the following switch intentionally omits break keywords
	        // to utilize falling through the cases.
	        switch (units) {
	        case 'year':
	            this.month(0);
	            /* falls through */
	        case 'quarter':
	        case 'month':
	            this.date(1);
	            /* falls through */
	        case 'week':
	        case 'isoWeek':
	        case 'day':
	            this.hours(0);
	            /* falls through */
	        case 'hour':
	            this.minutes(0);
	            /* falls through */
	        case 'minute':
	            this.seconds(0);
	            /* falls through */
	        case 'second':
	            this.milliseconds(0);
	        }

	        // weeks are a special case
	        if (units === 'week') {
	            this.weekday(0);
	        }
	        if (units === 'isoWeek') {
	            this.isoWeekday(1);
	        }

	        // quarters are also special
	        if (units === 'quarter') {
	            this.month(Math.floor(this.month() / 3) * 3);
	        }

	        return this;
	    }

	    function endOf (units) {
	        units = normalizeUnits(units);
	        if (units === undefined || units === 'millisecond') {
	            return this;
	        }
	        return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
	    }

	    function to_type__valueOf () {
	        return +this._d - ((this._offset || 0) * 60000);
	    }

	    function unix () {
	        return Math.floor(+this / 1000);
	    }

	    function toDate () {
	        return this._offset ? new Date(+this) : this._d;
	    }

	    function toArray () {
	        var m = this;
	        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
	    }

	    function toObject () {
	        var m = this;
	        return {
	            years: m.year(),
	            months: m.month(),
	            date: m.date(),
	            hours: m.hours(),
	            minutes: m.minutes(),
	            seconds: m.seconds(),
	            milliseconds: m.milliseconds()
	        };
	    }

	    function moment_valid__isValid () {
	        return valid__isValid(this);
	    }

	    function parsingFlags () {
	        return extend({}, getParsingFlags(this));
	    }

	    function invalidAt () {
	        return getParsingFlags(this).overflow;
	    }

	    addFormatToken(0, ['gg', 2], 0, function () {
	        return this.weekYear() % 100;
	    });

	    addFormatToken(0, ['GG', 2], 0, function () {
	        return this.isoWeekYear() % 100;
	    });

	    function addWeekYearFormatToken (token, getter) {
	        addFormatToken(0, [token, token.length], 0, getter);
	    }

	    addWeekYearFormatToken('gggg',     'weekYear');
	    addWeekYearFormatToken('ggggg',    'weekYear');
	    addWeekYearFormatToken('GGGG',  'isoWeekYear');
	    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

	    // ALIASES

	    addUnitAlias('weekYear', 'gg');
	    addUnitAlias('isoWeekYear', 'GG');

	    // PARSING

	    addRegexToken('G',      matchSigned);
	    addRegexToken('g',      matchSigned);
	    addRegexToken('GG',     match1to2, match2);
	    addRegexToken('gg',     match1to2, match2);
	    addRegexToken('GGGG',   match1to4, match4);
	    addRegexToken('gggg',   match1to4, match4);
	    addRegexToken('GGGGG',  match1to6, match6);
	    addRegexToken('ggggg',  match1to6, match6);

	    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
	        week[token.substr(0, 2)] = toInt(input);
	    });

	    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
	        week[token] = utils_hooks__hooks.parseTwoDigitYear(input);
	    });

	    // HELPERS

	    function weeksInYear(year, dow, doy) {
	        return weekOfYear(local__createLocal([year, 11, 31 + dow - doy]), dow, doy).week;
	    }

	    // MOMENTS

	    function getSetWeekYear (input) {
	        var year = weekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
	        return input == null ? year : this.add((input - year), 'y');
	    }

	    function getSetISOWeekYear (input) {
	        var year = weekOfYear(this, 1, 4).year;
	        return input == null ? year : this.add((input - year), 'y');
	    }

	    function getISOWeeksInYear () {
	        return weeksInYear(this.year(), 1, 4);
	    }

	    function getWeeksInYear () {
	        var weekInfo = this.localeData()._week;
	        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
	    }

	    addFormatToken('Q', 0, 0, 'quarter');

	    // ALIASES

	    addUnitAlias('quarter', 'Q');

	    // PARSING

	    addRegexToken('Q', match1);
	    addParseToken('Q', function (input, array) {
	        array[MONTH] = (toInt(input) - 1) * 3;
	    });

	    // MOMENTS

	    function getSetQuarter (input) {
	        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
	    }

	    addFormatToken('D', ['DD', 2], 'Do', 'date');

	    // ALIASES

	    addUnitAlias('date', 'D');

	    // PARSING

	    addRegexToken('D',  match1to2);
	    addRegexToken('DD', match1to2, match2);
	    addRegexToken('Do', function (isStrict, locale) {
	        return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
	    });

	    addParseToken(['D', 'DD'], DATE);
	    addParseToken('Do', function (input, array) {
	        array[DATE] = toInt(input.match(match1to2)[0], 10);
	    });

	    // MOMENTS

	    var getSetDayOfMonth = makeGetSet('Date', true);

	    addFormatToken('d', 0, 'do', 'day');

	    addFormatToken('dd', 0, 0, function (format) {
	        return this.localeData().weekdaysMin(this, format);
	    });

	    addFormatToken('ddd', 0, 0, function (format) {
	        return this.localeData().weekdaysShort(this, format);
	    });

	    addFormatToken('dddd', 0, 0, function (format) {
	        return this.localeData().weekdays(this, format);
	    });

	    addFormatToken('e', 0, 0, 'weekday');
	    addFormatToken('E', 0, 0, 'isoWeekday');

	    // ALIASES

	    addUnitAlias('day', 'd');
	    addUnitAlias('weekday', 'e');
	    addUnitAlias('isoWeekday', 'E');

	    // PARSING

	    addRegexToken('d',    match1to2);
	    addRegexToken('e',    match1to2);
	    addRegexToken('E',    match1to2);
	    addRegexToken('dd',   matchWord);
	    addRegexToken('ddd',  matchWord);
	    addRegexToken('dddd', matchWord);

	    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config) {
	        var weekday = config._locale.weekdaysParse(input);
	        // if we didn't get a weekday name, mark the date as invalid
	        if (weekday != null) {
	            week.d = weekday;
	        } else {
	            getParsingFlags(config).invalidWeekday = input;
	        }
	    });

	    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
	        week[token] = toInt(input);
	    });

	    // HELPERS

	    function parseWeekday(input, locale) {
	        if (typeof input !== 'string') {
	            return input;
	        }

	        if (!isNaN(input)) {
	            return parseInt(input, 10);
	        }

	        input = locale.weekdaysParse(input);
	        if (typeof input === 'number') {
	            return input;
	        }

	        return null;
	    }

	    // LOCALES

	    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
	    function localeWeekdays (m) {
	        return this._weekdays[m.day()];
	    }

	    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
	    function localeWeekdaysShort (m) {
	        return this._weekdaysShort[m.day()];
	    }

	    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
	    function localeWeekdaysMin (m) {
	        return this._weekdaysMin[m.day()];
	    }

	    function localeWeekdaysParse (weekdayName) {
	        var i, mom, regex;

	        this._weekdaysParse = this._weekdaysParse || [];

	        for (i = 0; i < 7; i++) {
	            // make the regex if we don't have it already
	            if (!this._weekdaysParse[i]) {
	                mom = local__createLocal([2000, 1]).day(i);
	                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
	                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
	            }
	            // test the regex
	            if (this._weekdaysParse[i].test(weekdayName)) {
	                return i;
	            }
	        }
	    }

	    // MOMENTS

	    function getSetDayOfWeek (input) {
	        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
	        if (input != null) {
	            input = parseWeekday(input, this.localeData());
	            return this.add(input - day, 'd');
	        } else {
	            return day;
	        }
	    }

	    function getSetLocaleDayOfWeek (input) {
	        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
	        return input == null ? weekday : this.add(input - weekday, 'd');
	    }

	    function getSetISODayOfWeek (input) {
	        // behaves the same as moment#day except
	        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
	        // as a setter, sunday should belong to the previous week.
	        return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
	    }

	    addFormatToken('H', ['HH', 2], 0, 'hour');
	    addFormatToken('h', ['hh', 2], 0, function () {
	        return this.hours() % 12 || 12;
	    });

	    function meridiem (token, lowercase) {
	        addFormatToken(token, 0, 0, function () {
	            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
	        });
	    }

	    meridiem('a', true);
	    meridiem('A', false);

	    // ALIASES

	    addUnitAlias('hour', 'h');

	    // PARSING

	    function matchMeridiem (isStrict, locale) {
	        return locale._meridiemParse;
	    }

	    addRegexToken('a',  matchMeridiem);
	    addRegexToken('A',  matchMeridiem);
	    addRegexToken('H',  match1to2);
	    addRegexToken('h',  match1to2);
	    addRegexToken('HH', match1to2, match2);
	    addRegexToken('hh', match1to2, match2);

	    addParseToken(['H', 'HH'], HOUR);
	    addParseToken(['a', 'A'], function (input, array, config) {
	        config._isPm = config._locale.isPM(input);
	        config._meridiem = input;
	    });
	    addParseToken(['h', 'hh'], function (input, array, config) {
	        array[HOUR] = toInt(input);
	        getParsingFlags(config).bigHour = true;
	    });

	    // LOCALES

	    function localeIsPM (input) {
	        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
	        // Using charAt should be more compatible.
	        return ((input + '').toLowerCase().charAt(0) === 'p');
	    }

	    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
	    function localeMeridiem (hours, minutes, isLower) {
	        if (hours > 11) {
	            return isLower ? 'pm' : 'PM';
	        } else {
	            return isLower ? 'am' : 'AM';
	        }
	    }


	    // MOMENTS

	    // Setting the hour should keep the time, because the user explicitly
	    // specified which hour he wants. So trying to maintain the same hour (in
	    // a new timezone) makes sense. Adding/subtracting hours does not follow
	    // this rule.
	    var getSetHour = makeGetSet('Hours', true);

	    addFormatToken('m', ['mm', 2], 0, 'minute');

	    // ALIASES

	    addUnitAlias('minute', 'm');

	    // PARSING

	    addRegexToken('m',  match1to2);
	    addRegexToken('mm', match1to2, match2);
	    addParseToken(['m', 'mm'], MINUTE);

	    // MOMENTS

	    var getSetMinute = makeGetSet('Minutes', false);

	    addFormatToken('s', ['ss', 2], 0, 'second');

	    // ALIASES

	    addUnitAlias('second', 's');

	    // PARSING

	    addRegexToken('s',  match1to2);
	    addRegexToken('ss', match1to2, match2);
	    addParseToken(['s', 'ss'], SECOND);

	    // MOMENTS

	    var getSetSecond = makeGetSet('Seconds', false);

	    addFormatToken('S', 0, 0, function () {
	        return ~~(this.millisecond() / 100);
	    });

	    addFormatToken(0, ['SS', 2], 0, function () {
	        return ~~(this.millisecond() / 10);
	    });

	    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
	    addFormatToken(0, ['SSSS', 4], 0, function () {
	        return this.millisecond() * 10;
	    });
	    addFormatToken(0, ['SSSSS', 5], 0, function () {
	        return this.millisecond() * 100;
	    });
	    addFormatToken(0, ['SSSSSS', 6], 0, function () {
	        return this.millisecond() * 1000;
	    });
	    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
	        return this.millisecond() * 10000;
	    });
	    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
	        return this.millisecond() * 100000;
	    });
	    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
	        return this.millisecond() * 1000000;
	    });


	    // ALIASES

	    addUnitAlias('millisecond', 'ms');

	    // PARSING

	    addRegexToken('S',    match1to3, match1);
	    addRegexToken('SS',   match1to3, match2);
	    addRegexToken('SSS',  match1to3, match3);

	    var token;
	    for (token = 'SSSS'; token.length <= 9; token += 'S') {
	        addRegexToken(token, matchUnsigned);
	    }

	    function parseMs(input, array) {
	        array[MILLISECOND] = toInt(('0.' + input) * 1000);
	    }

	    for (token = 'S'; token.length <= 9; token += 'S') {
	        addParseToken(token, parseMs);
	    }
	    // MOMENTS

	    var getSetMillisecond = makeGetSet('Milliseconds', false);

	    addFormatToken('z',  0, 0, 'zoneAbbr');
	    addFormatToken('zz', 0, 0, 'zoneName');

	    // MOMENTS

	    function getZoneAbbr () {
	        return this._isUTC ? 'UTC' : '';
	    }

	    function getZoneName () {
	        return this._isUTC ? 'Coordinated Universal Time' : '';
	    }

	    var momentPrototype__proto = Moment.prototype;

	    momentPrototype__proto.add          = add_subtract__add;
	    momentPrototype__proto.calendar     = moment_calendar__calendar;
	    momentPrototype__proto.clone        = clone;
	    momentPrototype__proto.diff         = diff;
	    momentPrototype__proto.endOf        = endOf;
	    momentPrototype__proto.format       = format;
	    momentPrototype__proto.from         = from;
	    momentPrototype__proto.fromNow      = fromNow;
	    momentPrototype__proto.to           = to;
	    momentPrototype__proto.toNow        = toNow;
	    momentPrototype__proto.get          = getSet;
	    momentPrototype__proto.invalidAt    = invalidAt;
	    momentPrototype__proto.isAfter      = isAfter;
	    momentPrototype__proto.isBefore     = isBefore;
	    momentPrototype__proto.isBetween    = isBetween;
	    momentPrototype__proto.isSame       = isSame;
	    momentPrototype__proto.isValid      = moment_valid__isValid;
	    momentPrototype__proto.lang         = lang;
	    momentPrototype__proto.locale       = locale;
	    momentPrototype__proto.localeData   = localeData;
	    momentPrototype__proto.max          = prototypeMax;
	    momentPrototype__proto.min          = prototypeMin;
	    momentPrototype__proto.parsingFlags = parsingFlags;
	    momentPrototype__proto.set          = getSet;
	    momentPrototype__proto.startOf      = startOf;
	    momentPrototype__proto.subtract     = add_subtract__subtract;
	    momentPrototype__proto.toArray      = toArray;
	    momentPrototype__proto.toObject     = toObject;
	    momentPrototype__proto.toDate       = toDate;
	    momentPrototype__proto.toISOString  = moment_format__toISOString;
	    momentPrototype__proto.toJSON       = moment_format__toISOString;
	    momentPrototype__proto.toString     = toString;
	    momentPrototype__proto.unix         = unix;
	    momentPrototype__proto.valueOf      = to_type__valueOf;

	    // Year
	    momentPrototype__proto.year       = getSetYear;
	    momentPrototype__proto.isLeapYear = getIsLeapYear;

	    // Week Year
	    momentPrototype__proto.weekYear    = getSetWeekYear;
	    momentPrototype__proto.isoWeekYear = getSetISOWeekYear;

	    // Quarter
	    momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter;

	    // Month
	    momentPrototype__proto.month       = getSetMonth;
	    momentPrototype__proto.daysInMonth = getDaysInMonth;

	    // Week
	    momentPrototype__proto.week           = momentPrototype__proto.weeks        = getSetWeek;
	    momentPrototype__proto.isoWeek        = momentPrototype__proto.isoWeeks     = getSetISOWeek;
	    momentPrototype__proto.weeksInYear    = getWeeksInYear;
	    momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear;

	    // Day
	    momentPrototype__proto.date       = getSetDayOfMonth;
	    momentPrototype__proto.day        = momentPrototype__proto.days             = getSetDayOfWeek;
	    momentPrototype__proto.weekday    = getSetLocaleDayOfWeek;
	    momentPrototype__proto.isoWeekday = getSetISODayOfWeek;
	    momentPrototype__proto.dayOfYear  = getSetDayOfYear;

	    // Hour
	    momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour;

	    // Minute
	    momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute;

	    // Second
	    momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond;

	    // Millisecond
	    momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond;

	    // Offset
	    momentPrototype__proto.utcOffset            = getSetOffset;
	    momentPrototype__proto.utc                  = setOffsetToUTC;
	    momentPrototype__proto.local                = setOffsetToLocal;
	    momentPrototype__proto.parseZone            = setOffsetToParsedOffset;
	    momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset;
	    momentPrototype__proto.isDST                = isDaylightSavingTime;
	    momentPrototype__proto.isDSTShifted         = isDaylightSavingTimeShifted;
	    momentPrototype__proto.isLocal              = isLocal;
	    momentPrototype__proto.isUtcOffset          = isUtcOffset;
	    momentPrototype__proto.isUtc                = isUtc;
	    momentPrototype__proto.isUTC                = isUtc;

	    // Timezone
	    momentPrototype__proto.zoneAbbr = getZoneAbbr;
	    momentPrototype__proto.zoneName = getZoneName;

	    // Deprecations
	    momentPrototype__proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
	    momentPrototype__proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
	    momentPrototype__proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
	    momentPrototype__proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779', getSetZone);

	    var momentPrototype = momentPrototype__proto;

	    function moment__createUnix (input) {
	        return local__createLocal(input * 1000);
	    }

	    function moment__createInZone () {
	        return local__createLocal.apply(null, arguments).parseZone();
	    }

	    var defaultCalendar = {
	        sameDay : '[Today at] LT',
	        nextDay : '[Tomorrow at] LT',
	        nextWeek : 'dddd [at] LT',
	        lastDay : '[Yesterday at] LT',
	        lastWeek : '[Last] dddd [at] LT',
	        sameElse : 'L'
	    };

	    function locale_calendar__calendar (key, mom, now) {
	        var output = this._calendar[key];
	        return typeof output === 'function' ? output.call(mom, now) : output;
	    }

	    var defaultLongDateFormat = {
	        LTS  : 'h:mm:ss A',
	        LT   : 'h:mm A',
	        L    : 'MM/DD/YYYY',
	        LL   : 'MMMM D, YYYY',
	        LLL  : 'MMMM D, YYYY h:mm A',
	        LLLL : 'dddd, MMMM D, YYYY h:mm A'
	    };

	    function longDateFormat (key) {
	        var format = this._longDateFormat[key],
	            formatUpper = this._longDateFormat[key.toUpperCase()];

	        if (format || !formatUpper) {
	            return format;
	        }

	        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
	            return val.slice(1);
	        });

	        return this._longDateFormat[key];
	    }

	    var defaultInvalidDate = 'Invalid date';

	    function invalidDate () {
	        return this._invalidDate;
	    }

	    var defaultOrdinal = '%d';
	    var defaultOrdinalParse = /\d{1,2}/;

	    function ordinal (number) {
	        return this._ordinal.replace('%d', number);
	    }

	    function preParsePostFormat (string) {
	        return string;
	    }

	    var defaultRelativeTime = {
	        future : 'in %s',
	        past   : '%s ago',
	        s  : 'a few seconds',
	        m  : 'a minute',
	        mm : '%d minutes',
	        h  : 'an hour',
	        hh : '%d hours',
	        d  : 'a day',
	        dd : '%d days',
	        M  : 'a month',
	        MM : '%d months',
	        y  : 'a year',
	        yy : '%d years'
	    };

	    function relative__relativeTime (number, withoutSuffix, string, isFuture) {
	        var output = this._relativeTime[string];
	        return (typeof output === 'function') ?
	            output(number, withoutSuffix, string, isFuture) :
	            output.replace(/%d/i, number);
	    }

	    function pastFuture (diff, output) {
	        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
	        return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);
	    }

	    function locale_set__set (config) {
	        var prop, i;
	        for (i in config) {
	            prop = config[i];
	            if (typeof prop === 'function') {
	                this[i] = prop;
	            } else {
	                this['_' + i] = prop;
	            }
	        }
	        // Lenient ordinal parsing accepts just a number in addition to
	        // number + (possibly) stuff coming from _ordinalParseLenient.
	        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + (/\d{1,2}/).source);
	    }

	    var prototype__proto = Locale.prototype;

	    prototype__proto._calendar       = defaultCalendar;
	    prototype__proto.calendar        = locale_calendar__calendar;
	    prototype__proto._longDateFormat = defaultLongDateFormat;
	    prototype__proto.longDateFormat  = longDateFormat;
	    prototype__proto._invalidDate    = defaultInvalidDate;
	    prototype__proto.invalidDate     = invalidDate;
	    prototype__proto._ordinal        = defaultOrdinal;
	    prototype__proto.ordinal         = ordinal;
	    prototype__proto._ordinalParse   = defaultOrdinalParse;
	    prototype__proto.preparse        = preParsePostFormat;
	    prototype__proto.postformat      = preParsePostFormat;
	    prototype__proto._relativeTime   = defaultRelativeTime;
	    prototype__proto.relativeTime    = relative__relativeTime;
	    prototype__proto.pastFuture      = pastFuture;
	    prototype__proto.set             = locale_set__set;

	    // Month
	    prototype__proto.months       =        localeMonths;
	    prototype__proto._months      = defaultLocaleMonths;
	    prototype__proto.monthsShort  =        localeMonthsShort;
	    prototype__proto._monthsShort = defaultLocaleMonthsShort;
	    prototype__proto.monthsParse  =        localeMonthsParse;

	    // Week
	    prototype__proto.week = localeWeek;
	    prototype__proto._week = defaultLocaleWeek;
	    prototype__proto.firstDayOfYear = localeFirstDayOfYear;
	    prototype__proto.firstDayOfWeek = localeFirstDayOfWeek;

	    // Day of Week
	    prototype__proto.weekdays       =        localeWeekdays;
	    prototype__proto._weekdays      = defaultLocaleWeekdays;
	    prototype__proto.weekdaysMin    =        localeWeekdaysMin;
	    prototype__proto._weekdaysMin   = defaultLocaleWeekdaysMin;
	    prototype__proto.weekdaysShort  =        localeWeekdaysShort;
	    prototype__proto._weekdaysShort = defaultLocaleWeekdaysShort;
	    prototype__proto.weekdaysParse  =        localeWeekdaysParse;

	    // Hours
	    prototype__proto.isPM = localeIsPM;
	    prototype__proto._meridiemParse = defaultLocaleMeridiemParse;
	    prototype__proto.meridiem = localeMeridiem;

	    function lists__get (format, index, field, setter) {
	        var locale = locale_locales__getLocale();
	        var utc = create_utc__createUTC().set(setter, index);
	        return locale[field](utc, format);
	    }

	    function list (format, index, field, count, setter) {
	        if (typeof format === 'number') {
	            index = format;
	            format = undefined;
	        }

	        format = format || '';

	        if (index != null) {
	            return lists__get(format, index, field, setter);
	        }

	        var i;
	        var out = [];
	        for (i = 0; i < count; i++) {
	            out[i] = lists__get(format, i, field, setter);
	        }
	        return out;
	    }

	    function lists__listMonths (format, index) {
	        return list(format, index, 'months', 12, 'month');
	    }

	    function lists__listMonthsShort (format, index) {
	        return list(format, index, 'monthsShort', 12, 'month');
	    }

	    function lists__listWeekdays (format, index) {
	        return list(format, index, 'weekdays', 7, 'day');
	    }

	    function lists__listWeekdaysShort (format, index) {
	        return list(format, index, 'weekdaysShort', 7, 'day');
	    }

	    function lists__listWeekdaysMin (format, index) {
	        return list(format, index, 'weekdaysMin', 7, 'day');
	    }

	    locale_locales__getSetGlobalLocale('en', {
	        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (toInt(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	            return number + output;
	        }
	    });

	    // Side effect imports
	    utils_hooks__hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', locale_locales__getSetGlobalLocale);
	    utils_hooks__hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', locale_locales__getLocale);

	    var mathAbs = Math.abs;

	    function duration_abs__abs () {
	        var data           = this._data;

	        this._milliseconds = mathAbs(this._milliseconds);
	        this._days         = mathAbs(this._days);
	        this._months       = mathAbs(this._months);

	        data.milliseconds  = mathAbs(data.milliseconds);
	        data.seconds       = mathAbs(data.seconds);
	        data.minutes       = mathAbs(data.minutes);
	        data.hours         = mathAbs(data.hours);
	        data.months        = mathAbs(data.months);
	        data.years         = mathAbs(data.years);

	        return this;
	    }

	    function duration_add_subtract__addSubtract (duration, input, value, direction) {
	        var other = create__createDuration(input, value);

	        duration._milliseconds += direction * other._milliseconds;
	        duration._days         += direction * other._days;
	        duration._months       += direction * other._months;

	        return duration._bubble();
	    }

	    // supports only 2.0-style add(1, 's') or add(duration)
	    function duration_add_subtract__add (input, value) {
	        return duration_add_subtract__addSubtract(this, input, value, 1);
	    }

	    // supports only 2.0-style subtract(1, 's') or subtract(duration)
	    function duration_add_subtract__subtract (input, value) {
	        return duration_add_subtract__addSubtract(this, input, value, -1);
	    }

	    function absCeil (number) {
	        if (number < 0) {
	            return Math.floor(number);
	        } else {
	            return Math.ceil(number);
	        }
	    }

	    function bubble () {
	        var milliseconds = this._milliseconds;
	        var days         = this._days;
	        var months       = this._months;
	        var data         = this._data;
	        var seconds, minutes, hours, years, monthsFromDays;

	        // if we have a mix of positive and negative values, bubble down first
	        // check: https://github.com/moment/moment/issues/2166
	        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
	                (milliseconds <= 0 && days <= 0 && months <= 0))) {
	            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
	            days = 0;
	            months = 0;
	        }

	        // The following code bubbles up values, see the tests for
	        // examples of what that means.
	        data.milliseconds = milliseconds % 1000;

	        seconds           = absFloor(milliseconds / 1000);
	        data.seconds      = seconds % 60;

	        minutes           = absFloor(seconds / 60);
	        data.minutes      = minutes % 60;

	        hours             = absFloor(minutes / 60);
	        data.hours        = hours % 24;

	        days += absFloor(hours / 24);

	        // convert days to months
	        monthsFromDays = absFloor(daysToMonths(days));
	        months += monthsFromDays;
	        days -= absCeil(monthsToDays(monthsFromDays));

	        // 12 months -> 1 year
	        years = absFloor(months / 12);
	        months %= 12;

	        data.days   = days;
	        data.months = months;
	        data.years  = years;

	        return this;
	    }

	    function daysToMonths (days) {
	        // 400 years have 146097 days (taking into account leap year rules)
	        // 400 years have 12 months === 4800
	        return days * 4800 / 146097;
	    }

	    function monthsToDays (months) {
	        // the reverse of daysToMonths
	        return months * 146097 / 4800;
	    }

	    function as (units) {
	        var days;
	        var months;
	        var milliseconds = this._milliseconds;

	        units = normalizeUnits(units);

	        if (units === 'month' || units === 'year') {
	            days   = this._days   + milliseconds / 864e5;
	            months = this._months + daysToMonths(days);
	            return units === 'month' ? months : months / 12;
	        } else {
	            // handle milliseconds separately because of floating point math errors (issue #1867)
	            days = this._days + Math.round(monthsToDays(this._months));
	            switch (units) {
	                case 'week'   : return days / 7     + milliseconds / 6048e5;
	                case 'day'    : return days         + milliseconds / 864e5;
	                case 'hour'   : return days * 24    + milliseconds / 36e5;
	                case 'minute' : return days * 1440  + milliseconds / 6e4;
	                case 'second' : return days * 86400 + milliseconds / 1000;
	                // Math.floor prevents floating point math errors here
	                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
	                default: throw new Error('Unknown unit ' + units);
	            }
	        }
	    }

	    // TODO: Use this.as('ms')?
	    function duration_as__valueOf () {
	        return (
	            this._milliseconds +
	            this._days * 864e5 +
	            (this._months % 12) * 2592e6 +
	            toInt(this._months / 12) * 31536e6
	        );
	    }

	    function makeAs (alias) {
	        return function () {
	            return this.as(alias);
	        };
	    }

	    var asMilliseconds = makeAs('ms');
	    var asSeconds      = makeAs('s');
	    var asMinutes      = makeAs('m');
	    var asHours        = makeAs('h');
	    var asDays         = makeAs('d');
	    var asWeeks        = makeAs('w');
	    var asMonths       = makeAs('M');
	    var asYears        = makeAs('y');

	    function duration_get__get (units) {
	        units = normalizeUnits(units);
	        return this[units + 's']();
	    }

	    function makeGetter(name) {
	        return function () {
	            return this._data[name];
	        };
	    }

	    var milliseconds = makeGetter('milliseconds');
	    var seconds      = makeGetter('seconds');
	    var minutes      = makeGetter('minutes');
	    var hours        = makeGetter('hours');
	    var days         = makeGetter('days');
	    var months       = makeGetter('months');
	    var years        = makeGetter('years');

	    function weeks () {
	        return absFloor(this.days() / 7);
	    }

	    var round = Math.round;
	    var thresholds = {
	        s: 45,  // seconds to minute
	        m: 45,  // minutes to hour
	        h: 22,  // hours to day
	        d: 26,  // days to month
	        M: 11   // months to year
	    };

	    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
	    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
	        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
	    }

	    function duration_humanize__relativeTime (posNegDuration, withoutSuffix, locale) {
	        var duration = create__createDuration(posNegDuration).abs();
	        var seconds  = round(duration.as('s'));
	        var minutes  = round(duration.as('m'));
	        var hours    = round(duration.as('h'));
	        var days     = round(duration.as('d'));
	        var months   = round(duration.as('M'));
	        var years    = round(duration.as('y'));

	        var a = seconds < thresholds.s && ['s', seconds]  ||
	                minutes === 1          && ['m']           ||
	                minutes < thresholds.m && ['mm', minutes] ||
	                hours   === 1          && ['h']           ||
	                hours   < thresholds.h && ['hh', hours]   ||
	                days    === 1          && ['d']           ||
	                days    < thresholds.d && ['dd', days]    ||
	                months  === 1          && ['M']           ||
	                months  < thresholds.M && ['MM', months]  ||
	                years   === 1          && ['y']           || ['yy', years];

	        a[2] = withoutSuffix;
	        a[3] = +posNegDuration > 0;
	        a[4] = locale;
	        return substituteTimeAgo.apply(null, a);
	    }

	    // This function allows you to set a threshold for relative time strings
	    function duration_humanize__getSetRelativeTimeThreshold (threshold, limit) {
	        if (thresholds[threshold] === undefined) {
	            return false;
	        }
	        if (limit === undefined) {
	            return thresholds[threshold];
	        }
	        thresholds[threshold] = limit;
	        return true;
	    }

	    function humanize (withSuffix) {
	        var locale = this.localeData();
	        var output = duration_humanize__relativeTime(this, !withSuffix, locale);

	        if (withSuffix) {
	            output = locale.pastFuture(+this, output);
	        }

	        return locale.postformat(output);
	    }

	    var iso_string__abs = Math.abs;

	    function iso_string__toISOString() {
	        // for ISO strings we do not use the normal bubbling rules:
	        //  * milliseconds bubble up until they become hours
	        //  * days do not bubble at all
	        //  * months bubble up until they become years
	        // This is because there is no context-free conversion between hours and days
	        // (think of clock changes)
	        // and also not between days and months (28-31 days per month)
	        var seconds = iso_string__abs(this._milliseconds) / 1000;
	        var days         = iso_string__abs(this._days);
	        var months       = iso_string__abs(this._months);
	        var minutes, hours, years;

	        // 3600 seconds -> 60 minutes -> 1 hour
	        minutes           = absFloor(seconds / 60);
	        hours             = absFloor(minutes / 60);
	        seconds %= 60;
	        minutes %= 60;

	        // 12 months -> 1 year
	        years  = absFloor(months / 12);
	        months %= 12;


	        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
	        var Y = years;
	        var M = months;
	        var D = days;
	        var h = hours;
	        var m = minutes;
	        var s = seconds;
	        var total = this.asSeconds();

	        if (!total) {
	            // this is the same as C#'s (Noda) and python (isodate)...
	            // but not other JS (goog.date)
	            return 'P0D';
	        }

	        return (total < 0 ? '-' : '') +
	            'P' +
	            (Y ? Y + 'Y' : '') +
	            (M ? M + 'M' : '') +
	            (D ? D + 'D' : '') +
	            ((h || m || s) ? 'T' : '') +
	            (h ? h + 'H' : '') +
	            (m ? m + 'M' : '') +
	            (s ? s + 'S' : '');
	    }

	    var duration_prototype__proto = Duration.prototype;

	    duration_prototype__proto.abs            = duration_abs__abs;
	    duration_prototype__proto.add            = duration_add_subtract__add;
	    duration_prototype__proto.subtract       = duration_add_subtract__subtract;
	    duration_prototype__proto.as             = as;
	    duration_prototype__proto.asMilliseconds = asMilliseconds;
	    duration_prototype__proto.asSeconds      = asSeconds;
	    duration_prototype__proto.asMinutes      = asMinutes;
	    duration_prototype__proto.asHours        = asHours;
	    duration_prototype__proto.asDays         = asDays;
	    duration_prototype__proto.asWeeks        = asWeeks;
	    duration_prototype__proto.asMonths       = asMonths;
	    duration_prototype__proto.asYears        = asYears;
	    duration_prototype__proto.valueOf        = duration_as__valueOf;
	    duration_prototype__proto._bubble        = bubble;
	    duration_prototype__proto.get            = duration_get__get;
	    duration_prototype__proto.milliseconds   = milliseconds;
	    duration_prototype__proto.seconds        = seconds;
	    duration_prototype__proto.minutes        = minutes;
	    duration_prototype__proto.hours          = hours;
	    duration_prototype__proto.days           = days;
	    duration_prototype__proto.weeks          = weeks;
	    duration_prototype__proto.months         = months;
	    duration_prototype__proto.years          = years;
	    duration_prototype__proto.humanize       = humanize;
	    duration_prototype__proto.toISOString    = iso_string__toISOString;
	    duration_prototype__proto.toString       = iso_string__toISOString;
	    duration_prototype__proto.toJSON         = iso_string__toISOString;
	    duration_prototype__proto.locale         = locale;
	    duration_prototype__proto.localeData     = localeData;

	    // Deprecations
	    duration_prototype__proto.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', iso_string__toISOString);
	    duration_prototype__proto.lang = lang;

	    // Side effect imports

	    addFormatToken('X', 0, 0, 'unix');
	    addFormatToken('x', 0, 0, 'valueOf');

	    // PARSING

	    addRegexToken('x', matchSigned);
	    addRegexToken('X', matchTimestamp);
	    addParseToken('X', function (input, array, config) {
	        config._d = new Date(parseFloat(input, 10) * 1000);
	    });
	    addParseToken('x', function (input, array, config) {
	        config._d = new Date(toInt(input));
	    });

	    // Side effect imports


	    utils_hooks__hooks.version = '2.10.6';

	    setHookCallback(local__createLocal);

	    utils_hooks__hooks.fn                    = momentPrototype;
	    utils_hooks__hooks.min                   = min;
	    utils_hooks__hooks.max                   = max;
	    utils_hooks__hooks.utc                   = create_utc__createUTC;
	    utils_hooks__hooks.unix                  = moment__createUnix;
	    utils_hooks__hooks.months                = lists__listMonths;
	    utils_hooks__hooks.isDate                = isDate;
	    utils_hooks__hooks.locale                = locale_locales__getSetGlobalLocale;
	    utils_hooks__hooks.invalid               = valid__createInvalid;
	    utils_hooks__hooks.duration              = create__createDuration;
	    utils_hooks__hooks.isMoment              = isMoment;
	    utils_hooks__hooks.weekdays              = lists__listWeekdays;
	    utils_hooks__hooks.parseZone             = moment__createInZone;
	    utils_hooks__hooks.localeData            = locale_locales__getLocale;
	    utils_hooks__hooks.isDuration            = isDuration;
	    utils_hooks__hooks.monthsShort           = lists__listMonthsShort;
	    utils_hooks__hooks.weekdaysMin           = lists__listWeekdaysMin;
	    utils_hooks__hooks.defineLocale          = defineLocale;
	    utils_hooks__hooks.weekdaysShort         = lists__listWeekdaysShort;
	    utils_hooks__hooks.normalizeUnits        = normalizeUnits;
	    utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;

	    var _moment = utils_hooks__hooks;

	    return _moment;

	}));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(204)(module)))

/***/ },

/***/ 204:
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },

/***/ 205:
186,

/***/ 206:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @preserve jQuery DateTimePicker plugin v2.3.7
	 * @homepage http://xdsoft.net/jqplugins/datetimepicker/
	 * (c) 2014, Chupurnov Valeriy.
	 */
	(function (factory) {
	    if (true) {
	        // AMD. Register as an anonymous module.
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(183)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        // Node/CommonJS
	        factory(require('jquery'));
	    } else {
	        // Browser globals
	        factory(jQuery);
	    }
	}
	(function ($) {
	    'use strict';
	    var default_options = {
	        i18n: {
	            ar: { // Arabic
	                months: [
	                    "كانون الثاني", "شباط", "آذار", "نيسان", "مايو", "حزيران", "تموز", "آب", "أيلول", "تشرين الأول", "تشرين الثاني", "كانون الأول"
	                ],
	                dayOfWeek: [
	                    "ن", "ث", "ع", "خ", "ج", "س", "ح"
	                ]
	            },
	            ro: { // Romanian
	                months: [
	                    "ianuarie", "februarie", "martie", "aprilie", "mai", "iunie", "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie"
	                ],
	                dayOfWeek: [
	                    "l", "ma", "mi", "j", "v", "s", "d"
	                ]
	            },
	            id: { // Indonesian
	                months: [
	                    "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"
	                ],
	                dayOfWeek: [
	                    "Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"
	                ]
	            },
	            bg: { // Bulgarian
	                months: [
	                    "Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"
	                ],
	                dayOfWeek: [
	                    "Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"
	                ]
	            },
	            fa: { // Persian/Farsi
	                months: [
	                    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
	                ],
	                dayOfWeek: [
	                    'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'
	                ]
	            },
	            ru: { // Russian
	                months: [
	                    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
	                ],
	                dayOfWeek: [
	                    "Вск", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"
	                ]
	            },
	            uk: { // Ukrainian
	                months: [
	                    'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
	                ],
	                dayOfWeek: [
	                    "Ндл", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Сбт"
	                ]
	            },
	            en: { // English
	                months: [
	                    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	                ],
	                dayOfWeek: [
	                    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
	                ]
	            },
	            el: { // Ελληνικά
	                months: [
	                    "Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"
	                ],
	                dayOfWeek: [
	                    "Κυρ", "Δευ", "Τρι", "Τετ", "Πεμ", "Παρ", "Σαβ"
	                ]
	            },
	            de: { // German
	                months: [
	                    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
	                ],
	                dayOfWeek: [
	                    "So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"
	                ]
	            },
	            nl: { // Dutch
	                months: [
	                    "januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"
	                ],
	                dayOfWeek: [
	                    "zo", "ma", "di", "wo", "do", "vr", "za"
	                ]
	            },
	            tr: { // Turkish
	                months: [
	                    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
	                ],
	                dayOfWeek: [
	                    "Paz", "Pts", "Sal", "Çar", "Per", "Cum", "Cts"
	                ]
	            },
	            fr: { //French
	                months: [
	                    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
	                ],
	                dayOfWeek: [
	                    "Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"
	                ]
	            },
	            es: { // Spanish
	                months: [
	                    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
	                ],
	                dayOfWeek: [
	                    "Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"
	                ]
	            },
	            th: { // Thai
	                months: [
	                    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
	                ],
	                dayOfWeek: [
	                    'อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'
	                ]
	            },
	            pl: { // Polish
	                months: [
	                    "styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"
	                ],
	                dayOfWeek: [
	                    "nd", "pn", "wt", "śr", "cz", "pt", "sb"
	                ]
	            },
	            pt: { // Portuguese
	                months: [
	                    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
	                ],
	                dayOfWeek: [
	                    "Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"
	                ]
	            },
	            ch: { // Simplified Chinese
	                months: [
	                    "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"
	                ],
	                dayOfWeek: [
	                    "日", "一", "二", "三", "四", "五", "六"
	                ]
	            },
	            se: { // Swedish
	                months: [
	                    "Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"
	                ],
	                dayOfWeek: [
	                    "Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"
	                ]
	            },
	            kr: { // Korean
	                months: [
	                    "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"
	                ],
	                dayOfWeek: [
	                    "일", "월", "화", "수", "목", "금", "토"
	                ]
	            },
	            it: { // Italian
	                months: [
	                    "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
	                ],
	                dayOfWeek: [
	                    "Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"
	                ]
	            },
	            da: { // Dansk
	                months: [
	                    "January", "Februar", "Marts", "April", "Maj", "Juni", "July", "August", "September", "Oktober", "November", "December"
	                ],
	                dayOfWeek: [
	                    "Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"
	                ]
	            },
	            no: { // Norwegian
	                months: [
	                    "Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"
	                ],
	                dayOfWeek: [
	                    "Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"
	                ]
	            },
	            ja: { // Japanese
	                months: [
	                    "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"
	                ],
	                dayOfWeek: [
	                    "日", "月", "火", "水", "木", "金", "土"
	                ]
	            },
	            vi: { // Vietnamese
	                months: [
	                    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
	                ],
	                dayOfWeek: [
	                    "CN", "T2", "T3", "T4", "T5", "T6", "T7"
	                ]
	            },
	            sl: { // Slovenščina
	                months: [
	                    "Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"
	                ],
	                dayOfWeek: [
	                    "Ned", "Pon", "Tor", "Sre", "Čet", "Pet", "Sob"
	                ]
	            },
	            cs: { // Čeština
	                months: [
	                    "Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"
	                ],
	                dayOfWeek: [
	                    "Ne", "Po", "Út", "St", "Čt", "Pá", "So"
	                ]
	            },
	            hu: { // Hungarian
	                months: [
	                    "Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"
	                ],
	                dayOfWeek: [
	                    "Va", "Hé", "Ke", "Sze", "Cs", "Pé", "Szo"
	                ]
	            }
	        },
	        value: '',
	        lang: 'en',
	        format: 'Y/m/d H:i',
	        formatTime: 'H:i',
	        formatDate: 'Y/m/d',
	        startDate: false, // new Date(), '1986/12/08', '-1970/01/05','-1970/01/05',
	        step: 60,
	        monthChangeSpinner: true,
	        closeOnDateSelect: false,
	        closeOnWithoutClick: true,
	        closeOnInputClick: true,
	        timepicker: true,
	        datepicker: true,
	        weeks: false,
	        defaultTime: false,	// use formatTime format (ex. '10:00' for formatTime:	'H:i')
	        defaultDate: false,	// use formatDate format (ex new Date() or '1986/12/08' or '-1970/01/05' or '-1970/01/05')
	        minDate: false,
	        maxDate: false,
	        minTime: false,
	        maxTime: false,
	        allowTimes: [],
	        opened: false,
	        initTime: true,
	        inline: false,
	        theme: '',
	        onSelectDate: function () {
	        },
	        onSelectTime: function () {
	        },
	        onChangeMonth: function () {
	        },
	        onChangeYear: function () {
	        },
	        onChangeDateTime: function () {
	        },
	        onShow: function () {
	        },
	        onClose: function () {
	        },
	        onGenerate: function () {
	        },
	        withoutCopyright: true,
	        inverseButton: false,
	        hours12: false,
	        next: 'xdsoft_next',
	        prev: 'xdsoft_prev',
	        dayOfWeekStart: 0,
	        parentID: 'body',
	        timeHeightInTimePicker: 25,
	        timepickerScrollbar: true,
	        todayButton: true,
	        defaultSelect: true,
	        scrollMonth: true,
	        scrollTime: true,
	        scrollInput: true,
	        lazyInit: false,
	        mask: false,
	        validateOnBlur: true,
	        allowBlank: true,
	        yearStart: 1950,
	        yearEnd: 2050,
	        style: '',
	        id: '',
	        fixed: false,
	        roundTime: 'round', // ceil, floor
	        className: '',
	        weekends: [],
	        yearOffset: 0,
	        beforeShowDay: null
	    };
	    // fix for ie8
	    if (!Array.prototype.indexOf) {
	        Array.prototype.indexOf = function (obj, start) {
	            var i, j;
	            for (i = (start || 0), j = this.length; i < j; i += 1) {
	                if (this[i] === obj) {
	                    return i;
	                }
	            }
	            return -1;
	        };
	    }
	    Date.prototype.countDaysInMonth = function () {
	        return new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate();
	    };
	    $.fn.xdsoftScroller = function (percent) {
	        return this.each(function () {
	            var timeboxparent = $(this),
	                pointerEventToXY = function (e) {
	                    var out = {x: 0, y: 0},
	                        touch;
	                    if (e.type === 'touchstart' || e.type === 'touchmove' || e.type === 'touchend' || e.type === 'touchcancel') {
	                        touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
	                        out.x = touch.pageX;
	                        out.y = touch.pageY;
	                    } else if (e.type === 'mousedown' || e.type === 'mouseup' || e.type === 'mousemove' || e.type === 'mouseover' || e.type === 'mouseout' || e.type === 'mouseenter' || e.type === 'mouseleave') {
	                        out.x = e.pageX;
	                        out.y = e.pageY;
	                    }
	                    return out;
	                },
	                move = 0,
	                timebox,
	                parentHeight,
	                height,
	                scrollbar,
	                scroller,
	                maximumOffset = 100,
	                start = false;
	            if (!$(this).hasClass('xdsoft_scroller_box')) {
	                timebox = timeboxparent.children().eq(0);
	                parentHeight = timeboxparent[0].clientHeight;
	                height = timebox[0].offsetHeight;
	                scrollbar = $('<div class="xdsoft_scrollbar"></div>');
	                scroller = $('<div class="xdsoft_scroller"></div>');
	                scrollbar.append(scroller);

	                timeboxparent.addClass('xdsoft_scroller_box').append(scrollbar);
	                scroller.on('mousedown.xdsoft_scroller', function (event) {
	                    if (!parentHeight) {
	                        timeboxparent.trigger('resize_scroll.xdsoft_scroller', [percent]);
	                    }
	                    var pageY = event.pageY,
	                        top = parseInt(scroller.css('margin-top'), 10),
	                        h1 = scrollbar[0].offsetHeight;

	                    if (document) {
	                        $(document.body).addClass('xdsoft_noselect');
	                    }
	                    $([document.body, window]).on('mouseup.xdsoft_scroller', function arguments_callee() {
	                        $([document.body, window]).off('mouseup.xdsoft_scroller', arguments_callee)
	                            .off('mousemove.xdsoft_scroller', move)
	                            .removeClass('xdsoft_noselect');
	                    });
	                    $(document.body).on('mousemove.xdsoft_scroller', move = function (event) {
	                        var offset = event.pageY - pageY + top;
	                        if (offset < 0) {
	                            offset = 0;
	                        }
	                        if (offset + scroller[0].offsetHeight > h1) {
	                            offset = h1 - scroller[0].offsetHeight;
	                        }
	                        timeboxparent.trigger('scroll_element.xdsoft_scroller', [maximumOffset ? offset / maximumOffset : 0]);
	                    });
	                });

	                timeboxparent
	                    .on('scroll_element.xdsoft_scroller', function (event, percentage) {
	                        if (!parentHeight) {
	                            timeboxparent.trigger('resize_scroll.xdsoft_scroller', [percentage, true]);
	                        }
	                        percentage = percentage > 1 ? 1 : (percentage < 0 || isNaN(percentage)) ? 0 : percentage;
	                        scroller.css('margin-top', maximumOffset * percentage);
	                        setTimeout(function () {
	                            timebox.css('marginTop', -parseInt((timebox[0].offsetHeight - parentHeight) * percentage, 10));
	                        }, 10);
	                    })
	                    .on('resize_scroll.xdsoft_scroller', function (event, percentage, noTriggerScroll) {
	                        var percent, sh;
	                        parentHeight = timeboxparent[0].clientHeight;
	                        height = timebox[0].offsetHeight;
	                        percent = parentHeight / height;
	                        sh = percent * scrollbar[0].offsetHeight;
	                        if (percent > 1) {
	                            scroller.hide();
	                        } else {
	                            scroller.show();
	                            scroller.css('height', parseInt(sh > 10 ? sh : 10, 10));
	                            maximumOffset = scrollbar[0].offsetHeight - scroller[0].offsetHeight;
	                            if (noTriggerScroll !== true) {
	                                timeboxparent.trigger('scroll_element.xdsoft_scroller', [percentage || Math.abs(parseInt(timebox.css('marginTop'), 10)) / (height - parentHeight)]);
	                            }
	                        }
	                    });
	                if (timeboxparent.mousewheel) {
	                    timeboxparent.mousewheel(function (event, delta, deltaX, deltaY) {
	                        var top = Math.abs(parseInt(timebox.css('marginTop'), 10));
	                        timeboxparent.trigger('scroll_element.xdsoft_scroller', [(top - delta * 20) / (height - parentHeight)]);
	                        event.stopPropagation();
	                        return false;
	                    });
	                }
	                timeboxparent.on('touchstart', function (event) {
	                    start = pointerEventToXY(event);
	                });
	                timeboxparent.on('touchmove', function (event) {
	                    if (start) {
	                        var coord = pointerEventToXY(event), top = Math.abs(parseInt(timebox.css('marginTop'), 10));
	                        timeboxparent.trigger('scroll_element.xdsoft_scroller', [(top - (coord.y - start.y)) / (height - parentHeight)]);
	                        event.stopPropagation();
	                        event.preventDefault();
	                        start = pointerEventToXY(event);
	                    }
	                });
	                timeboxparent.on('touchend touchcancel', function (event) {
	                    start = false;
	                });
	            }
	            timeboxparent.trigger('resize_scroll.xdsoft_scroller', [percent]);
	        });
	    };

	    $.fn.datetimepicker = function (opt) {
	        var KEY0 = 48,
	            KEY9 = 57,
	            _KEY0 = 96,
	            _KEY9 = 105,
	            CTRLKEY = 17,
	            DEL = 46,
	            ENTER = 13,
	            ESC = 27,
	            BACKSPACE = 8,
	            ARROWLEFT = 37,
	            ARROWUP = 38,
	            ARROWRIGHT = 39,
	            ARROWDOWN = 40,
	            TAB = 9,
	            F5 = 116,
	            AKEY = 65,
	            CKEY = 67,
	            VKEY = 86,
	            ZKEY = 90,
	            YKEY = 89,
	            ctrlDown = false,
	            options = ($.isPlainObject(opt) || !opt) ? $.extend(true, {}, default_options, opt) : $.extend(true, {}, default_options),

	            lazyInitTimer = 0,
	            createDateTimePicker,
	            destroyDateTimePicker,
	            _xdsoft_datetime,

	            lazyInit = function (input) {
	                input
	                    .on('open.xdsoft focusin.xdsoft mousedown.xdsoft', function initOnActionCallback(event) {
	                        if (input.is(':disabled') || input.is(':hidden') || !input.is(':visible') || input.data('xdsoft_datetimepicker')) {
	                            return;
	                        }
	                        clearTimeout(lazyInitTimer);
	                        lazyInitTimer = setTimeout(function () {

	                            if (!input.data('xdsoft_datetimepicker')) {
	                                createDateTimePicker(input);
	                            }
	                            input
	                                .off('open.xdsoft focusin.xdsoft mousedown.xdsoft', initOnActionCallback)
	                                .trigger('open.xdsoft');
	                        }, 100);
	                    });
	            };

	        createDateTimePicker = function (input) {
	            var datetimepicker = $('<div ' + (options.id ? 'id="' + options.id + '"' : '') + ' ' + (options.style ? 'style="' + options.style + '"' : '') + ' class="xdsoft_datetimepicker xdsoft_' + options.theme + ' xdsoft_noselect ' + (options.weeks ? ' xdsoft_showweeks' : '') + options.className + '"></div>'),
	                xdsoft_copyright = $('<div class="xdsoft_copyright"><a target="_blank" href="http://xdsoft.net/jqplugins/datetimepicker/">xdsoft.net</a></div>'),
	                datepicker = $('<div class="xdsoft_datepicker active"></div>'),
	                mounth_picker = $('<div class="xdsoft_mounthpicker"><button type="button" class="xdsoft_prev"></button><button type="button" class="xdsoft_today_button"></button>' +
	                '<div class="xdsoft_label xdsoft_month"><span></span><i></i></div>' +
	                '<div class="xdsoft_label xdsoft_year"><span></span><i></i></div>' +
	                '<button type="button" class="xdsoft_next"></button></div>'),
	                calendar = $('<div class="xdsoft_calendar"></div>'),
	                timepicker = $('<div class="xdsoft_timepicker active"><button type="button" class="xdsoft_prev"></button><div class="xdsoft_time_box"></div><button type="button" class="xdsoft_next"></button></div>'),
	                timeboxparent = timepicker.find('.xdsoft_time_box').eq(0),
	                timebox = $('<div class="xdsoft_time_variant"></div>'),
	                scrollbar = $('<div class="xdsoft_scrollbar"></div>'),
	                scroller = $('<div class="xdsoft_scroller"></div>'),
	                monthselect = $('<div class="xdsoft_select xdsoft_monthselect"><div></div></div>'),
	                yearselect = $('<div class="xdsoft_select xdsoft_yearselect"><div></div></div>'),
	                triggerAfterOpen = false,
	                XDSoft_datetime,
	                scroll_element,
	                xchangeTimer,
	                timerclick,
	                current_time_index,
	                setPos,
	                timer = 0,
	                timer1 = 0;

	            mounth_picker
	                .find('.xdsoft_month span')
	                .after(monthselect);
	            mounth_picker
	                .find('.xdsoft_year span')
	                .after(yearselect);

	            mounth_picker
	                .find('.xdsoft_month,.xdsoft_year')
	                .on('mousedown.xdsoft', function (event) {
	                    var select = $(this).find('.xdsoft_select').eq(0),
	                        val = 0,
	                        top = 0,
	                        visible = select.is(':visible'),
	                        items,
	                        i;

	                    mounth_picker
	                        .find('.xdsoft_select')
	                        .hide();
	                    if (_xdsoft_datetime.currentTime) {
	                        val = _xdsoft_datetime.currentTime[$(this).hasClass('xdsoft_month') ? 'getMonth' : 'getFullYear']();
	                    }

	                    select[visible ? 'hide' : 'show']();
	                    for (items = select.find('div.xdsoft_option'), i = 0; i < items.length; i += 1) {
	                        if (items.eq(i).data('value') === val) {
	                            break;
	                        } else {
	                            top += items[0].offsetHeight;
	                        }
	                    }

	                    select.xdsoftScroller(top / (select.children()[0].offsetHeight - (select[0].clientHeight)));
	                    event.stopPropagation();
	                    return false;
	                });

	            mounth_picker
	                .find('.xdsoft_select')
	                .xdsoftScroller()
	                .on('mousedown.xdsoft', function (event) {
	                    event.stopPropagation();
	                    event.preventDefault();
	                })
	                .on('mousedown.xdsoft', '.xdsoft_option', function (event) {
	                    var year = _xdsoft_datetime.currentTime.getFullYear();
	                    if (_xdsoft_datetime && _xdsoft_datetime.currentTime) {
	                        _xdsoft_datetime.currentTime[$(this).parent().parent().hasClass('xdsoft_monthselect') ? 'setMonth' : 'setFullYear']($(this).data('value'));
	                    }

	                    $(this).parent().parent().hide();

	                    datetimepicker.trigger('xchange.xdsoft');
	                    if (options.onChangeMonth && $.isFunction(options.onChangeMonth)) {
	                        options.onChangeMonth.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
	                    }

	                    if (year !== _xdsoft_datetime.currentTime.getFullYear() && $.isFunction(options.onChangeYear)) {
	                        options.onChangeYear.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
	                    }
	                });

	            datetimepicker.setOptions = function (_options) {
	                options = $.extend(true, {}, options, _options);

	                if (_options.allowTimes && $.isArray(_options.allowTimes) && _options.allowTimes.length) {
	                    options.allowTimes = $.extend(true, [], _options.allowTimes);
	                }

	                if (_options.weekends && $.isArray(_options.weekends) && _options.weekends.length) {
	                    options.weekends = $.extend(true, [], _options.weekends);
	                }

	                if ((options.open || options.opened) && (!options.inline)) {
	                    input.trigger('open.xdsoft');
	                }

	                if (options.inline) {
	                    triggerAfterOpen = true;
	                    datetimepicker.addClass('xdsoft_inline');
	                    input.after(datetimepicker).hide();
	                }

	                if (options.inverseButton) {
	                    options.next = 'xdsoft_prev';
	                    options.prev = 'xdsoft_next';
	                }

	                if (options.datepicker) {
	                    datepicker.addClass('active');
	                } else {
	                    datepicker.removeClass('active');
	                }

	                if (options.timepicker) {
	                    timepicker.addClass('active');
	                } else {
	                    timepicker.removeClass('active');
	                }

	                if (options.value) {
	                    if (input && input.val) {
	                        input.val(options.value);
	                    }
	                    _xdsoft_datetime.setCurrentTime(options.value);
	                }

	                if (isNaN(options.dayOfWeekStart)) {
	                    options.dayOfWeekStart = 0;
	                } else {
	                    options.dayOfWeekStart = parseInt(options.dayOfWeekStart, 10) % 7;
	                }

	                if (!options.timepickerScrollbar) {
	                    scrollbar.hide();
	                }

	                if (options.minDate && /^-(.*)$/.test(options.minDate)) {
	                    options.minDate = _xdsoft_datetime.strToDateTime(options.minDate).dateFormat(options.formatDate);
	                }

	                if (options.maxDate && /^\+(.*)$/.test(options.maxDate)) {
	                    options.maxDate = _xdsoft_datetime.strToDateTime(options.maxDate).dateFormat(options.formatDate);
	                }

	                mounth_picker
	                    .find('.xdsoft_today_button')
	                    .css('visibility', !options.todayButton ? 'hidden' : 'visible');

	                if (options.mask) {
	                    var e,
	                        getCaretPos = function (input) {
	                            try {
	                                if (document.selection && document.selection.createRange) {
	                                    var range = document.selection.createRange();
	                                    return range.getBookmark().charCodeAt(2) - 2;
	                                }
	                                if (input.setSelectionRange) {
	                                    return input.selectionStart;
	                                }
	                            } catch (e) {
	                                return 0;
	                            }
	                        },
	                        setCaretPos = function (node, pos) {
	                            node = (typeof node === "string" || node instanceof String) ? document.getElementById(node) : node;
	                            if (!node) {
	                                return false;
	                            }
	                            if (node.createTextRange) {
	                                var textRange = node.createTextRange();
	                                textRange.collapse(true);
	                                textRange.moveEnd('character', pos);
	                                textRange.moveStart('character', pos);
	                                textRange.select();
	                                return true;
	                            }
	                            if (node.setSelectionRange) {
	                                node.setSelectionRange(pos, pos);
	                                return true;
	                            }
	                            return false;
	                        },
	                        isValidValue = function (mask, value) {
	                            var reg = mask
	                                .replace(/([\[\]\/\{\}\(\)\-\.\+]{1})/g, '\\$1')
	                                .replace(/_/g, '{digit+}')
	                                .replace(/([0-9]{1})/g, '{digit$1}')
	                                .replace(/\{digit([0-9]{1})\}/g, '[0-$1_]{1}')
	                                .replace(/\{digit[\+]\}/g, '[0-9_]{1}');
	                            return (new RegExp(reg)).test(value);
	                        };
	                    input.off('keydown.xdsoft');

	                    if (options.mask === true) {
	                        options.mask = options.format
	                            .replace(/Y/g, '9999')
	                            .replace(/F/g, '9999')
	                            .replace(/m/g, '19')
	                            .replace(/d/g, '39')
	                            .replace(/H/g, '29')
	                            .replace(/i/g, '59')
	                            .replace(/s/g, '59');
	                    }

	                    if ($.type(options.mask) === 'string') {
	                        if (!isValidValue(options.mask, input.val())) {
	                            input.val(options.mask.replace(/[0-9]/g, '_'));
	                        }

	                        input.on('keydown.xdsoft', function (event) {
	                            var val = this.value,
	                                key = event.which,
	                                pos,
	                                digit;

	                            if (((key >= KEY0 && key <= KEY9) || (key >= _KEY0 && key <= _KEY9)) || (key === BACKSPACE || key === DEL)) {
	                                pos = getCaretPos(this);
	                                digit = (key !== BACKSPACE && key !== DEL) ? String.fromCharCode((_KEY0 <= key && key <= _KEY9) ? key - KEY0 : key) : '_';

	                                if ((key === BACKSPACE || key === DEL) && pos) {
	                                    pos -= 1;
	                                    digit = '_';
	                                }

	                                while (/[^0-9_]/.test(options.mask.substr(pos, 1)) && pos < options.mask.length && pos > 0) {
	                                    pos += (key === BACKSPACE || key === DEL) ? -1 : 1;
	                                }

	                                val = val.substr(0, pos) + digit + val.substr(pos + 1);
	                                if ($.trim(val) === '') {
	                                    val = options.mask.replace(/[0-9]/g, '_');
	                                } else {
	                                    if (pos === options.mask.length) {
	                                        event.preventDefault();
	                                        return false;
	                                    }
	                                }

	                                pos += (key === BACKSPACE || key === DEL) ? 0 : 1;
	                                while (/[^0-9_]/.test(options.mask.substr(pos, 1)) && pos < options.mask.length && pos > 0) {
	                                    pos += (key === BACKSPACE || key === DEL) ? -1 : 1;
	                                }

	                                if (isValidValue(options.mask, val)) {
	                                    this.value = val;
	                                    setCaretPos(this, pos);
	                                } else if ($.trim(val) === '') {
	                                    this.value = options.mask.replace(/[0-9]/g, '_');
	                                } else {
	                                    input.trigger('error_input.xdsoft');
	                                }
	                            } else {
	                                if (([AKEY, CKEY, VKEY, ZKEY, YKEY].indexOf(key) !== -1 && ctrlDown) || [ESC, ARROWUP, ARROWDOWN, ARROWLEFT, ARROWRIGHT, F5, CTRLKEY, TAB, ENTER].indexOf(key) !== -1) {
	                                    return true;
	                                }
	                            }

	                            event.preventDefault();
	                            return false;
	                        });
	                    }
	                }
	                if (options.validateOnBlur) {
	                    input
	                        .off('blur.xdsoft')
	                        .on('blur.xdsoft', function () {
	                            if (options.allowBlank && !$.trim($(this).val()).length) {
	                                $(this).val(null);
	                                datetimepicker.data('xdsoft_datetime').empty();
	                            } else if (!Date.parseDate($(this).val(), options.format)) {
	                                $(this).val((_xdsoft_datetime.now()).dateFormat(options.format));
	                                datetimepicker.data('xdsoft_datetime').setCurrentTime($(this).val());
	                            } else {
	                                datetimepicker.data('xdsoft_datetime').setCurrentTime($(this).val());
	                            }
	                            datetimepicker.trigger('changedatetime.xdsoft');
	                        });
	                }
	                options.dayOfWeekStartPrev = (options.dayOfWeekStart === 0) ? 6 : options.dayOfWeekStart - 1;

	                datetimepicker
	                    .trigger('xchange.xdsoft')
	                    .trigger('afterOpen.xdsoft');
	            };

	            datetimepicker
	                .data('options', options)
	                .on('mousedown.xdsoft', function (event) {
	                    event.stopPropagation();
	                    event.preventDefault();
	                    yearselect.hide();
	                    monthselect.hide();
	                    return false;
	                });

	            scroll_element = timepicker.find('.xdsoft_time_box');
	            scroll_element.append(timebox);
	            scroll_element.xdsoftScroller();

	            datetimepicker.on('afterOpen.xdsoft', function () {
	                scroll_element.xdsoftScroller();
	            });

	            datetimepicker
	                .append(datepicker)
	                .append(timepicker);

	            if (options.withoutCopyright !== true) {
	                datetimepicker
	                    .append(xdsoft_copyright);
	            }

	            datepicker
	                .append(mounth_picker)
	                .append(calendar);

	            $(options.parentID)
	                .append(datetimepicker);

	            XDSoft_datetime = function () {
	                var _this = this;
	                _this.now = function (norecursion) {
	                    var d = new Date(),
	                        date,
	                        time;

	                    if (!norecursion && options.defaultDate) {
	                        date = _this.strToDate(options.defaultDate);
	                        d.setFullYear(date.getFullYear());
	                        d.setMonth(date.getMonth());
	                        d.setDate(date.getDate());
	                    }

	                    if (options.yearOffset) {
	                        d.setFullYear(d.getFullYear() + options.yearOffset);
	                    }

	                    if (!norecursion && options.defaultTime) {
	                        time = _this.strtotime(options.defaultTime);
	                        d.setHours(time.getHours());
	                        d.setMinutes(time.getMinutes());
	                    }

	                    return d;
	                };

	                _this.isValidDate = function (d) {
	                    if (Object.prototype.toString.call(d) !== "[object Date]") {
	                        return false;
	                    }
	                    return !isNaN(d.getTime());
	                };

	                _this.setCurrentTime = function (dTime) {
	                    _this.currentTime = (typeof dTime === 'string') ? _this.strToDateTime(dTime) : _this.isValidDate(dTime) ? dTime : _this.now();
	                    datetimepicker.trigger('xchange.xdsoft');
	                };

	                _this.empty = function () {
	                    _this.currentTime = null;
	                };

	                _this.getCurrentTime = function (dTime) {
	                    return _this.currentTime;
	                };

	                _this.nextMonth = function () {
	                    var month = _this.currentTime.getMonth() + 1,
	                        year;
	                    if (month === 12) {
	                        _this.currentTime.setFullYear(_this.currentTime.getFullYear() + 1);
	                        month = 0;
	                    }

	                    year = _this.currentTime.getFullYear();

	                    _this.currentTime.setDate(
	                        Math.min(
	                            new Date(_this.currentTime.getFullYear(), month + 1, 0).getDate(),
	                            _this.currentTime.getDate()
	                        )
	                    );
	                    _this.currentTime.setMonth(month);

	                    if (options.onChangeMonth && $.isFunction(options.onChangeMonth)) {
	                        options.onChangeMonth.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
	                    }

	                    if (year !== _this.currentTime.getFullYear() && $.isFunction(options.onChangeYear)) {
	                        options.onChangeYear.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
	                    }

	                    datetimepicker.trigger('xchange.xdsoft');
	                    return month;
	                };

	                _this.prevMonth = function () {
	                    var month = _this.currentTime.getMonth() - 1;
	                    if (month === -1) {
	                        _this.currentTime.setFullYear(_this.currentTime.getFullYear() - 1);
	                        month = 11;
	                    }
	                    _this.currentTime.setDate(
	                        Math.min(
	                            new Date(_this.currentTime.getFullYear(), month + 1, 0).getDate(),
	                            _this.currentTime.getDate()
	                        )
	                    );
	                    _this.currentTime.setMonth(month);
	                    if (options.onChangeMonth && $.isFunction(options.onChangeMonth)) {
	                        options.onChangeMonth.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
	                    }
	                    datetimepicker.trigger('xchange.xdsoft');
	                    return month;
	                };

	                _this.getWeekOfYear = function (datetime) {
	                    var onejan = new Date(datetime.getFullYear(), 0, 1);
	                    return Math.ceil((((datetime - onejan) / 86400000) + onejan.getDay() + 1) / 7);
	                };

	                _this.strToDateTime = function (sDateTime) {
	                    var tmpDate = [], timeOffset, currentTime;

	                    if (sDateTime && sDateTime instanceof Date && _this.isValidDate(sDateTime)) {
	                        return sDateTime;
	                    }

	                    tmpDate = /^(\+|\-)(.*)$/.exec(sDateTime);
	                    if (tmpDate) {
	                        tmpDate[2] = Date.parseDate(tmpDate[2], options.formatDate);
	                    }
	                    if (tmpDate && tmpDate[2]) {
	                        timeOffset = tmpDate[2].getTime() - (tmpDate[2].getTimezoneOffset()) * 60000;
	                        currentTime = new Date((_xdsoft_datetime.now()).getTime() + parseInt(tmpDate[1] + '1', 10) * timeOffset);
	                    } else {
	                        currentTime = sDateTime ? Date.parseDate(sDateTime, options.format) : _this.now();
	                    }

	                    if (!_this.isValidDate(currentTime)) {
	                        currentTime = _this.now();
	                    }

	                    return currentTime;
	                };

	                _this.strToDate = function (sDate) {
	                    if (sDate && sDate instanceof Date && _this.isValidDate(sDate)) {
	                        return sDate;
	                    }

	                    var currentTime = sDate ? Date.parseDate(sDate, options.formatDate) : _this.now(true);
	                    if (!_this.isValidDate(currentTime)) {
	                        currentTime = _this.now(true);
	                    }
	                    return currentTime;
	                };

	                _this.strtotime = function (sTime) {
	                    if (sTime && sTime instanceof Date && _this.isValidDate(sTime)) {
	                        return sTime;
	                    }
	                    var currentTime = sTime ? Date.parseDate(sTime, options.formatTime) : _this.now(true);
	                    if (!_this.isValidDate(currentTime)) {
	                        currentTime = _this.now(true);
	                    }
	                    return currentTime;
	                };

	                _this.str = function () {
	                    return _this.currentTime.dateFormat(options.format);
	                };
	                _this.currentTime = this.now();
	            };

	            _xdsoft_datetime = new XDSoft_datetime();

	            mounth_picker
	                .find('.xdsoft_today_button')
	                .on('mousedown.xdsoft', function () {
	                    datetimepicker.data('changed', true);
	                    _xdsoft_datetime.setCurrentTime(0);
	                    datetimepicker.trigger('afterOpen.xdsoft');
	                }).on('dblclick.xdsoft', function () {
	                    input.val(_xdsoft_datetime.str());
	                    datetimepicker.trigger('close.xdsoft');
	                });
	            mounth_picker
	                .find('.xdsoft_prev,.xdsoft_next')
	                .on('mousedown.xdsoft', function () {
	                    var $this = $(this),
	                        timer = 0,
	                        stop = false;

	                    (function arguments_callee1(v) {
	                        var month = _xdsoft_datetime.currentTime.getMonth();
	                        if ($this.hasClass(options.next)) {
	                            _xdsoft_datetime.nextMonth();
	                        } else if ($this.hasClass(options.prev)) {
	                            _xdsoft_datetime.prevMonth();
	                        }
	                        if (options.monthChangeSpinner) {
	                            if (!stop) {
	                                timer = setTimeout(arguments_callee1, v || 100);
	                            }
	                        }
	                    }(500));

	                    $([document.body, window]).on('mouseup.xdsoft', function arguments_callee2() {
	                        clearTimeout(timer);
	                        stop = true;
	                        $([document.body, window]).off('mouseup.xdsoft', arguments_callee2);
	                    });
	                });

	            timepicker
	                .find('.xdsoft_prev,.xdsoft_next')
	                .on('mousedown.xdsoft', function () {
	                    var $this = $(this),
	                        timer = 0,
	                        stop = false,
	                        period = 110;
	                    (function arguments_callee4(v) {
	                        var pheight = timeboxparent[0].clientHeight,
	                            height = timebox[0].offsetHeight,
	                            top = Math.abs(parseInt(timebox.css('marginTop'), 10));
	                        if ($this.hasClass(options.next) && (height - pheight) - options.timeHeightInTimePicker >= top) {
	                            timebox.css('marginTop', '-' + (top + options.timeHeightInTimePicker) + 'px');
	                        } else if ($this.hasClass(options.prev) && top - options.timeHeightInTimePicker >= 0) {
	                            timebox.css('marginTop', '-' + (top - options.timeHeightInTimePicker) + 'px');
	                        }
	                        timeboxparent.trigger('scroll_element.xdsoft_scroller', [Math.abs(parseInt(timebox.css('marginTop'), 10) / (height - pheight))]);
	                        period = (period > 10) ? 10 : period - 10;
	                        if (!stop) {
	                            timer = setTimeout(arguments_callee4, v || period);
	                        }
	                    }(500));
	                    $([document.body, window]).on('mouseup.xdsoft', function arguments_callee5() {
	                        clearTimeout(timer);
	                        stop = true;
	                        $([document.body, window])
	                            .off('mouseup.xdsoft', arguments_callee5);
	                    });
	                });

	            xchangeTimer = 0;
	            // base handler - generating a calendar and timepicker
	            datetimepicker
	                .on('xchange.xdsoft', function (event) {
	                    clearTimeout(xchangeTimer);
	                    xchangeTimer = setTimeout(function () {
	                        var table = '',
	                            start = new Date(_xdsoft_datetime.currentTime.getFullYear(), _xdsoft_datetime.currentTime.getMonth(), 1, 12, 0, 0),
	                            i = 0,
	                            j,
	                            today = _xdsoft_datetime.now(),
	                            maxDate = false,
	                            minDate = false,
	                            d,
	                            y,
	                            m,
	                            w,
	                            classes = [],
	                            customDateSettings,
	                            newRow = true,
	                            time = '',
	                            h = '',
	                            line_time;

	                        while (start.getDay() !== options.dayOfWeekStart) {
	                            start.setDate(start.getDate() - 1);
	                        }

	                        table += '<table><thead><tr>';

	                        if (options.weeks) {
	                            table += '<th></th>';
	                        }

	                        for (j = 0; j < 7; j += 1) {
	                            table += '<th>' + options.i18n[options.lang].dayOfWeek[(j + options.dayOfWeekStart) % 7] + '</th>';
	                        }

	                        table += '</tr></thead>';
	                        table += '<tbody>';

	                        if (options.maxDate !== false) {
	                            maxDate = _xdsoft_datetime.strToDate(options.maxDate);
	                            maxDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate(), 23, 59, 59, 999);
	                        }

	                        if (options.minDate !== false) {
	                            minDate = _xdsoft_datetime.strToDate(options.minDate);
	                            minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
	                        }

	                        while (i < _xdsoft_datetime.currentTime.countDaysInMonth() || start.getDay() !== options.dayOfWeekStart || _xdsoft_datetime.currentTime.getMonth() === start.getMonth()) {
	                            classes = [];
	                            i += 1;

	                            d = start.getDate();
	                            y = start.getFullYear();
	                            m = start.getMonth();
	                            w = _xdsoft_datetime.getWeekOfYear(start);

	                            classes.push('xdsoft_date');

	                            if (options.beforeShowDay && $.isFunction(options.beforeShowDay.call)) {
	                                customDateSettings = options.beforeShowDay.call(datetimepicker, start);
	                            } else {
	                                customDateSettings = null;
	                            }

	                            if ((maxDate !== false && start > maxDate) || (minDate !== false && start < minDate) || (customDateSettings && customDateSettings[0] === false)) {
	                                classes.push('xdsoft_disabled');
	                            }

	                            if (customDateSettings && customDateSettings[1] !== "") {
	                                classes.push(customDateSettings[1]);
	                            }

	                            if (_xdsoft_datetime.currentTime.getMonth() !== m) {
	                                classes.push('xdsoft_other_month');
	                            }

	                            if ((options.defaultSelect || datetimepicker.data('changed')) && _xdsoft_datetime.currentTime.dateFormat(options.formatDate) === start.dateFormat(options.formatDate)) {
	                                classes.push('xdsoft_current');
	                            }

	                            if (today.dateFormat(options.formatDate) === start.dateFormat(options.formatDate)) {
	                                classes.push('xdsoft_today');
	                            }

	                            if (start.getDay() === 0 || start.getDay() === 6 || options.weekends.indexOf(start.dateFormat(options.formatDate)) === -1) {
	                                classes.push('xdsoft_weekend');
	                            }

	                            if (options.beforeShowDay && $.isFunction(options.beforeShowDay)) {
	                                classes.push(options.beforeShowDay(start));
	                            }

	                            if (newRow) {
	                                table += '<tr>';
	                                newRow = false;
	                                if (options.weeks) {
	                                    table += '<th>' + w + '</th>';
	                                }
	                            }

	                            table += '<td data-date="' + d + '" data-month="' + m + '" data-year="' + y + '"' + ' class="xdsoft_date xdsoft_day_of_week' + start.getDay() + ' ' + classes.join(' ') + '">' +
	                            '<div>' + d + '</div>' +
	                            '</td>';

	                            if (start.getDay() === options.dayOfWeekStartPrev) {
	                                table += '</tr>';
	                                newRow = true;
	                            }

	                            start.setDate(d + 1);
	                        }
	                        table += '</tbody></table>';

	                        calendar.html(table);

	                        mounth_picker.find('.xdsoft_label span').eq(0).text(options.i18n[options.lang].months[_xdsoft_datetime.currentTime.getMonth()]);
	                        mounth_picker.find('.xdsoft_label span').eq(1).text(_xdsoft_datetime.currentTime.getFullYear());

	                        // generate timebox
	                        time = '';
	                        h = '';
	                        m = '';
	                        line_time = function line_time(h, m) {
	                            var now = _xdsoft_datetime.now();
	                            now.setHours(h);
	                            h = parseInt(now.getHours(), 10);
	                            now.setMinutes(m);
	                            m = parseInt(now.getMinutes(), 10);

	                            classes = [];
	                            if ((options.maxTime !== false && _xdsoft_datetime.strtotime(options.maxTime).getTime() < now.getTime()) || (options.minTime !== false && _xdsoft_datetime.strtotime(options.minTime).getTime() > now.getTime())) {
	                                classes.push('xdsoft_disabled');
	                            }
	                            if ((options.initTime || options.defaultSelect || datetimepicker.data('changed')) && parseInt(_xdsoft_datetime.currentTime.getHours(), 10) === parseInt(h, 10) && (options.step > 59 || Math[options.roundTime](_xdsoft_datetime.currentTime.getMinutes() / options.step) * options.step === parseInt(m, 10))) {
	                                if (options.defaultSelect || datetimepicker.data('changed')) {
	                                    classes.push('xdsoft_current');
	                                } else if (options.initTime) {
	                                    classes.push('xdsoft_init_time');
	                                }
	                            }
	                            if (parseInt(today.getHours(), 10) === parseInt(h, 10) && parseInt(today.getMinutes(), 10) === parseInt(m, 10)) {
	                                classes.push('xdsoft_today');
	                            }
	                            time += '<div class="xdsoft_time ' + classes.join(' ') + '" data-hour="' + h + '" data-minute="' + m + '">' + now.dateFormat(options.formatTime) + '</div>';
	                        };

	                        if (!options.allowTimes || !$.isArray(options.allowTimes) || !options.allowTimes.length) {
	                            for (i = 0, j = 0; i < (options.hours12 ? 12 : 24); i += 1) {
	                                for (j = 0; j < 60; j += options.step) {
	                                    h = (i < 10 ? '0' : '') + i;
	                                    m = (j < 10 ? '0' : '') + j;
	                                    line_time(h, m);
	                                }
	                            }
	                        } else {
	                            for (i = 0; i < options.allowTimes.length; i += 1) {
	                                h = _xdsoft_datetime.strtotime(options.allowTimes[i]).getHours();
	                                m = _xdsoft_datetime.strtotime(options.allowTimes[i]).getMinutes();
	                                line_time(h, m);
	                            }
	                        }

	                        timebox.html(time);

	                        opt = '';
	                        i = 0;

	                        for (i = parseInt(options.yearStart, 10) + options.yearOffset; i <= parseInt(options.yearEnd, 10) + options.yearOffset; i += 1) {
	                            opt += '<div class="xdsoft_option ' + (_xdsoft_datetime.currentTime.getFullYear() === i ? 'xdsoft_current' : '') + '" data-value="' + i + '">' + i + '</div>';
	                        }
	                        yearselect.children().eq(0)
	                            .html(opt);

	                        for (i = 0, opt = ''; i <= 11; i += 1) {
	                            opt += '<div class="xdsoft_option ' + (_xdsoft_datetime.currentTime.getMonth() === i ? 'xdsoft_current' : '') + '" data-value="' + i + '">' + options.i18n[options.lang].months[i] + '</div>';
	                        }
	                        monthselect.children().eq(0).html(opt);
	                        $(datetimepicker)
	                            .trigger('generate.xdsoft');
	                    }, 10);
	                    event.stopPropagation();
	                })
	                .on('afterOpen.xdsoft', function () {
	                    if (options.timepicker) {
	                        var classType, pheight, height, top;
	                        if (timebox.find('.xdsoft_current').length) {
	                            classType = '.xdsoft_current';
	                        } else if (timebox.find('.xdsoft_init_time').length) {
	                            classType = '.xdsoft_init_time';
	                        }
	                        if (classType) {
	                            pheight = timeboxparent[0].clientHeight;
	                            height = timebox[0].offsetHeight;
	                            top = timebox.find(classType).index() * options.timeHeightInTimePicker + 1;
	                            if ((height - pheight) < top) {
	                                top = height - pheight;
	                            }
	                            timeboxparent.trigger('scroll_element.xdsoft_scroller', [parseInt(top, 10) / (height - pheight)]);
	                        } else {
	                            timeboxparent.trigger('scroll_element.xdsoft_scroller', [0]);
	                        }
	                    }
	                });

	            timerclick = 0;
	            calendar
	                .on('click.xdsoft', 'td', function (xdevent) {
	                    xdevent.stopPropagation();  // Prevents closing of Pop-ups, Modals and Flyouts in Bootstrap
	                    timerclick += 1;
	                    var $this = $(this),
	                        currentTime = _xdsoft_datetime.currentTime;

	                    if (currentTime === undefined || currentTime === null) {
	                        _xdsoft_datetime.currentTime = _xdsoft_datetime.now();
	                        currentTime = _xdsoft_datetime.currentTime;
	                    }

	                    if ($this.hasClass('xdsoft_disabled')) {
	                        return false;
	                    }

	                    currentTime.setDate(1);
	                    currentTime.setFullYear($this.data('year'));
	                    currentTime.setMonth($this.data('month'));
	                    currentTime.setDate($this.data('date'));

	                    datetimepicker.trigger('select.xdsoft', [currentTime]);

	                    input.val(_xdsoft_datetime.str());
	                    if ((timerclick > 1 || (options.closeOnDateSelect === true || (options.closeOnDateSelect === 0 && !options.timepicker))) && !options.inline) {
	                        datetimepicker.trigger('close.xdsoft');
	                    }

	                    if (options.onSelectDate && $.isFunction(options.onSelectDate)) {
	                        options.onSelectDate.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
	                    }

	                    datetimepicker.data('changed', true);
	                    datetimepicker.trigger('xchange.xdsoft');
	                    datetimepicker.trigger('changedatetime.xdsoft');
	                    setTimeout(function () {
	                        timerclick = 0;
	                    }, 200);
	                });

	            timebox
	                .on('click.xdsoft', 'div', function (xdevent) {
	                    xdevent.stopPropagation();
	                    var $this = $(this),
	                        currentTime = _xdsoft_datetime.currentTime;

	                    if (currentTime === undefined || currentTime === null) {
	                        _xdsoft_datetime.currentTime = _xdsoft_datetime.now();
	                        currentTime = _xdsoft_datetime.currentTime;
	                    }

	                    if ($this.hasClass('xdsoft_disabled')) {
	                        return false;
	                    }
	                    currentTime.setHours($this.data('hour'));
	                    currentTime.setMinutes($this.data('minute'));
	                    datetimepicker.trigger('select.xdsoft', [currentTime]);

	                    datetimepicker.data('input').val(_xdsoft_datetime.str());
	                    if (!options.inline) {
	                        datetimepicker.trigger('close.xdsoft');
	                    }

	                    if (options.onSelectTime && $.isFunction(options.onSelectTime)) {
	                        options.onSelectTime.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
	                    }
	                    datetimepicker.data('changed', true);
	                    datetimepicker.trigger('xchange.xdsoft');
	                    datetimepicker.trigger('changedatetime.xdsoft');
	                });

	            if (datetimepicker.mousewheel) {
	                datepicker.mousewheel(function (event, delta, deltaX, deltaY) {
	                    if (!options.scrollMonth) {
	                        return true;
	                    }
	                    if (delta < 0) {
	                        _xdsoft_datetime.nextMonth();
	                    } else {
	                        _xdsoft_datetime.prevMonth();
	                    }
	                    return false;
	                });

	                timeboxparent.unmousewheel().mousewheel(function (event, delta, deltaX, deltaY) {
	                    if (!options.scrollTime) {
	                        return true;
	                    }
	                    var pheight = timeboxparent[0].clientHeight,
	                        height = timebox[0].offsetHeight,
	                        top = Math.abs(parseInt(timebox.css('marginTop'), 10)),
	                        fl = true;
	                    if (delta < 0 && (height - pheight) - options.timeHeightInTimePicker >= top) {
	                        timebox.css('marginTop', '-' + (top + options.timeHeightInTimePicker) + 'px');
	                        fl = false;
	                    } else if (delta > 0 && top - options.timeHeightInTimePicker >= 0) {
	                        timebox.css('marginTop', '-' + (top - options.timeHeightInTimePicker) + 'px');
	                        fl = false;
	                    }
	                    timeboxparent.trigger('scroll_element.xdsoft_scroller', [Math.abs(parseInt(timebox.css('marginTop'), 10) / (height - pheight))]);
	                    event.stopPropagation();
	                    return fl;
	                });

	                input.mousewheel(function (event, delta, deltaX, deltaY) {
	                    if (!options.scrollInput) {
	                        return true;
	                    }
	                    if (!options.datepicker && options.timepicker) {
	                        current_time_index = timebox.find('.xdsoft_current').length ? timebox.find('.xdsoft_current').eq(0).index() : 0;
	                        if (current_time_index + delta >= 0 && current_time_index + delta < timebox.children().length) {
	                            current_time_index += delta;
	                        }
	                        if (timebox.children().eq(current_time_index).length) {
	                            timebox.children().eq(current_time_index).trigger('mousedown');
	                        }
	                        return false;
	                    }
	                    if (options.datepicker && !options.timepicker) {
	                        datepicker.trigger(event, [delta, deltaX, deltaY]);
	                        if (input.val) {
	                            input.val(_xdsoft_datetime.str());
	                        }
	                        datetimepicker.trigger('changedatetime.xdsoft');
	                        return false;
	                    }
	                });
	            }

	            datetimepicker
	                .on('changedatetime.xdsoft', function () {
	                    if (options.onChangeDateTime && $.isFunction(options.onChangeDateTime)) {
	                        var $input = datetimepicker.data('input');
	                        options.onChangeDateTime.call(datetimepicker, _xdsoft_datetime.currentTime, $input);
	                        delete options.value;
	                        $input.trigger('change');
	                    }
	                })
	                .on('generate.xdsoft', function () {
	                    if (options.onGenerate && $.isFunction(options.onGenerate)) {
	                        options.onGenerate.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
	                    }
	                    if (triggerAfterOpen) {
	                        datetimepicker.trigger('afterOpen.xdsoft');
	                        triggerAfterOpen = false;
	                    }
	                })
	                .on('click.xdsoft', function (xdevent) {
	                    xdevent.stopPropagation();
	                });

	            current_time_index = 0;

	            setPos = function () {
	                var offset = datetimepicker.data('input').offset(), top = offset.top + datetimepicker.data('input')[0].offsetHeight - 1, left = offset.left, position = "absolute";
	                if (options.fixed) {
	                    top -= $(window).scrollTop();
	                    left -= $(window).scrollLeft();
	                    position = "fixed";
	                } else {
	                    if (top + datetimepicker[0].offsetHeight > $(window).height() + $(window).scrollTop()) {
	                        top = offset.top - datetimepicker[0].offsetHeight + 1;
	                    }
	                    if (top < 0) {
	                        top = 0;
	                    }
	                    if (left + datetimepicker[0].offsetWidth > $(window).width()) {
	                        left = $(window).width() - datetimepicker[0].offsetWidth;
	                    }
	                }
	                datetimepicker.css({
	                    left: left,
	                    top: top,
	                    position: position
	                });
	            };
	            datetimepicker
	                .on('open.xdsoft', function () {
	                    var onShow = true;
	                    if (options.onShow && $.isFunction(options.onShow)) {
	                        onShow = options.onShow.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
	                    }
	                    if (onShow !== false) {
	                        datetimepicker.show();
	                        setPos();
	                        $(window)
	                            .off('resize.xdsoft', setPos)
	                            .on('resize.xdsoft', setPos);

	                        if (options.closeOnWithoutClick) {
	                            $([document.body, window]).on('mousedown.xdsoft', function arguments_callee6() {
	                                datetimepicker.trigger('close.xdsoft');
	                                $([document.body, window]).off('mousedown.xdsoft', arguments_callee6);
	                            });
	                        }
	                    }
	                })
	                .on('close.xdsoft', function (event) {
	                    var onClose = true;
	                    mounth_picker
	                        .find('.xdsoft_month,.xdsoft_year')
	                        .find('.xdsoft_select')
	                        .hide();
	                    if (options.onClose && $.isFunction(options.onClose)) {
	                        onClose = options.onClose.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
	                    }
	                    if (onClose !== false && !options.opened && !options.inline) {
	                        datetimepicker.hide();
	                    }
	                    event.stopPropagation();
	                })
	                .data('input', input);

	            timer = 0;
	            timer1 = 0;

	            datetimepicker.data('xdsoft_datetime', _xdsoft_datetime);
	            datetimepicker.setOptions(options);

	            function getCurrentValue() {

	                var ct = false, time;

	                if (options.startDate) {
	                    ct = _xdsoft_datetime.strToDate(options.startDate);
	                } else {
	                    ct = options.value || ((input && input.val && input.val()) ? input.val() : '');
	                    if (ct) {
	                        ct = _xdsoft_datetime.strToDateTime(ct);
	                    } else if (options.defaultDate) {
	                        ct = _xdsoft_datetime.strToDate(options.defaultDate);
	                        if (options.defaultTime) {
	                            time = _xdsoft_datetime.strtotime(options.defaultTime);
	                            ct.setHours(time.getHours());
	                            ct.setMinutes(time.getMinutes());
	                        }
	                    }
	                }

	                if (ct && _xdsoft_datetime.isValidDate(ct)) {
	                    datetimepicker.data('changed', true);
	                } else {
	                    ct = '';
	                }

	                return ct || 0;
	            }

	            _xdsoft_datetime.setCurrentTime(getCurrentValue());

	            input
	                .data('xdsoft_datetimepicker', datetimepicker)
	                .on('open.xdsoft focusin.xdsoft mousedown.xdsoft', function (event) {
	                    if (input.is(':disabled') || input.is(':hidden') || !input.is(':visible') || (input.data('xdsoft_datetimepicker').is(':visible') && options.closeOnInputClick)) {
	                        return;
	                    }
	                    clearTimeout(timer);
	                    timer = setTimeout(function () {
	                        if (input.is(':disabled') || input.is(':hidden') || !input.is(':visible')) {
	                            return;
	                        }

	                        triggerAfterOpen = true;
	                        _xdsoft_datetime.setCurrentTime(getCurrentValue());

	                        datetimepicker.trigger('open.xdsoft');
	                    }, 100);
	                })
	                .on('keydown.xdsoft', function (event) {
	                    var val = this.value, elementSelector,
	                        key = event.which;
	                    if ([ENTER].indexOf(key) !== -1) {
	                        elementSelector = $("input:visible,textarea:visible");
	                        datetimepicker.trigger('close.xdsoft');
	                        elementSelector.eq(elementSelector.index(this) + 1).focus();
	                        return false;
	                    }
	                    if ([TAB].indexOf(key) !== -1) {
	                        datetimepicker.trigger('close.xdsoft');
	                        return true;
	                    }
	                });
	        };
	        destroyDateTimePicker = function (input) {
	            var datetimepicker = input.data('xdsoft_datetimepicker');
	            if (datetimepicker) {
	                datetimepicker.data('xdsoft_datetime', null);
	                datetimepicker.remove();
	                input
	                    .data('xdsoft_datetimepicker', null)
	                    .off('.xdsoft');
	                $(window).off('resize.xdsoft');
	                $([window, document.body]).off('mousedown.xdsoft');
	                if (input.unmousewheel) {
	                    input.unmousewheel();
	                }
	            }
	        };
	        $(document)
	            .off('keydown.xdsoftctrl keyup.xdsoftctrl')
	            .on('keydown.xdsoftctrl', function (e) {
	                if (e.keyCode === CTRLKEY) {
	                    ctrlDown = true;
	                }
	            })
	            .on('keyup.xdsoftctrl', function (e) {
	                if (e.keyCode === CTRLKEY) {
	                    ctrlDown = false;
	                }
	            });
	        return this.each(function () {
	            var datetimepicker = $(this).data('xdsoft_datetimepicker');
	            if (datetimepicker) {
	                if ($.type(opt) === 'string') {
	                    switch (opt) {
	                        case 'show':
	                            $(this).select().focus();
	                            datetimepicker.trigger('open.xdsoft');
	                            break;
	                        case 'hide':
	                            datetimepicker.trigger('close.xdsoft');
	                            break;
	                        case 'destroy':
	                            destroyDateTimePicker($(this));
	                            break;
	                        case 'reset':
	                            this.value = this.defaultValue;
	                            if (!this.value || !datetimepicker.data('xdsoft_datetime').isValidDate(Date.parseDate(this.value, options.format))) {
	                                datetimepicker.data('changed', false);
	                            }
	                            datetimepicker.data('xdsoft_datetime').setCurrentTime(this.value);
	                            break;
	                    }
	                } else {
	                    datetimepicker
	                        .setOptions(opt);
	                }
	                return 0;
	            }
	            if ($.type(opt) !== 'string') {
	                if (!options.lazyInit || options.open || options.inline) {
	                    createDateTimePicker($(this));
	                } else {
	                    lazyInit($(this));
	                }
	            }
	        });
	    };
	    $.fn.datetimepicker.defaults = default_options;
	}));
	(function () {
	    /* jshint ignore:start */
	    /*
	     * Copyright (c) 2013 Brandon Aaron (http://brandonaaron.net)
	     *
	     * Licensed under the MIT License (LICENSE.txt).
	     *
	     * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
	     * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
	     * Thanks to: Seamus Leahy for adding deltaX and deltaY
	     *
	     * Version: 3.1.3
	     *
	     * Requires: 1.2.2+
	     */
	    (function (factory) {
	        if (true) {
	            !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(183)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	        } else if (typeof exports === 'object') {
	            module.exports = factory
	        } else {
	            factory(jQuery)
	        }
	    }(function ($) {
	        var toFix = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'];
	        var toBind = 'onwheel'in document || document.documentMode >= 9 ? ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'];
	        var lowestDelta, lowestDeltaXY;
	        if ($.event.fixHooks) {
	            for (var i = toFix.length; i;) {
	                $.event.fixHooks[toFix[--i]] = $.event.mouseHooks
	            }
	        }
	        $.event.special.mousewheel = {
	            setup: function () {
	                if (this.addEventListener) {
	                    for (var i = toBind.length; i;) {
	                        this.addEventListener(toBind[--i], handler, false)
	                    }
	                } else {
	                    this.onmousewheel = handler
	                }
	            }, teardown: function () {
	                if (this.removeEventListener) {
	                    for (var i = toBind.length; i;) {
	                        this.removeEventListener(toBind[--i], handler, false)
	                    }
	                } else {
	                    this.onmousewheel = null
	                }
	            }
	        };
	        $.fn.extend({
	            mousewheel: function (fn) {
	                return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel")
	            }, unmousewheel: function (fn) {
	                return this.unbind("mousewheel", fn)
	            }
	        });
	        function handler(event) {
	            var orgEvent = event || window.event, args = [].slice.call(arguments, 1), delta = 0, deltaX = 0, deltaY = 0, absDelta = 0, absDeltaXY = 0, fn;
	            event = $.event.fix(orgEvent);
	            event.type = "mousewheel";
	            if (orgEvent.wheelDelta) {
	                delta = orgEvent.wheelDelta
	            }
	            if (orgEvent.detail) {
	                delta = orgEvent.detail * -1
	            }
	            if (orgEvent.deltaY) {
	                deltaY = orgEvent.deltaY * -1;
	                delta = deltaY
	            }
	            if (orgEvent.deltaX) {
	                deltaX = orgEvent.deltaX;
	                delta = deltaX * -1
	            }
	            if (orgEvent.wheelDeltaY !== undefined) {
	                deltaY = orgEvent.wheelDeltaY
	            }
	            if (orgEvent.wheelDeltaX !== undefined) {
	                deltaX = orgEvent.wheelDeltaX * -1
	            }
	            absDelta = Math.abs(delta);
	            if (!lowestDelta || absDelta < lowestDelta) {
	                lowestDelta = absDelta
	            }
	            absDeltaXY = Math.max(Math.abs(deltaY), Math.abs(deltaX));
	            if (!lowestDeltaXY || absDeltaXY < lowestDeltaXY) {
	                lowestDeltaXY = absDeltaXY
	            }
	            fn = delta > 0 ? 'floor' : 'ceil';
	            delta = Math[fn](delta / lowestDelta);
	            deltaX = Math[fn](deltaX / lowestDeltaXY);
	            deltaY = Math[fn](deltaY / lowestDeltaXY);
	            args.unshift(event, delta, deltaX, deltaY);
	            return ($.event.dispatch || $.event.handle).apply(this, args)
	        }
	    }));


	// Parse and Format Library
	//http://www.xaprb.com/blog/2005/12/12/javascript-closures-for-runtime-efficiency/
	    /*
	     * Copyright (C) 2004 Baron Schwartz <baron at sequent dot org>
	     *
	     * This program is free software; you can redistribute it and/or modify it
	     * under the terms of the GNU Lesser General Public License as published by the
	     * Free Software Foundation, version 2.1.
	     *
	     * This program is distributed in the hope that it will be useful, but WITHOUT
	     * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
	     * FOR A PARTICULAR PURPOSE.  See the GNU Lesser General Public License for more
	     * details.
	     */
	    Date.parseFunctions = {count: 0};
	    Date.parseRegexes = [];
	    Date.formatFunctions = {count: 0};
	    Date.prototype.dateFormat = function (b) {
	        if (b == "unixtime") {
	            return parseInt(this.getTime() / 1000);
	        }
	        if (Date.formatFunctions[b] == null) {
	            Date.createNewFormat(b);
	        }
	        var a = Date.formatFunctions[b];
	        return this[a]();
	    };
	    Date.createNewFormat = function (format) {
	        var funcName = "format" + Date.formatFunctions.count++;
	        Date.formatFunctions[format] = funcName;
	        var code = "Date.prototype." + funcName + " = function() {return ";
	        var special = false;
	        var ch = "";
	        for (var i = 0; i < format.length; ++i) {
	            ch = format.charAt(i);
	            if (!special && ch == "\\") {
	                special = true;
	            } else {
	                if (special) {
	                    special = false;
	                    code += "'" + String.escape(ch) + "' + ";
	                } else {
	                    code += Date.getFormatCode(ch);
	                }
	            }
	        }
	        eval(code.substring(0, code.length - 3) + ";}");
	    };
	    Date.getFormatCode = function (a) {
	        switch (a) {
	            case"d":
	                return "String.leftPad(this.getDate(), 2, '0') + ";
	            case"D":
	                return "Date.dayNames[this.getDay()].substring(0, 3) + ";
	            case"j":
	                return "this.getDate() + ";
	            case"l":
	                return "Date.dayNames[this.getDay()] + ";
	            case"S":
	                return "this.getSuffix() + ";
	            case"w":
	                return "this.getDay() + ";
	            case"z":
	                return "this.getDayOfYear() + ";
	            case"W":
	                return "this.getWeekOfYear() + ";
	            case"F":
	                return "Date.monthNames[this.getMonth()] + ";
	            case"m":
	                return "String.leftPad(this.getMonth() + 1, 2, '0') + ";
	            case"M":
	                return "Date.monthNames[this.getMonth()].substring(0, 3) + ";
	            case"n":
	                return "(this.getMonth() + 1) + ";
	            case"t":
	                return "this.getDaysInMonth() + ";
	            case"L":
	                return "(this.isLeapYear() ? 1 : 0) + ";
	            case"Y":
	                return "this.getFullYear() + ";
	            case"y":
	                return "('' + this.getFullYear()).substring(2, 4) + ";
	            case"a":
	                return "(this.getHours() < 12 ? 'am' : 'pm') + ";
	            case"A":
	                return "(this.getHours() < 12 ? 'AM' : 'PM') + ";
	            case"g":
	                return "((this.getHours() %12) ? this.getHours() % 12 : 12) + ";
	            case"G":
	                return "this.getHours() + ";
	            case"h":
	                return "String.leftPad((this.getHours() %12) ? this.getHours() % 12 : 12, 2, '0') + ";
	            case"H":
	                return "String.leftPad(this.getHours(), 2, '0') + ";
	            case"i":
	                return "String.leftPad(this.getMinutes(), 2, '0') + ";
	            case"s":
	                return "String.leftPad(this.getSeconds(), 2, '0') + ";
	            case"O":
	                return "this.getGMTOffset() + ";
	            case"T":
	                return "this.getTimezone() + ";
	            case"Z":
	                return "(this.getTimezoneOffset() * -60) + ";
	            default:
	                return "'" + String.escape(a) + "' + ";
	        }
	    };
	    Date.parseDate = function (a, c) {
	        if (c == "unixtime") {
	            return new Date(!isNaN(parseInt(a)) ? parseInt(a) * 1000 : 0);
	        }
	        if (Date.parseFunctions[c] == null) {
	            Date.createParser(c);
	        }
	        var b = Date.parseFunctions[c];
	        return Date[b](a);
	    };
	    Date.createParser = function (format) {
	        var funcName = "parse" + Date.parseFunctions.count++;
	        var regexNum = Date.parseRegexes.length;
	        var currentGroup = 1;
	        Date.parseFunctions[format] = funcName;
	        var code = "Date." + funcName + " = function(input) {\nvar y = -1, m = -1, d = -1, h = -1, i = -1, s = -1, z = -1;\nvar d = new Date();\ny = d.getFullYear();\nm = d.getMonth();\nd = d.getDate();\nvar results = input.match(Date.parseRegexes[" + regexNum + "]);\nif (results && results.length > 0) {";
	        var regex = "";
	        var special = false;
	        var ch = "";
	        for (var i = 0; i < format.length; ++i) {
	            ch = format.charAt(i);
	            if (!special && ch == "\\") {
	                special = true;
	            } else {
	                if (special) {
	                    special = false;
	                    regex += String.escape(ch);
	                } else {
	                    obj = Date.formatCodeToRegex(ch, currentGroup);
	                    currentGroup += obj.g;
	                    regex += obj.s;
	                    if (obj.g && obj.c) {
	                        code += obj.c;
	                    }
	                }
	            }
	        }
	        code += "if (y > 0 && z > 0){\nvar doyDate = new Date(y,0);\ndoyDate.setDate(z);\nm = doyDate.getMonth();\nd = doyDate.getDate();\n}";
	        code += "if (y > 0 && m >= 0 && d > 0 && h >= 0 && i >= 0 && s >= 0)\n{return new Date(y, m, d, h, i, s);}\nelse if (y > 0 && m >= 0 && d > 0 && h >= 0 && i >= 0)\n{return new Date(y, m, d, h, i);}\nelse if (y > 0 && m >= 0 && d > 0 && h >= 0)\n{return new Date(y, m, d, h);}\nelse if (y > 0 && m >= 0 && d > 0)\n{return new Date(y, m, d);}\nelse if (y > 0 && m >= 0)\n{return new Date(y, m);}\nelse if (y > 0)\n{return new Date(y);}\n}return null;}";
	        Date.parseRegexes[regexNum] = new RegExp("^" + regex + "$");
	        eval(code);
	    };
	    Date.formatCodeToRegex = function (b, a) {
	        switch (b) {
	            case"D":
	                return {g: 0, c: null, s: "(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)"};
	            case"j":
	            case"d":
	                return {g: 1, c: "d = parseInt(results[" + a + "], 10);\n", s: "(\\d{1,2})"};
	            case"l":
	                return {g: 0, c: null, s: "(?:" + Date.dayNames.join("|") + ")"};
	            case"S":
	                return {g: 0, c: null, s: "(?:st|nd|rd|th)"};
	            case"w":
	                return {g: 0, c: null, s: "\\d"};
	            case"z":
	                return {g: 1, c: "z = parseInt(results[" + a + "], 10);\n", s: "(\\d{1,3})"};
	            case"W":
	                return {g: 0, c: null, s: "(?:\\d{2})"};
	            case"F":
	                return {
	                    g: 1,
	                    c: "m = parseInt(Date.monthNumbers[results[" + a + "].substring(0, 3)], 10);\n",
	                    s: "(" + Date.monthNames.join("|") + ")"
	                };
	            case"M":
	                return {
	                    g: 1,
	                    c: "m = parseInt(Date.monthNumbers[results[" + a + "]], 10);\n",
	                    s: "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)"
	                };
	            case"n":
	            case"m":
	                return {g: 1, c: "m = parseInt(results[" + a + "], 10) - 1;\n", s: "(\\d{1,2})"};
	            case"t":
	                return {g: 0, c: null, s: "\\d{1,2}"};
	            case"L":
	                return {g: 0, c: null, s: "(?:1|0)"};
	            case"Y":
	                return {g: 1, c: "y = parseInt(results[" + a + "], 10);\n", s: "(\\d{4})"};
	            case"y":
	                return {
	                    g: 1,
	                    c: "var ty = parseInt(results[" + a + "], 10);\ny = ty > Date.y2kYear ? 1900 + ty : 2000 + ty;\n",
	                    s: "(\\d{1,2})"
	                };
	            case"a":
	                return {
	                    g: 1,
	                    c: "if (results[" + a + "] == 'am') {\nif (h == 12) { h = 0; }\n} else { if (h < 12) { h += 12; }}",
	                    s: "(am|pm)"
	                };
	            case"A":
	                return {
	                    g: 1,
	                    c: "if (results[" + a + "] == 'AM') {\nif (h == 12) { h = 0; }\n} else { if (h < 12) { h += 12; }}",
	                    s: "(AM|PM)"
	                };
	            case"g":
	            case"G":
	            case"h":
	            case"H":
	                return {g: 1, c: "h = parseInt(results[" + a + "], 10);\n", s: "(\\d{1,2})"};
	            case"i":
	                return {g: 1, c: "i = parseInt(results[" + a + "], 10);\n", s: "(\\d{2})"};
	            case"s":
	                return {g: 1, c: "s = parseInt(results[" + a + "], 10);\n", s: "(\\d{2})"};
	            case"O":
	                return {g: 0, c: null, s: "[+-]\\d{4}"};
	            case"T":
	                return {g: 0, c: null, s: "[A-Z]{3}"};
	            case"Z":
	                return {g: 0, c: null, s: "[+-]\\d{1,5}"};
	            default:
	                return {g: 0, c: null, s: String.escape(b)};
	        }
	    };
	    Date.prototype.getTimezone = function () {
	        return this.toString().replace(/^.*? ([A-Z]{3}) [0-9]{4}.*$/, "$1").replace(/^.*?\(([A-Z])[a-z]+ ([A-Z])[a-z]+ ([A-Z])[a-z]+\)$/, "$1$2$3");
	    };
	    Date.prototype.getGMTOffset = function () {
	        return (this.getTimezoneOffset() > 0 ? "-" : "+") + String.leftPad(Math.floor(Math.abs(this.getTimezoneOffset()) / 60), 2, "0") + String.leftPad(Math.abs(this.getTimezoneOffset()) % 60, 2, "0");
	    };
	    Date.prototype.getDayOfYear = function () {
	        var a = 0;
	        Date.daysInMonth[1] = this.isLeapYear() ? 29 : 28;
	        for (var b = 0; b < this.getMonth(); ++b) {
	            a += Date.daysInMonth[b];
	        }
	        return a + this.getDate();
	    };
	    Date.prototype.getWeekOfYear = function () {
	        var b = this.getDayOfYear() + (4 - this.getDay());
	        var a = new Date(this.getFullYear(), 0, 1);
	        var c = (7 - a.getDay() + 4);
	        return String.leftPad(Math.ceil((b - c) / 7) + 1, 2, "0");
	    };
	    Date.prototype.isLeapYear = function () {
	        var a = this.getFullYear();
	        return ((a & 3) == 0 && (a % 100 || (a % 400 == 0 && a)));
	    };
	    Date.prototype.getFirstDayOfMonth = function () {
	        var a = (this.getDay() - (this.getDate() - 1)) % 7;
	        return (a < 0) ? (a + 7) : a;
	    };
	    Date.prototype.getLastDayOfMonth = function () {
	        var a = (this.getDay() + (Date.daysInMonth[this.getMonth()] - this.getDate())) % 7;
	        return (a < 0) ? (a + 7) : a;
	    };
	    Date.prototype.getDaysInMonth = function () {
	        Date.daysInMonth[1] = this.isLeapYear() ? 29 : 28;
	        return Date.daysInMonth[this.getMonth()];
	    };
	    Date.prototype.getSuffix = function () {
	        switch (this.getDate()) {
	            case 1:
	            case 21:
	            case 31:
	                return "st";
	            case 2:
	            case 22:
	                return "nd";
	            case 3:
	            case 23:
	                return "rd";
	            default:
	                return "th";
	        }
	    };
	    String.escape = function (a) {
	        return a.replace(/('|\\)/g, "\\$1");
	    };
	    String.leftPad = function (d, b, c) {
	        var a = new String(d);
	        if (c == null) {
	            c = " ";
	        }
	        while (a.length < b) {
	            a = c + a;
	        }
	        return a;
	    };
	    Date.daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	    Date.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	    Date.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	    Date.y2kYear = 50;
	    Date.monthNumbers = {
	        Jan: 0,
	        Feb: 1,
	        Mar: 2,
	        Apr: 3,
	        May: 4,
	        Jun: 5,
	        Jul: 6,
	        Aug: 7,
	        Sep: 8,
	        Oct: 9,
	        Nov: 10,
	        Dec: 11
	    };
	    Date.patterns = {
	        ISO8601LongPattern: "Y-m-d H:i:s",
	        ISO8601ShortPattern: "Y-m-d",
	        ShortDatePattern: "n/j/Y",
	        LongDatePattern: "l, F d, Y",
	        FullDateTimePattern: "l, F d, Y g:i:s A",
	        MonthDayPattern: "F d",
	        ShortTimePattern: "g:i A",
	        LongTimePattern: "g:i:s A",
	        SortableDateTimePattern: "Y-m-d\\TH:i:s",
	        UniversalSortableDateTimePattern: "Y-m-d H:i:sO",
	        YearMonthPattern: "F, Y"
	    };
	    /* jshint ignore:end */
	}())


/***/ },

/***/ 207:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(3);
	var OverlayMixin = __webpack_require__(208);
	var domUtils = __webpack_require__(210);
	var cloneWithProps = __webpack_require__(161);

	var createChainedFunction = __webpack_require__(211);
	var assign = __webpack_require__(162);

	/**
	 * Check if value one is inside or equal to the of value
	 *
	 * @param {string} one
	 * @param {string|array} of
	 * @returns {boolean}
	 */
	function isOneOf(one, of) {
	  if (Array.isArray(of)) {
	    return of.indexOf(one) >= 0;
	  }
	  return one === of;
	}

	var OverlayTrigger = React.createClass({displayName: "OverlayTrigger",
	  mixins: [OverlayMixin],

	  propTypes: {
	    trigger: React.PropTypes.oneOfType([
	      React.PropTypes.oneOf(['manual', 'click', 'hover', 'focus']),
	      React.PropTypes.arrayOf(React.PropTypes.oneOf(['click', 'hover', 'focus']))
	    ]),
	    placement: React.PropTypes.oneOf(['top','right', 'bottom', 'left']),
	    delay: React.PropTypes.number,
	    delayShow: React.PropTypes.number,
	    delayHide: React.PropTypes.number,
	    defaultOverlayShown: React.PropTypes.bool,
	    overlay: React.PropTypes.node.isRequired
	  },

	  getDefaultProps: function () {
	    return {
	      placement: 'right',
	      trigger: ['hover', 'focus']
	    };
	  },

	  getInitialState: function () {
	    return {
	      isOverlayShown: this.props.defaultOverlayShown == null ?
	        false : this.props.defaultOverlayShown,
	      overlayLeft: null,
	      overlayTop: null
	    };
	  },

	  show: function () {
	    this.setState({
	      isOverlayShown: true
	    }, function() {
	      this.updateOverlayPosition();
	    });
	  },

	  hide: function () {
	    this.setState({
	      isOverlayShown: false
	    });
	  },

	  toggle: function () {
	    this.state.isOverlayShown ?
	      this.hide() : this.show();
	  },

	  renderOverlay: function () {
	    if (!this.state.isOverlayShown) {
	      return React.createElement("span", null);
	    }

	    return cloneWithProps(
	      this.props.overlay,
	      {
	        onRequestHide: this.hide,
	        placement: this.props.placement,
	        positionLeft: this.state.overlayLeft,
	        positionTop: this.state.overlayTop
	      }
	    );
	  },

	  render: function () {
	    if (this.props.trigger === 'manual') {
	      return React.Children.only(this.props.children);
	    }

	    var props = {};

	    if (isOneOf('click', this.props.trigger)) {
	      props.onClick = createChainedFunction(this.toggle, this.props.onClick);
	    }

	    if (isOneOf('hover', this.props.trigger)) {
	      props.onMouseOver = createChainedFunction(this.handleDelayedShow, this.props.onMouseOver);
	      props.onMouseOut = createChainedFunction(this.handleDelayedHide, this.props.onMouseOut);
	    }

	    if (isOneOf('focus', this.props.trigger)) {
	      props.onFocus = createChainedFunction(this.handleDelayedShow, this.props.onFocus);
	      props.onBlur = createChainedFunction(this.handleDelayedHide, this.props.onBlur);
	    }

	    return cloneWithProps(
	      React.Children.only(this.props.children),
	      props
	    );
	  },

	  componentWillUnmount: function() {
	    clearTimeout(this._hoverDelay);
	  },

	  componentDidMount: function() {
	    this.updateOverlayPosition();
	  },

	  handleDelayedShow: function () {
	    if (this._hoverDelay != null) {
	      clearTimeout(this._hoverDelay);
	      this._hoverDelay = null;
	      return;
	    }

	    var delay = this.props.delayShow != null ?
	      this.props.delayShow : this.props.delay;

	    if (!delay) {
	      this.show();
	      return;
	    }

	    this._hoverDelay = setTimeout(function() {
	      this._hoverDelay = null;
	      this.show();
	    }.bind(this), delay);
	  },

	  handleDelayedHide: function () {
	    if (this._hoverDelay != null) {
	      clearTimeout(this._hoverDelay);
	      this._hoverDelay = null;
	      return;
	    }

	    var delay = this.props.delayHide != null ?
	      this.props.delayHide : this.props.delay;

	    if (!delay) {
	      this.hide();
	      return;
	    }

	    this._hoverDelay = setTimeout(function() {
	      this._hoverDelay = null;
	      this.hide();
	    }.bind(this), delay);
	  },

	  updateOverlayPosition: function () {
	    if (!this.isMounted()) {
	      return;
	    }

	    var pos = this.calcOverlayPosition();

	    this.setState({
	      overlayLeft: pos.left,
	      overlayTop: pos.top
	    });
	  },

	  calcOverlayPosition: function () {
	    var childOffset = this.getPosition();

	    var overlayNode = this.getOverlayDOMNode();
	    var overlayHeight = overlayNode.offsetHeight;
	    var overlayWidth = overlayNode.offsetWidth;

	    switch (this.props.placement) {
	      case 'right':
	        return {
	          top: childOffset.top + childOffset.height / 2 - overlayHeight / 2,
	          left: childOffset.left + childOffset.width
	        };
	      case 'left':
	        return {
	          top: childOffset.top + childOffset.height / 2 - overlayHeight / 2,
	          left: childOffset.left - overlayWidth
	        };
	      case 'top':
	        return {
	          top: childOffset.top - overlayHeight,
	          left: childOffset.left + childOffset.width / 2 - overlayWidth / 2
	        };
	      case 'bottom':
	        return {
	          top: childOffset.top + childOffset.height,
	          left: childOffset.left + childOffset.width / 2 - overlayWidth / 2
	        };
	      default:
	        throw new Error('calcOverlayPosition(): No such placement of "' + this.props.placement + '" found.');
	    }
	  },

	  getPosition: function () {
	    var node = this.getDOMNode();
	    var container = this.getContainerDOMNode();

	    var offset = container.tagName == 'BODY' ?
	      domUtils.getOffset(node) : domUtils.getPosition(node, container);

	    return assign({}, offset, {
	      height: node.offsetHeight,
	      width: node.offsetWidth
	    });
	  }
	});

	module.exports = OverlayTrigger;

/***/ },

/***/ 208:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(3);
	var CustomPropTypes = __webpack_require__(209);

	module.exports = {
	  propTypes: {
	    container: CustomPropTypes.mountable
	  },

	  getDefaultProps: function () {
	    return {
	      container: {
	        // Provide `getDOMNode` fn mocking a React component API. The `document.body`
	        // reference needs to be contained within this function so that it is not accessed
	        // in environments where it would not be defined, e.g. nodejs. Equally this is needed
	        // before the body is defined where `document.body === null`, this ensures
	        // `document.body` is only accessed after componentDidMount.
	        getDOMNode: function getDOMNode() {
	          return document.body;
	        }
	      }
	    };
	  },

	  componentWillUnmount: function () {
	    this._unrenderOverlay();
	    if (this._overlayTarget) {
	      this.getContainerDOMNode()
	        .removeChild(this._overlayTarget);
	      this._overlayTarget = null;
	    }
	  },

	  componentDidUpdate: function () {
	    this._renderOverlay();
	  },

	  componentDidMount: function () {
	    this._renderOverlay();
	  },

	  _mountOverlayTarget: function () {
	    this._overlayTarget = document.createElement('div');
	    this.getContainerDOMNode()
	      .appendChild(this._overlayTarget);
	  },

	  _renderOverlay: function () {
	    if (!this._overlayTarget) {
	      this._mountOverlayTarget();
	    }

	    var overlay = this.renderOverlay();

	    // Save reference to help testing
	    if (overlay !== null) {
	      this._overlayInstance = React.render(overlay, this._overlayTarget);
	    } else {
	      // Unrender if the component is null for transitions to null
	      this._unrenderOverlay();
	    }
	  },

	  _unrenderOverlay: function () {
	    React.unmountComponentAtNode(this._overlayTarget);
	    this._overlayInstance = null;
	  },

	  getOverlayDOMNode: function () {
	    if (!this.isMounted()) {
	      throw new Error('getOverlayDOMNode(): A component must be mounted to have a DOM node.');
	    }

	    if (this._overlayInstance) {
	      return this._overlayInstance.getDOMNode();
	    }

	    return null;
	  },

	  getContainerDOMNode: function () {
	    return this.props.container.getDOMNode ?
	      this.props.container.getDOMNode() : this.props.container;
	  }
	};


/***/ },

/***/ 209:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(3);

	var ANONYMOUS = '<<anonymous>>';

	var CustomPropTypes = {
	  /**
	   * Checks whether a prop provides a DOM element
	   *
	   * The element can be provided in two forms:
	   * - Directly passed
	   * - Or passed an object which has a `getDOMNode` method which will return the required DOM element
	   *
	   * @param props
	   * @param propName
	   * @param componentName
	   * @returns {Error|undefined}
	   */
	  mountable: createMountableChecker()
	};

	/**
	 * Create chain-able isRequired validator
	 *
	 * Largely copied directly from:
	 *  https://github.com/facebook/react/blob/0.11-stable/src/core/ReactPropTypes.js#L94
	 */
	function createChainableTypeChecker(validate) {
	  function checkType(isRequired, props, propName, componentName) {
	    componentName = componentName || ANONYMOUS;
	    if (props[propName] == null) {
	      if (isRequired) {
	        return new Error(
	          'Required prop `' + propName + '` was not specified in ' +
	            '`' + componentName + '`.'
	        );
	      }
	    } else {
	      return validate(props, propName, componentName);
	    }
	  }

	  var chainedCheckType = checkType.bind(null, false);
	  chainedCheckType.isRequired = checkType.bind(null, true);

	  return chainedCheckType;
	}

	function createMountableChecker() {
	  function validate(props, propName, componentName) {
	    if (typeof props[propName] !== 'object' ||
	      typeof props[propName].getDOMNode !== 'function' && props[propName].nodeType !== 1) {
	      return new Error(
	        'Invalid prop `' + propName + '` supplied to ' +
	          '`' + componentName + '`, expected a DOM element or an object that has a `getDOMNode` method'
	      );
	    }
	  }

	  return createChainableTypeChecker(validate);
	}

	module.exports = CustomPropTypes;

/***/ },

/***/ 210:
/***/ function(module, exports) {

	
	/**
	 * Shortcut to compute element style
	 *
	 * @param {HTMLElement} elem
	 * @returns {CssStyle}
	 */
	function getComputedStyles(elem) {
	  return elem.ownerDocument.defaultView.getComputedStyle(elem, null);
	}

	/**
	 * Get elements offset
	 *
	 * TODO: REMOVE JQUERY!
	 *
	 * @param {HTMLElement} DOMNode
	 * @returns {{top: number, left: number}}
	 */
	function getOffset(DOMNode) {
	  if (window.jQuery) {
	    return window.jQuery(DOMNode).offset();
	  }

	  var docElem = document.documentElement;
	  var box = { top: 0, left: 0 };

	  // If we don't have gBCR, just use 0,0 rather than error
	  // BlackBerry 5, iOS 3 (original iPhone)
	  if ( typeof DOMNode.getBoundingClientRect !== 'undefined' ) {
	    box = DOMNode.getBoundingClientRect();
	  }

	  return {
	    top: box.top + window.pageYOffset - docElem.clientTop,
	    left: box.left + window.pageXOffset - docElem.clientLeft
	  };
	}

	/**
	 * Get elements position
	 *
	 * TODO: REMOVE JQUERY!
	 *
	 * @param {HTMLElement} elem
	 * @param {HTMLElement?} offsetParent
	 * @returns {{top: number, left: number}}
	 */
	function getPosition(elem, offsetParent) {
	  if (window.jQuery) {
	    return window.jQuery(elem).position();
	  }

	  var offset,
	      parentOffset = {top: 0, left: 0};

	  // Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
	  if (getComputedStyles(elem).position === 'fixed' ) {
	    // We assume that getBoundingClientRect is available when computed position is fixed
	    offset = elem.getBoundingClientRect();

	  } else {
	    if (!offsetParent) {
	      // Get *real* offsetParent
	      offsetParent = offsetParent(elem);
	    }

	    // Get correct offsets
	    offset = getOffset(elem);
	    if ( offsetParent.nodeName !== 'HTML') {
	      parentOffset = getOffset(offsetParent);
	    }

	    // Add offsetParent borders
	    parentOffset.top += parseInt(getComputedStyles(offsetParent).borderTopWidth, 10);
	    parentOffset.left += parseInt(getComputedStyles(offsetParent).borderLeftWidth, 10);
	  }

	  // Subtract parent offsets and element margins
	  return {
	    top: offset.top - parentOffset.top - parseInt(getComputedStyles(elem).marginTop, 10),
	    left: offset.left - parentOffset.left - parseInt(getComputedStyles(elem).marginLeft, 10)
	  };
	}

	/**
	 * Get parent element
	 *
	 * @param {HTMLElement?} elem
	 * @returns {HTMLElement}
	 */
	function offsetParent(elem) {
	  var docElem = document.documentElement;
	  var offsetParent = elem.offsetParent || docElem;

	  while ( offsetParent && ( offsetParent.nodeName !== 'HTML' &&
	    getComputedStyles(offsetParent).position === 'static' ) ) {
	    offsetParent = offsetParent.offsetParent;
	  }

	  return offsetParent || docElem;
	}

	module.exports = {
	  getComputedStyles: getComputedStyles,
	  getOffset: getOffset,
	  getPosition: getPosition,
	  offsetParent: offsetParent
	};

/***/ },

/***/ 211:
/***/ function(module, exports) {

	/**
	 * Safe chained function
	 *
	 * Will only create a new function if needed,
	 * otherwise will pass back existing functions or null.
	 *
	 * @param {function} one
	 * @param {function} two
	 * @returns {function|null}
	 */
	function createChainedFunction(one, two) {
	  var hasOne = typeof one === 'function';
	  var hasTwo = typeof two === 'function';

	  if (!hasOne && !hasTwo) { return null; }
	  if (!hasOne) { return two; }
	  if (!hasTwo) { return one; }

	  return function chainedFunction() {
	    one.apply(this, arguments);
	    two.apply(this, arguments);
	  };
	}

	module.exports = createChainedFunction;

/***/ },

/***/ 212:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(3);
	var joinClasses = __webpack_require__(159);
	var classSet = __webpack_require__(160);
	var BootstrapMixin = __webpack_require__(163);


	var Tooltip = React.createClass({displayName: "Tooltip",
	  mixins: [BootstrapMixin],

	  propTypes: {
	    placement: React.PropTypes.oneOf(['top','right', 'bottom', 'left']),
	    positionLeft: React.PropTypes.number,
	    positionTop: React.PropTypes.number,
	    arrowOffsetLeft: React.PropTypes.number,
	    arrowOffsetTop: React.PropTypes.number
	  },

	  getDefaultProps: function () {
	    return {
	      placement: 'right'
	    };
	  },

	  render: function () {
	    var classes = {};
	    classes['tooltip'] = true;
	    classes[this.props.placement] = true;
	    classes['in'] = this.props.positionLeft != null || this.props.positionTop != null;

	    var style = {};
	    style['left'] = this.props.positionLeft;
	    style['top'] = this.props.positionTop;

	    var arrowStyle = {};
	    arrowStyle['left'] = this.props.arrowOffsetLeft;
	    arrowStyle['top'] = this.props.arrowOffsetTop;

	    return (
	        React.createElement("div", React.__spread({},  this.props, {className: joinClasses(this.props.className, classSet(classes)), style: style}), 
	          React.createElement("div", {className: "tooltip-arrow", style: arrowStyle}), 
	          React.createElement("div", {className: "tooltip-inner"}, 
	            this.props.children
	          )
	        )
	      );
	  }
	});

	module.exports = Tooltip;

/***/ },

/***/ 213:
186

});