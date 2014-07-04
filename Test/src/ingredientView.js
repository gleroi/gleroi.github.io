var react = require('react');
var bs = require('react-bootstrap');

var IngredientView = react.createClass({
    render: function () {
        var item = this.props.item;  
        var fields = [];

        if (item) {
            for (var field in item) {
                fields.push(bs.Row(null, [
                    bs.Col({ md: 10 }, [field]),
                    bs.Col({ md: 1 }, [item[field]])
                ]));
            }
        }
        else {
            fields.push(react.DOM.div(null, ['No item selected']));    
        }
        return bs.Panel(null, fields);
    }
});

module.exports = IngredientView;
