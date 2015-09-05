/**
 * Created by Ben on 05/09/2015.
 */
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var csv = require("csv-to-array");
function LocationReporter() {
    var self = this
    this.latlng = {lat:51.536086, lng:-0.153809}
    csv({
        file: "./flight.csv",
        columns: ["lat", "lng"]
    }, function (err, array) {
        self.pts = array
        self.latlng = array[0];
        self.run()
    });
}
util.inherits(LocationReporter, EventEmitter);
LocationReporter.prototype.run = function () {
    this.i = 0
    var self = this
    setInterval(function () {
        self.latlng = self.pts[self.i++]
        self.emit('location');
    }, 1000)
}

module.exports = LocationReporter
