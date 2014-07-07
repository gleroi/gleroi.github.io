var react = require( 'react' );
var _ = require( 'underscore' );

var TreeNode = react.createClass( {
    getInitialState: function () {
        return { hidden: false };
    },

    render: function () {
        var hidden = this.state.hidden;
        return react.DOM.li(null, [
            react.DOM.span({ onClick: this._toggleShowHidden }, [this.props.key]),
            hidden ? null : react.DOM.ul( null, _.map( this.props.items, function ( it ) {
                return react.DOM.li( { key: it.id, onClick: _.partial(this.props.onSelectItem, it) },
                    [ react.DOM.span(null, [it.name]) ]);
            }, this ))
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
            return TreeNode({ key: key, items: val, onSelectItem: this.props.onSelectItem });
        }, this );
        return lis;
    },

    render: function () {
        var lis = this.renderItemTree( this.props.items );
        return react.DOM.ul( null, lis );
    }
});

module.exports = IngredientsTree;