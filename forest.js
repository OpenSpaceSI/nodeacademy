//This file is a nightmare and is in desperate need of refactoring
var forest = module.exports = {}
var loadClasses = require('./loadClasses.js')
var SvgTree = require('svg-tree')

forest.build = function buildForest(opts,cb) {
  opts.treeOpts = opts.treeOpts || {}
  opts.onClick = opts.onClick || function(){}
  opts.onHover = opts.onHover || function(){}
  var result = {}
  loadClasses(function(e,tracks) {
    if(e) return console.log(e)
    Object.keys(tracks).forEach(function(trackName) {
      result[trackName] = {}
      var track = tracks[trackName]
      result[trackName] = {
        button : {
          title:trackName,
          rune:track.rune
        },
        courseTree: new SvgTree(opts.treeOpts),
        track: track
      } //end result[trackName].button
      var courses = []
      Object.keys(track.track).forEach(function(courseName) {
        var course = track.track[courseName]
        var courseSvg = track.svgTree[courseName]
        courses[courseName] = result[trackName].courseTree.CreateCell({
          "x":courseSvg.x,"y":courseSvg.y,"rune":courseSvg.rune
        })
        .on('click',function() {
            opts.onClick(track.track[courseName])
        })
        .on('hover',function() {
          opts.onHover(track.track[courseName])
        })
        .index
      }) // end Object.keys(track.track).forEach
      Object.keys(track.track).forEach(function(courseName) {
        var course = track.track[courseName]
        if(!course.deps) return
        course.deps.forEach(function(dep) {
          result[trackName].courseTree.addEdge(courses[courseName],courses[dep])
        }) // end course.deps.forEach
      }) //end Object.keys(track.track).forEach
    }) //end Object.keys(tracks).forEach
    cb(result)
  }) //end loadClasses
} //end forest.build
