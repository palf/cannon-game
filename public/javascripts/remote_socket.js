var socket = io.connect();

var on_gesture = function(angle, power) {
  socket.emit('on hammer', {
    angle: angle,
    power: power
  });
}
