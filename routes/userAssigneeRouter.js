const express = require('express');
const router = express();

const userAssignee_Controller = require("../controllers/userAssigneeController");

router.post('/userAssignee',userAssignee_Controller.addUserAssignee);
router.get('/userAssignees',userAssignee_Controller.getUserAssignee);
router.get('/userAssignee/:id',userAssignee_Controller.getUserAssigneeById);
router.delete('/userAssignee/:id',userAssignee_Controller.deleteAssigneeById);

module.exports = router;