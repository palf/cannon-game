var socket = io.connect();

var on_gesture = function(angle, power, color) {
  socket.emit('on gesture', {
    angle: angle,
    power: power,
    color: color
  });
}
