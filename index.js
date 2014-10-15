var SvgTree = require('svg-tree')
var screen = require('./screen.js')
var open = require('opn')
screen.document = document
screen.window = window
var forest = require('./forest.js')

window.onload = function onload(e) {
  var trackNav = document.getElementById('track-navigation')
  var treeOpts = {
    "cellWidth":89,
    "cellHeight":70,
    "cellBorder":6,
  }
  var forestOpts = {
    treeOpts: treeOpts,
    onClick: function(course) {
      open(course.definition.url)
    },
    onHover: function(course) {
      screen.setHeadings(course.title)
      screen.setDescriptions(course.description)
    }
  }

  forest.build(forestOpts,function(tracks) {
    var defaultTrack = null
    Object.keys(tracks).forEach(function(track) {
      var trackObj = tracks[track]
      if(!defaultTrack) {defaultTrack = trackObj}
      //First lets add the icon
      var icon = document.createElement("i")
      icon.setAttribute('class','fa fa-fw track-button')
      icon.setAttribute('title',trackObj.button.title)
      icon.innerHTML = trackObj.button.rune
      var icon = trackNav.appendChild(icon)
      trackNav.appendChild(document.createElement("br"))
      icon.addEventListener('mouseover',function() {
        //Populate Description Here!
        screen.setHeadings(trackObj.track.title)
        screen.setDescriptions(trackObj.track.description)
      })
      icon.addEventListener('click',function() {
        //Populate the tree on click
        trackObj.courseTree.compile(document.getElementById("course-tree"))
      })
    })
    window.onresize = screen.render
    screen.render()
    screen.setHeadings(defaultTrack.track.title)
    screen.setDescriptions(defaultTrack.track.description)
    defaultTrack.courseTree.compile(document.getElementById("course-tree"))
  })
}
