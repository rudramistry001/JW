const express = require('express');
const router = express();


const project_controller = require('../controllers/projectController');

router.post('/project',project_controller.addProject);
router.get('/projects',project_controller.getProjects);
router.get('/project/:id',project_controller.getProjectById);
router.put('/project/:id',project_controller.updateProject);
router.delete('/project/:id',project_controller.deleteProject);
router.get('/projectByClinet/:clientId',project_controller.getProjectByClient);

module.exports = router;