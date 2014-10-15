nodeacademy
===========

A self paced, self directed, platform for learning how to code!

# About

*Disclaimer* : still a work in progress

![Imgur](http://i.imgur.com/xQQRt6f.png)

The course software models online courses from MOOCs (such as Khanacademy, Codecademy, and edx) as a tree structure.
The easier courses sit at the top of the tree, and the harder towards the bottom. Completing higher nodes unlocks the
lower nodes for a student, and offers them “paths” in their own education. Icons down the left side of the screen
correspond to “tracks”. These tracks may be “web design”, “robotoics”, “basics”, “games”, etc. Each track has its own
tree where all the courses lead a student towards a functional knowledge of the topic.

# Installation

If you intend to use nodeacademy to learn, you can simply install it from npm.

```
npm install -g nodecademy
nodeacademy
```

If you intend to contribute to nodeacademy:

```
git clone git@github.com:openspacesi/nodeacademy.git
cd nodeacademy
npm link
nodeacademy
```
