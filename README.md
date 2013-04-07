# Cannon Game

A dual screen game in which you throw around cannon balls. Leverages Box2D and Socket.io to enable a touch interface for any browser.

You can try it out here:
http://palf-cannon.herokuapp.com/

## Setup

This application requires [**node**](http://nodejs.org/) and [**npm**](https://npmjs.org/)

To install, run the following:

    npm install
    node app

You can then navigate to [http://localhost:5000](http://localhost:5000) to see the landing page.

As this app is intended to run on [Heroku](https://www.heroku.com/), if you have the [command-line tools](https://devcenter.heroku.com/categories/command-line) installed, you can run:

    foreman start

## Usage

Once you are up and running, you can open the landing page at [http://your.ip.address:5000](http://palf-cannon.herokuapp.com). It has links to the Remote and World pages, as well as supplementary information. I recommend opening the World page first.

* [Remote](http://palf-cannon.herokuapp.com/remote)
  * this page has a large blue shape that expects drag events and gestures
  * drag your mouse or finger across the blue shape to send an event to the World
* [World](http://palf-cannon.herokuapp.com/world)
  * this page has a canvas area that contains some physical objects
  * on events from Remote, additional objects will be created, moving at the velocity and angle of the gesture

