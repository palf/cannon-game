exports.index = function(req, res){
  res.render('index', { title: 'Palf Cannon :: Index' });
};


exports.remote = function(req, res){
  res.render('remote', { title: 'Palf Cannon :: Remote' });
};


exports.world = function(req, res){
  res.render('world', { title: 'Palf Cannon :: World' });
};
