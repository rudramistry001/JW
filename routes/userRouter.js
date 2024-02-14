const express = require('express');
const router = express();

const user_controller = require('../controllers/userController');

router.post('/login',user_controller.login);
router.post('/register',user_controller.register);
router.get('/users',user_controller.getUsers);
router.get('/user/:id',user_controller.getUserById);
router.put('/user/:id',user_controller.updateUser);
router.delete('/user/:id',user_controller.deleteUser);
router.get('/roleViseUser/:role',user_controller.getUserByRole);
router.get('/getSupervisorUnderUserList/role/:role/site/:site',user_controller.getUsersRoleVise);

module.exports = router;