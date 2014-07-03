﻿var http = require('http');
var EventEmitter = require('events').EventEmitter;
var dispatcher = require('./appDispatcher');

function CiqualStore (){
    this.items = [];    
}

CiqualStore.prototype = new EventEmitter();

CiqualStore.prototype.initialize = function () {
    var self = this;
    var req = http.request({
        path: '/res/ciqual.json'
    }, function (res) {
        var result = "";
        res.on('data', function (chunk) {
            console.log('ciqualStore : initialize : response :', chunk.length);
            result += chunk;
        });
        res.on('end', function () {
            self.items = JSON.parse(result);
            self.emit('change');
        });
    });
    req.end();
};

CiqualStore.prototype.getItems = function () {
    console.log()
    return this.items;    
};

var store = new CiqualStore();
dispatcher.register(function (payload) {
    switch (payload.action) {
        case 'initialize':
            console.log('ciqualStore is initializing');
            store.initialize();
            break;
        default:
            console.log('CiqualStore does not handle ', payload);
    }
    return true;
});

module.exports = store;
