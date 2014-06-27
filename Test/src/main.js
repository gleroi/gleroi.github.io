var react = require( 'react' );

function init() {
    var cpt = 0;
    var elm = document.getElementById( "test" );
    setInterval( function () {
        elm.innerText = "BOOO3! " + cpt++;
    }, 1000 );

    applicationCache.addEventListener( "updateready", onUpdateReady );
    applicationCache.addEventListener( "checking", onChecking );
    applicationCache.addEventListener( "noupdate", onNoUpdate );

    react.renderComponent(App(), document.getElementById("content"));
}

var App = react.createClass( {
    render: function () {
        return react.DOM.p( null, ["content",
            react.DOM.a( { href: "test" }, "link content" )
        ] );
    }
});

function onUpdateReady() {
    var elt = document.getElementById( "update" );
    elt.innerText = "Update ready!";
}

function onChecking() {
    var elt = document.getElementById( "update" );
    elt.innerText = "Checking!";
}

function onNoUpdate() {
    var elt = document.getElementById( "update" );
    elt.innerText = "No update!";
}

window.onload = init;
