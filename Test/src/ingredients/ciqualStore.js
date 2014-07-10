var http = require('http');
var EventEmitter = require('events').EventEmitter;
var dispatcher = require('../appDispatcher');

function CiqualStore (){
    this.items = [];
    this.filteredItems = [];
    this.selectedItem = null;
}

CiqualStore.prototype = new EventEmitter();

CiqualStore.prototype.initialize = function () {
    var self = this;
    var req = http.request({
        path: window.location.pathname + 'res/ciqual.json',
        headers: {
            'Content-Type': 'application/json'
        }
    }, function (res) {
        var result = [];
        res.on('data', function (chunk) {
            result.push(chunk);
        });
        res.on('end', function () {
            self.items = JSON.parse(result.join(''));
            self.emit('change');
        });
    });
    req.end();
};

CiqualStore.prototype.getItems = function () {
    if (this.filteredItems === null)
        this.filteredItems = this.items;
    return this.filteredItems;    
};

CiqualStore.prototype.filterItems = function (value) {
    if (value) {
        this.filteredItems = this.items.filter(function (it) { return it.name.toLowerCase().indexOf(value) !== -1; });
    }
    else {
        this.filteredItems = [];    
    }
    this.emit('change');
};

CiqualStore.prototype.selectItem = function (itemId) {
    this.selectedItem = null;
    var len = this.items.length;
    for (var i = 0; i < len; i++) {
        var item = this.items[i];
        if (item.id === itemId) {
            this.selectedItem = item;
            this.filteredItems = [];
            this.emit('change');
            break;
        }
    }
};

CiqualStore.prototype.getSelectedItem = function () {
    return this.selectedItem;    
};

var store = new CiqualStore();
dispatcher.register(function (payload) {
    switch (payload.action) {
        case 'initialize':
            console.log('ciqualStore is initializing');
            store.initialize();
            break;
        case 'filter_items':
            var value = payload.args.filter;
            store.filterItems(value);
            break;
        case 'select_item':
            var itemId = payload.args.itemId;
            store.selectItem(itemId);
            break;
        default:
            console.log('CiqualStore does not handle ', payload);
    }
    return true;
});

module.exports = store;
