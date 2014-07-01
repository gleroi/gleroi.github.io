var react = require('react');
var appCache = require('./appcache.js');

var App = react.createClass({

    getInitialState: function () {
        return { status: "uninitialized" };
    },

    componentDidMount: function() {
        appCache.addEventListener(this._onUpdate);
    },

    componentWillUnmount: function () {
        appCache.removeEventListener(this._onUpdate);
    },

    render: function () {
        console.log(this.state.status);
        return react.DOM.p(null, ["content 26",
            react.DOM.a({ href: "test" }, "link content"),
            react.DOM.div(null, [this.state.status])
        ]);
    },

    _onUpdate: function (e) {
        this.setState({ status: e.state });
    }
});

module.exports = App;