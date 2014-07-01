var react = require('react');
var App = require('./appComponent.js');
var appDispatcher = require('./appDispatcher.js');

function main() {
    appDispatcher.initializeApp();
    react.renderComponent(App(), document.getElementById("content"));
}

window.onload = main;
