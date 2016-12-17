'use strict';


module.exports = function(orm, db) {

  var User = db.define('users', {
    id: { type : "serial", key: true }
    , first_name: {type: 'text', required: true}
    , last_name: {type: 'text', required: true}
  }, {
    methods: {
      fullName: function() {
        return `${this.first_name} ${this.last_name}`;
      }
    }
  });

  return User;
};