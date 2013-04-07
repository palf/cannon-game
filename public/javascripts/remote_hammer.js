var element = document.getElementById("touch_area");
var hammertime = Hammer(element, {
  transform: false
});


var start_position = {};
// var socket = io.connect();


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

    on_gesture(angle, power);
})


var on_gesture = function(angle, power) {
  console.log('angle: ' + angle.toString());
  console.log('power: ' + power.toString());
}



