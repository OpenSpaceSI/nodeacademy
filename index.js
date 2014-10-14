var SvgTree = require('svg-tree');
var screen = require('./screen.js');
screen.document = document
screen.window = window
var loadClasses = require('./loadClasses.js');

window.onload = function onload(e) {
  var treeOpts = {
    "cellWidth":89,
    "cellHeight":70,
    "cellBorder":6
  }
  loadClasses(function(e,tracks) {
    if(e) return console.log(e)
    var tree = new SvgTree(treeOpts)
    var courses = []
    var trackButtons = ""
    // Pass 1 builds nodes
    Object.keys(tracks).forEach(function(key) {
      v = tracks[key]
      trackButtons += '<i class="fa fa-fw track-button" title="'+key+'">'+v.rune+'</i><br>'
      Object.keys(v.track).forEach(function(t) {
        var c = v.track[t]
        var svgTree = v.svgTree[t]
        courses[t] = tree.CreateCell({"x":svgTree.x,"y":svgTree.y,"rune":svgTree.rune})
        .on('click',function() {
          console.log("Launching "+t)
          console.log(c.definition)
        })
        .on('hover',function() {
          screen.setHeadings(c.title)
          screen.setDescriptions(c.description)
        })
        .index
      })
    })
    // Pass 2 builds edges
    Object.keys(tracks).forEach(function(v) {
      v = tracks[v]
      Object.keys(v.track).forEach(function(t) {
        var c = v.track[t]
        if(!c.deps) return;
        c.deps.forEach(function(dep) {
          tree.addEdge(courses[t],courses[dep])
        })
      })
    })
    document.getElementById("track-navigation").innerHTML = trackButtons
    tree.compile(document.getElementById("course-tree"))
    window.onresize = screen.render
    screen.render()
  })
}

