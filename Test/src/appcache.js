"use strict";

var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');

var UPDATE_EVENT = 'UPDATE_EVENT';

var appCache = merge(EventEmitter.prototype, {
    onUpdateReady: function () {
        this.emit(UPDATE_EVENT, { state: 'update ready'});
    },

    onChecking: function () {
        this.emit(UPDATE_EVENT, { state: 'checking'});
    },

    onNoUpdate: function () {
        this.emit(UPDATE_EVENT, { state: 'no update' });
    }
});

function init(cache) {
    cache.addEventListener('updateready', appCache.onUpdateReady);
    cache.addEventListener('checking', appCache.onChecking);
    cache.addEventListener('noupdate', appCache.onNoUpdate);
    return appCache;
}

module.exports = init;