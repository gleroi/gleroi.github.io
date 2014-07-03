var fs = require('fs');
var csv = require('fast-csv');

var filepath = 'CIQUAL2013.csv';
var input = fs.createReadStream(filepath);

var rows = [];
csv.fromPath(filepath, { 
        delimiter: ';',
        headers: true
    })
    .on('record', function (data) {
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