var react = require('react');
var App = require('./ingredients/ingredientsPage.js');
var appDispatcher = require('./appDispatcher.js');

function main() {
    appDispatcher.initializeApp();
    react.renderComponent(App(), document.getElementById("content"));
}

window.onload = main;
