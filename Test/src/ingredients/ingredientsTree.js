var react = require( 'react' );
var bs = require( 'react-bootstrap' );
var _ = require( 'underscore' );

var TreeNode = react.createClass( {

    getInitialState: function () {
        return { hidden: false };
    },

    render: function () {
        var liClassName = this.state.hidden ? "chevron-down" : "chevron-up";
        var template = this.props.itemTemplate;
        return react.DOM.li( { className: liClassName, }, [
            react.DOM.span( { onClick: this._toggleShowHidden }, this.props.key ),
            react.DOM.ul( { style: { display: this.state.hidden ? 'none' : '' } },
                _.map( this.props.items, function ( it ) {
                    return template( { key: it.id, onClick: _.partial( this.props.onSelectItem, it ) },
                        [react.DOM.span( null, [it.name] )] );
                }, this )
                )
        ] );
    },

    _toggleShowHidden: function ( key ) {
        var hidden = this.state.hidden;
        this.setState( { hidden: !hidden });
    }
});

var IngredientsTree = react.createClass( {

    renderItemTree: function ( items ) {

        var ul = react.DOM.div();
        if ( !_.isEmpty( items ) ) {
            if (this.state && this.state.scroll) {
                var itemSize = 20;
                var startItem = Math.floor( this.state.scroll.top / 20 );
                var endItem = Math.ceil( ( this.state.scroll.top + this.state.scroll.oHeight ) / 20);
                console.log('slice', startItem, endItem);
                items  = items.slice(startItem, endItem);
            }
            var groups = _.groupBy(items, function ( it ) { return it.category; });
            lis = _.map( groups, function ( val, key ) {
                return TreeNode( {
                    key: key, items: val,
                    itemTemplate: react.DOM.li,
                    onSelectItem: this.onSelectItem
                });
            }, this );
            ul = react.DOM.ul( {
                className: this.props.className + " ingredients-tree",
                onScroll: this._onScroll
            }, lis );
        }
        return ul;
    },

    onSelectItem: function ( it ) {
        this.props.onSelectItem( it );
    },

    _onScroll: function ( e ) {
        var node = this.getDOMNode();
        this.setState( { scroll: { top: node.scrollTop, height: node.scrollHeight, oHeight: node.offsetHeight } });
        console.log( 'scroll_scrollTop:', node.scrollTop );
        console.log( 'scroll_scrollHeight:', node.scrollHeight );
        console.log( 'scroll_offsetHeight:', node.offsetHeight );
        console.log( 'scroll', e );
    },

    componentWillUpdate: function () {
        var node = this.getDOMNode();
        console.log( 'will_scrollTop:', node.scrollTop );
        console.log( 'will_scrollHeight:', node.scrollHeight );
        console.log( 'will_offsetHeight:', node.offsetHeight );
    },

    componentDidUpdate: function () {
        var node = this.getDOMNode();
        console.log( 'did_scrollTop:', node.scrollTop );
        console.log( 'did_scrollHeight:', node.scrollHeight );
        console.log( 'did_offsetHeight:', node.offsetHeight );
    },

    render: function () {
        var lis = this.renderItemTree( this.props.items );
        return lis;
    }

});

module.exports = IngredientsTree;