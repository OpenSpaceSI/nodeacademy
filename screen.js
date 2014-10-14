var screen = module.exports = {}

screen.tracks = {}
screen.desc = {}
screen.desc.width = 300
screen.tree = {}
screen.scrollbar = {}
screen.scrollbar.width = 17
screen.document = null
screen.window = null
screen.descriptions = null
screen.headings = null

screen.render = function render(e) {
  var trackDiv = screen.document.getElementById('track-navigation')
  var treeDiv = screen.document.getElementById('course-tree')
  var descDiv = screen.document.getElementById('course-description')
  screen.height = window.innerHeight
  screen.width = window.innerWidth
  screen.tracks.width = trackDiv.clientWidth
  screen.tree.width = screen.width - screen.tracks.width - screen.desc.width
  var trackCSS = "height: "+screen.height+"px;"
  var treeCSS = "height: "+screen.height+"px;"
              + "width: "+screen.tree.width+"px;"
  var descCSS = "height: "+screen.height+"px;"
              + "width: "+screen.desc.width+"px;"
  trackDiv.setAttribute('style',trackCSS)
  treeDiv.setAttribute('style',treeCSS)
  descDiv.setAttribute('style',descCSS)
}

screen.setHeadings = function setHeadings(text) {
  if(!screen.headings)
    screen.headings = screen.document.getElementsByClassName("description-heading")
  for(var i=0; i < screen.headings.length; i++) {
    screen.headings.item(i).innerHTML = text
  }
}

screen.setDescriptions = function setDescriptions(text) {
  if(!screen.descriptions)
    screen.descriptions = screen.document.getElementsByClassName("description-content")
  for(var i=0; i < screen.descriptions.length; i++) {
    screen.descriptions.item(i).innerHTML = text
  }
}
