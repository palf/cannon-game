exports.index = function(req, res){
  res.render('index', { title: 'Cannon :: Index' });
};


exports.remote = function(req, res){
  res.render('remote', { title: 'Cannon :: Remote' });
};


exports.world = function(req, res){
  res.render('world', { title: 'Cannon :: World' });
};
