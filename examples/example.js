var Nosy = require('../nosy');

var nosy = new Nosy(require('./feeds.json').feeds, {
    interval: 1
});

nosy.on('item', function(item) {
    console.dir(item);
    console.dir('nosy items');
});

nosy.start();
