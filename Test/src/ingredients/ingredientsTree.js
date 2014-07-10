var react = require('react');
var bs = require('react-bootstrap');
var _ = require('underscore');

var TreeNode = react.createClass({

    getInitialState: function () {
        return { hidden: false };
    },

    render: function () {
        var liClassName = this.state.hidden ? "chevron-down" : "chevron-up";
        var template = this.props.itemTemplate;
        return react.DOM.li({ className: liClassName,  }, [
            react.DOM.span({ onClick: this._toggleShowHidden }, this.props.key),
            react.DOM.ul({ style: { display: this.state.hidden ? 'none' : '' } }, 
                _.map( this.props.items, function ( it ) {
                    return template( { key: it.id, onClick: _.partial(this.props.onSelectItem, it) },
                        [ react.DOM.span(null, [it.name]) ]);
                }, this )
            )
        ]);
    },

    _toggleShowHidden: function (key) {
        var hidden = this.state.hidden;
        this.setState({ hidden: !hidden });
    }
});

var IngredientsTree = react.createClass( {

    renderItemTree: function ( items ) {
        var popover = null;
        if (!_.isEmpty(items)) {
            var groups = _.groupBy( items, function ( it ) { return it.category; });
            lis = _.map(groups, function ( val, key ) {
                return TreeNode({ key: key, items: val, 
                    itemTemplate: react.DOM.li,
                    onSelectItem: this.props.onSelectItem });
            }, this );
            var ul = react.DOM.ul({ className: this.props.className + " ingredients-tree" }, lis);
            popover = bs.Popover({ placement: 'bottom', title: 'Ingrédients'}, ul)
        }
        return react.DOM.div({}, [
            react.DOM.input({ className: 'col-xs-12', name: 'searchFilter', type: 'search',
                onChange: this.props.onUpdateFilter}),
            popover
        ]);
    },

    render: function () {
        var lis = this.renderItemTree( this.props.items );
        return lis;
    }

});

module.exports = IngredientsTree;