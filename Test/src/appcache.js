"use strict";

var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var appDispatcher = require('./appDispatcher.js');

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
    },

    addEventListener: function (callback) {
        this.on(UPDATE_EVENT, callback);
    },

    removeEventListener: function (callback) {
        this.removeListener(UPDATE_EVENT, callback);    
    }
});

appDispatcher.register(function (e) {
    switch (e.action) {
        case 'initialize':
            console.log('appCache is initializing');
            var cache = window.applicationCache;
            cache.addEventListener('updateready', appCache.onUpdateReady.bind(appCache));
            cache.addEventListener('checking', appCache.onChecking.bind(appCache));
            cache.addEventListener('noupdate', appCache.onNoUpdate.bind(appCache));
            break;
        default:
            console.log('appCache does not know event:', e);
    }

    return true;
});

module.exports = appCache;