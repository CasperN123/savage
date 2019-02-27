var events = require("events")
var eventEmitter = new events.EventEmitter();
var http = require("http")
var url = require("url")
var fs = require("fs")

var conn = 0

exports.page = function(path = "/", callback) {
    eventEmitter.on('RestEasy', function(qPath, query, res) {
        if(path == qPath && !res.foundPage) {
            res.foundPage = true
            var output = callback(query)
            console.log("On "+qPath+", received Type: " + typeof(output))
            switch (typeof(output)) {
                case "number":
                    handleNumber(output,res)
                    break;
                case "string":
                    handleString(output, res)
                    break;
                case "object":
                    handleObject(output, res)
                    break;
                default:
                    res.end()
                    break;
            }
        }
    })
}