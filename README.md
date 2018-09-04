# Memory Game Project

## Table of Contents

* [Instructions](#instructions)
* [Contributing](#contributing)
* [Dependencies](#Dependencies)
* [Game Rules](#Game Rules)

## Instructions

The starter project has some HTML and CSS styling to display a static version of the Memory Game project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality

For specific, detailed instructions, look at the project instructions in the [Udacity Classroom](https://classroom.udacity.com/me).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).

## Dependencies

This project requires two dependencies all of which are in the Index.html file 

a) Bootstrap - which is used to generate the congragulations modal  
b) Google fonts - from which we get the displayed icons

## Game Rules

1. The game starts with 16 cards flipped downwards.
2. Click a pair of cards to flip them open.  
3. These cards are compared :
        i ) If the cards contain the same icon,the cards stay open and you can then just click another pair of cards to compare them  
        ii) If the cards do not contain the same icon on flipping, the cards are flipped back.
4. When you click the first card open , a timer starts , it will stop when the cards are successfully matched therby giving you the duration of the game.
5. The game has a reset button should you wish to reset the game.