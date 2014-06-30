var App = require('./appComponent.js');
var appCache = require('./appcache.js')(applicationCache);
var react = require('react');

function init() {
    appCache.on('UPDATE_EVENT', function (e) { console.log("appcache event!", e); });
    react.renderComponent(App(), document.getElementById("content"));
}

window.onload = init;
