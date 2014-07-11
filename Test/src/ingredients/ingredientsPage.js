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
            react.DOM.div({ onBlur: this.onBlured, onFocus: this.onFocused },
            bs.Panel(null,  [
                bs.Row(null, [
                    react.DOM.input({ className: 'col-xs-12', name: 'searchFilter', type: 'search',
                        onChange: this._updateFilter, value: this.state.inputValue })
                ]),
                bs.Row(null, [
                    bs.Col({ xs: 12 }, [
                        IngredientsTree({ className: "row", items: this.state.items, 
                            onSelectItem: this._selectItem })
                    ]),
                ])
            ])),
            bs.Row(null, [
                bs.Col({ xs: 12 }, [
                    IngredientView({ item: this.state.selectedItem })
                ])
            ])
        ]);
    },

    onBlured: function (e) {
        console.log('blur!');
        e.stopPropagation();
    },

    onFocused: function (e) {
        console.log('focus!');
        e.stopPropagation();
    },

    _selectItem: function (item) {
        console.log('clicked');
        this.setState({ inputValue: '' });
        dispatcher.handleViewAction('select_item', { itemId: item.id });
    },

    _updateFilter: function (e) {
        var value = e.target.value;
        this.setState({ inputValue: value });
        console.log(e);
        dispatcher.handleViewAction('filter_items', { filter: value });
    },

    _onDataUpdate: function (e) {
        this.setState({ items: ciqual.getItems(), selectedItem: ciqual.getSelectedItem() });    
    }
});

module.exports = App;