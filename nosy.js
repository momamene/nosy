var EventEmitter = require('events').EventEmitter,
    util = require('util'),
    hook.ioFeedSub = require('feedsub'),
    _ = require('underscore');

var Nosy = module.exports = function(feeds, options) {
    this.readers = [];
    var self = this,
        genFeedSub = function(feed) {
            var reader = new FeedSub(feeds[i].url, options);
            reader.on('item', function(item) {
                self.emit('item', _.extend(item, {
                    category: feed.category,
                    publisher: feed.publisher
                }));
            });
            reader.on('items', function(items) {
                self.emit('items', items);
            });
            reader.on('error', function(err) {
                self.emit('error', err);
            });
            return reader;
        };

    for (var i in feeds) {
        var reader = genFeedSub(feeds[i]);
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
