var EventEmitter = require('events').EventEmitter,
    util = require('util'),
    FeedSub = require('feedsub');

var Nosy = module.exports = function(feeds, options) {
    this.readers = [];
    var self = this;
    for (var i in feeds) {
        var reader = new FeedSub(feeds[i].url, options);
        reader.on('item', function(item) {
            self.emit('item', item);
        });
        reader.on('items', function(items) {
            self.emit('items', items);
        });
        reader.on('error', function(err) {
            self.emit('error', err);
        });
        this.readers.push(reader);
    }
}

util.inherits(Nosy, EventEmitter);

Nosy.prototype.start = function() {
    for (var i in this.readers) {
        this.readers[i].start();
    }
}

Nosy.prototype.stop = function() {
    for (var i in this.readers) {
        this.readers[i].stop();
    }
}
