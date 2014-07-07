var fs = require('fs');
var csv = require('fast-csv');

var filepath = 'CIQUAL2013.csv';
var input = fs.createReadStream(filepath);

function rename(obj, oldName, newName) {
    obj[newName] = obj[oldName];
    delete obj[oldName];
}

var renameMap = [
    [ 'ORIGFDCD', 'id' ],
    [ 'ORIGGPFR', 'category' ],
    [ '﻿ORIGGPCD', 'category_id' ],
    [ 'ORIGFDNM', 'name' ],
];

var rows = [];
csv.fromPath(filepath, { 
        delimiter: ';',
        headers: true
    })
    .on('record', function (data) {
        renameMap.forEach(function (pair) {
            rename(data, pair[0], pair[1]);
        });
        rows.push(data);
    })
    .on('end', function () {
        console.log('done');
        save();
    });

function save() {
    fs.writeFile('public/res/ciqual.json', JSON.stringify(rows, null, 4), function (err) {
        if (err) { 
            console.log('error : ', err); 
        }
        else {
            console.log('done writing');
        }
    });
}