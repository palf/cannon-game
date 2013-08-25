var touch_area = document.getElementById("touch_area");
var hammertime = Hammer(touch_area, {
  transform: false
});


var start_position = {};

var colors = [
    '#FF82AB',
    '#BF3EFF',
    '#9FE1E7',
    '#5D478B',
    '#6495ED',
    '#43CD80',
    '#FF6600'
];

var color = colors[Math.floor(Math.random() * colors.length)];
console.log(color)
touch_area.style.background = color;


hammertime.on("dragstart", function(event) {
    start_position = {
      "left": event.target.offsetLeft,
      "top": event.target.offsetTop
    }
})


hammertime.on("touch drag", function(event) {
    event.gesture.preventDefault();
})


hammertime.on("dragend", function(event) {
    distance = event.gesture.distance;
    time = event.gesture.deltaTime;
    power = 25 * distance / time;
    angle = event.gesture.angle,

    on_gesture(angle, power, color);
})


var on_gesture = function(angle, power, color) {
  console.log('angle: ' + angle.toString());
  console.log('power: ' + power.toString());
  console.log('color: ' + color.toString());
}



