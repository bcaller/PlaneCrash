/**
 * Created by Ben on 05/09/2015.
 */
var EventEmitter = require('events').EventEmitter;
var util = require('util');
function LocationReporter() {
    this.latlng = [51.536086, -0.153809]
}
util.inherits(LocationReporter, EventEmitter);
LocationReporter.prototype.fake = function () {
    var start = [51.536086, -0.153809]
    var end = [48.661943, 2.834473]
    var steps = 100
    var update = [(end[0] - start[0]) / steps, (end[1] - start[1]) / steps]
    this.i = 0
    var self = this
    setInterval(function () {
        self.latlng = [start[0] + update[0] * self.i, start[1] + update[1] * self.i]
        self.i++
        self.emit('location');
    }, 1000)
}

module.exports = LocationReporter
