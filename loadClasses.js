var fs = require('fs')
var once = require('once')
var path = require('path')
var tracks = require("./tracks/tracks.json")

module.exports = function loadCourses(cb) {
  var cb = once(cb)
  var folders = Object.keys(tracks)
  var fileCount = folders.length
  var count = 0
  folders.forEach(function(v) {
    fs.readFile(
      path.join(__dirname,"tracks",v,"track.json"),
      {encoding:"utf-8"},
      function(e,data)
      {
        if(e) cb(e)
        tracks[v].track = JSON.parse(data)
        if(++count == 2*fileCount) cb(null,tracks)
      }
    )
    fs.readFile(
      path.join(__dirname,"tracks",v,"svg-tree.json"),
      {encoding:"utf-8"},
      function(e,data)
      {
        if(e) cb(e)
        tracks[v].svgTree = JSON.parse(data)
        if(++count == 2*fileCount) cb(null,tracks)
      }
    )
  })
}
