var react = require('react');
var bs = require('react-bootstrap');

var dispatcher = require('../appDispatcher.js');
var ciqual = require('./ciqualStore.js');
var IngredientView = require('./ingredientView.js');
var IngredientsTree = require('./ingredientsTree.js');


var App = react.createClass({

    getInitialState: function () {
        return { status: "uninitialized", items: [] };
    },

    componentDidMount: function() {
        ciqual.on('change', this._onDataUpdate);
    },

    componentWillUnmount: function () {
        appCache.removeEventListener(this._onUpdate);
        ciqual.removeListener('change', this._onDataUpdate);
    },

    render: function () {
        return bs.Grid({ fluid: true }, [
            bs.Row(null, [
                bs.Panel({ xs: 12 }, [
                    IngredientsTree({ className: "row", items: this.state.items, 
                        onSelectItem: this._selectItem, onUpdateFilter: this._updateFilter })
                ]),
            ]),
            bs.Row(null, [
                bs.Col({ xs: 12 }, [IngredientView({ item: this.state.selectedItem })])
            ])
        ]);
    },

    _selectItem: function (item) {
        console.log(this);
        dispatcher.handleViewAction('select_item', { itemId: item.id });
    },

    _updateFilter: function (e) {
        var value = e.target.value;
        dispatcher.handleViewAction('filter_items', { filter: value });
    },

    _onDataUpdate: function (e) {
        this.setState({ items: ciqual.getItems(), selectedItem: ciqual.getSelectedItem() });    
    }
});

module.exports = App;