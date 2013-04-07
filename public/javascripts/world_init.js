window.requestAnimFrame = (function(){
  return function(callback, element){
    window.setTimeout(callback, 1000 / 60);
  };
})();


var power_value = 40;
var angle_value = 30;
var bullet_value = true;

var SCALE = 10;
var NULL_CENTER = {x:null, y:null};

var world = {};
var bodiesState = null;
var box = null;

var ctx = document.getElementById("world").getContext("2d");
var canvasWidth = ctx.canvas.width;
var canvasHeight = ctx.canvas.height;


ground = {
  id: "ground",
  x: (canvasWidth/2) / SCALE,
  y: canvasHeight / SCALE,
  halfHeight: 0.5,
  halfWidth: (canvasWidth/2) / SCALE,
  color: 'yellow'
}

left_wall = {
  id: "left_wall",
  x: 0,
  y: (canvasHeight/2) / SCALE,
  halfHeight: (canvasHeight/2) / SCALE - 0.5,
  halfWidth: 0.5,
  color: 'yellow'
}

right_wall = {
  id: "right_wall",
  x: canvasWidth / SCALE,
  y: (canvasHeight/2) / SCALE,
  halfHeight: (canvasHeight/2) / SCALE - 0.5,
  halfWidth: 0.5,
  color: 'yellow'
}

ceiling = {
  id: "ceiling",
  x: (canvasWidth/2) / SCALE,
  y: 0,
  halfHeight: 0.5,
  halfWidth: (canvasWidth/2) / SCALE,
  color: 'yellow'
}

var initialState = [
  ground,
  left_wall,
  right_wall,
  ceiling,
  {id: "b1", x:17, y: canvasHeight / SCALE - 1, halfHeight: 2, halfWidth: 0.10},
  {id: "b2", x:17, y: canvasHeight / SCALE - 5, halfHeight: 0.25, halfWidth: 2}
];

var ball_def = {id: "ball", x: 2, y: canvasHeight / SCALE - 2, radius: 0.5}

var running = true;
var restart = false;




var socket = io.connect();
socket.on("hammer data", function (data) {
  angle_value = data['angle']
  power_value = data['power']
  restart = true
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

  add_ball()
}

var id = 0;

function add_ball() {
  new_id = 'ball' + id.toString();
  ball_def['id'] = new_id
  world[new_id] = Entity.build(ball_def);
  box = new bTest(60, false, canvasWidth, canvasHeight, SCALE);
  box.setBodies(world, bullet_value);
  box.applyImpulse(new_id, angle_value, power_value);
  id += 1
}


document.addEventListener("DOMContentLoaded", function() {
  init();

  (function loop(animStart) {
    if (restart) {
      // init();
      add_ball();
      restart = false;
    }
    update(animStart);
    draw();
    requestAnimFrame(loop);
  })();
}, false);
