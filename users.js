var express = require('express');
var router = express.Router();

/* GET users listing.
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/


var service = require('../services/users');

router.get('/', service.getAllUsers);
router.get('/:id', service.getUserById);
router.post('/add', service.createUser);
router.put('/:id', service.updateUser);
router.delete('/:id', service.deleteUser);


module.exports = router;
