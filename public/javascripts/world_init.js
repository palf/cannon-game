window.requestAnimFrame = (function(){
  return function(callback, element){
    window.setTimeout(callback, 1000 / 60);
  };
})();


var power = 40;
var angle = 30;
var color = 'green';
var bullet_value = true;

var SCALE = 10;
var NULL_CENTER = {x:null, y:null};

var world = {};
var bodiesState = null;
var box = null;

var ctx = document.getElementById("world").getContext("2d");
var canvasWidth = ctx.canvas.width;
var canvasHeight = ctx.canvas.height;
var center = {
  x : canvasWidth / ( 2 * SCALE ),
  y : canvasHeight / ( 2 * SCALE )
}
var canvas_width = canvasWidth / SCALE;
var canvas_height = canvasHeight / SCALE;


ground = {
  id: "ground",
  x: center.x,
  y: canvas_height,
  halfHeight: 0.5,
  halfWidth: center.x,
  color: 'yellow'
}

left_wall = {
  id: "left_wall",
  x: 0,
  y: center.y,
  halfHeight: center.y - 0.5,
  halfWidth: 0.5,
  color: 'yellow'
}

right_wall = {
  id: "right_wall",
  x: canvas_width,
  y: center.y,
  halfHeight: center.y - 0.5,
  halfWidth: 0.5,
  color: 'yellow'
}

ceiling = {
  id: "ceiling",
  x: center.x,
  y: 0,
  halfHeight: 0.5,
  halfWidth: center.x,
  color: 'yellow'
}

var structure_centre = 75;

var initialState = [
  ground,
  left_wall,
  right_wall,
  ceiling,
  {id: "b1", x:structure_centre - 4, y: canvas_height - 2, halfHeight: 2, halfWidth: 0.10, angle: -2.8},
  {id: "b2", x:structure_centre - 2, y: canvas_height - 2, halfHeight: 2, halfWidth: 0.10, angle: 2.8},
  {id: "b3", x:structure_centre + 2, y: canvas_height - 2, halfHeight: 2, halfWidth: 0.10, angle: -2.8},
  {id: "b4", x:structure_centre + 4, y: canvas_height - 2, halfHeight: 2, halfWidth: 0.10, angle: 2.8},
  {id: "b5", x:structure_centre, y: canvas_height - 6, halfHeight: 0.25, halfWidth: 5},

  {id: "b11", x:structure_centre - 4, y: canvas_height - 8, halfHeight: 2, halfWidth: 0.10, angle: -2.8},
  {id: "b12", x:structure_centre - 2, y: canvas_height - 8, halfHeight: 2, halfWidth: 0.10, angle: 2.8},
  {id: "b13", x:structure_centre + 2, y: canvas_height - 8, halfHeight: 2, halfWidth: 0.10, angle: -2.8},
  {id: "b14", x:structure_centre + 4, y: canvas_height - 8, halfHeight: 2, halfWidth: 0.10, angle: 2.8},
  {id: "b15", x:structure_centre, y: canvas_height - 11, halfHeight: 0.25, halfWidth: 4}
];

var ball_def = {id: "ball", x: 2, y: canvas_height - 2, radius: 0.5}

var running = true;
var waiting_for_ball = false;



var socket = io.connect();
socket.on("gesture data", function (data) {
  angle = data['angle']
  power = data['power']
  color = data['color']
  waiting_for_ball = true
});




function update(animStart) {
  box.update();
  bodiesState = box.getState();

  for (var id in bodiesState) {
    var entity = world[id];
    if (entity) entity.update(bodiesState[id]);
  }
}


function draw() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  for (var id in world) {
    var entity = world[id];
    entity.draw(ctx);
  }
}


function init() {
  for (var i = 0; i < initialState.length; i++) {
    world[initialState[i].id] = Entity.build(initialState[i]);
  }
  create_box();
}

var id = 0;

function add_ball() {
  console.log('adding ball')
  new_id = 'ball' + id.toString();
  ball_def.id = new_id
  ball_def.color = color;
  entity = Entity.build(ball_def);
  world[new_id] = entity;
  box.addBallBody(entity);
  box.applyImpulse(new_id, angle, power);
  id += 1
}


function create_box() {
  box = new bTest(60, false, canvasWidth, canvasHeight, SCALE);
  box.setBodies(world, bullet_value);
}


document.addEventListener("DOMContentLoaded", function() {
  init();
  create_box();

  (function loop(animStart) {
    if (waiting_for_ball) {
      console.log('waiting_for_ball')
      // init();
      add_ball();
      waiting_for_ball = false;
    }
    update(animStart);
    draw();
    requestAnimFrame(loop);
  })();
}, false);
