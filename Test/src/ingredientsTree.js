var react = require('react');
var bs = require('react-bootstrap');
var _ = require('underscore');

var TreeNode = react.createClass( {
    getInitialState: function () {
        return { hidden: false };
    },

    render: function () {
        var hidden = this.state.hidden;
        var template = this.props.itemTemplate;
        return react.DOM.li(null, [
            bs.Glyphicon({ glyph: hidden ? 'chevron-down' : 'chevron-up', onClick: this._toggleShowHidden }, [this.props.key]),
            react.DOM.ul({ style: { display: hidden ? 'none' : '' } }, 
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
        var groups = _.groupBy( items, function ( it ) { return it.category; });
        var lis = _.map( groups, function ( val, key ) {
            return TreeNode({ key: key, items: val, 
                itemTemplate: react.DOM.li,
                onSelectItem: this.props.onSelectItem });
        }, this );
        return react.DOM.ul({ className: this.props.className }, lis);
    },

    render: function () {
        var lis = this.renderItemTree( this.props.items );
        return lis;
    }
});

module.exports = IngredientsTree;