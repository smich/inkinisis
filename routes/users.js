var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {


  var promise = new Promise(function(resolve, reject) {req.models.user.find({first_name: "Babis"}, 3).limit(1).run(function(err, instance) {
    if (err) {
      return;
    }
    if (instance.length == 0) {
      reject("No such instance");
      return;
    }
    resolve(instance);
  });});
  
  promise.then((users) => {
    res.send(`respond with a resource: ${users[0].fullName()}`);
  }).catch((err) => {
    res.send(`[ERROR] ${err}`);
  });
});

module.exports = router;
