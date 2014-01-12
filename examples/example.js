var Nosy = require('../nosy');

var nosy = new Nosy(require('./feeds.json').feeds, {
    interval: 1,
    emitOnStart: true
});

nosy.on('item', function(item) {
    console.dir(item);
});

nosy.start();
