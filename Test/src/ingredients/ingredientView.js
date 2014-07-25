var react = require('react');
var bs = require('react-bootstrap');

var IngredientView = react.createClass({
    render: function () {
        var item = this.props.item;
        var fields = [];
        var header = 'No item selected';
        
        if (item) {
            for (var field in item) {
                fields.push(bs.Row(null, [
                    bs.Col({ md: 10 }, [field]),
                    bs.Col({ md: 1 }, [item[field]])
                ]));
            }
            header = react.DOM.h1(null, item.name);
        }
        else {
            fields.push(react.DOM.div(null, [header]));
        }
        return bs.Panel({
            bsStyle: 'primary',
            header: header
        }, fields);
    }
});

module.exports = IngredientView;
