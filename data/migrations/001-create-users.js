
exports.up = function(next) {
  this.createTable('users', {
    id: { type : "serial", key: true }
    , first_name: { type : "text", required: true }
    , last_name: { type : "text", required: true }
  }, function() {});

  this.execQuery('INSERT INTO users (first_name, last_name) VALUES(?, ?)', ['Babis', 'Sougias'], next);
};

exports.down = function(next) {
  this.dropTable('users', next);
};
