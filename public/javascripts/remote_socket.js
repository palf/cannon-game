var socket = io.connect();

var on_gesture = function(angle, power) {
  socket.emit('on gesture', {
    angle: angle,
    power: power
  });
}
