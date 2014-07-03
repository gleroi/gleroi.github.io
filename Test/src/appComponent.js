var react = require('react');
var appCache = require('./appcache.js');
var ciqual = require('./ciqualStore.js');

var App = react.createClass({

    getInitialState: function () {
        return { status: "uninitialized", items: [] };
    },

    componentDidMount: function() {
        appCache.addEventListener(this._onUpdate);
        ciqual.on('change', this._onDataUpdate);
    },

    componentWillUnmount: function () {
        appCache.removeEventListener(this._onUpdate);
        ciqual.removeListener('change', this._onDataUpdate);
    },

    render: function () {
        console.log(this.state.status);
        console.log(this.state.items);
        var lis = this.state.items.map(function (it, i) {
            return react.DOM.li(null, [i, it.ORIGFDNM]);
        });
        return react.DOM.p(null, ["content 26",
            react.DOM.a({ href: "test" }, "link content"),
            react.DOM.div(null, [this.state.status]),
            react.DOM.ul(null, lis)
        ]);
    },

    _onUpdate: function (e) {
        this.setState({ status: e.state });
    },

    _onDataUpdate: function (e) {
        this.setState({ items: ciqual.getItems() });    
    }
});

module.exports = App;