var react = require('react');
var bs = require('react-bootstrap');
var appCache = require('./appcache.js');
var ciqual = require('./ciqualStore.js');
var dispatcher = require('./appDispatcher.js');
var IngredientView = require('./ingredientView.js');

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
        var lis = this.state.items.map(function (it, i) {
            return react.DOM.li({ key: it.ORIGFDCD, onClick: this._selectItem.bind(this, it) }, [react.DOM.span(null, [it.ORIGFDNM])]);
        }, this);
        return bs.Grid({ fluid: true }, [
            bs.Row(null, [this.state.status]),
            bs.Row(null, [
                bs.Col({ md: 6 }, [
                    bs.Panel(null, [ 
                        react.DOM.input({ onChange: this._updateFilter}),
                        react.DOM.ul(null, lis)])
                ]),
                bs.Col({ md: 6 }, [
                    react.DOM.div([], [IngredientView({ item: this.state.selectedItem })])
                ])
            ])
        ]);;
    },

    _selectItem: function (item) {
        dispatcher.handleViewAction('select_item', { itemId: item.ORIGFDCD })
    },

    _updateFilter: function (e) {
        var value = e.target.value;
        dispatcher.handleViewAction('filter_items', { filter: value });
    },

    _onUpdate: function (e) {
        this.setState({ status: e.state });
    },

    _onDataUpdate: function (e) {
        this.setState({ items: ciqual.getItems(), selectedItem: ciqual.getSelectedItem() });    
    }
});

module.exports = App;