# Planning Pokerify

![screenshot](screenshot.png)

## Why?

After struggling with some other planning poker web apps, a co-worker said, "I bet you could you guys could make something way better than this." Challenge accepted. So here's my take on virtual planning poker (still a work in progress).

**Note: this is still a work in progress and many features are not yet built out. I've been hacking away at this in my spare time so it may take me some time to polish it up completely.**

## What is Planning Poker?

*"Planning poker, also called Scrum poker, is a consensus-based, gamified technique for estimating, mostly used to estimate effort or relative size of development goals in software development. In planning poker, members of the group make estimates by playing numbered cards face-down to the table, instead of speaking them aloud. The cards are revealed, and the estimates are then discussed. By hiding the figures in this way, the group can avoid the cognitive bias of anchoring, where the first number spoken aloud sets a precedent for subsequent estimates."* -[Wikipedia](https://en.wikipedia.org/wiki/Planning_poker)

## Why Planning Pokerify?

Planning Poker + browserify + spotify = I am bad at naming things. 

## How's it built?

Inspired by Substack's minimalistic [React starter kit](https://github.com/substack/react-starter-es6-babel) (es6 and jsx under browserify/watchify with npm run scripts) + Redux/React Router/Express/LESS + socket.io. 

## Getting Started 

```
npm i
npm run dev
npm run build

```
The `dev` command compiles the JS files and runs a watch script so changes will automatically trigger a rebundle.
`build` will uglifiy the bundle for production.




