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
                }, this)
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
        var ul = react.DOM.div();
        if (!_.isEmpty(items)) {
            var groups = _.groupBy( items, function ( it ) { return it.category; });
            lis = _.map(groups, function ( val, key ) {
                return TreeNode({ key: key, items: val, 
                    itemTemplate: react.DOM.li,
                    onSelectItem: this.onSelectItem });
            }, this );
            ul = react.DOM.ul({ className: this.props.className + " ingredients-tree" }, lis);
        }
        return ul;
    },

    onSelectItem: function (it) {
        this.props.onSelectItem(it);
    },

    render: function () {
        var lis = this.renderItemTree( this.props.items );
        return lis;
    }

});

module.exports = IngredientsTree;