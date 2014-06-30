var react = require('react');

var App = react.createClass({
    render: function () {
        return react.DOM.p(null, ["content",
            react.DOM.a({ href: "test" }, "link content")
        ]);
    }
});

module.exports = App;