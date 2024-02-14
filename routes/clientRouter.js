const express = require('express');
const router = express();

const client_controller = require('../controllers/clientController');

router.post('/client',client_controller.addClient);
router.get('/clients',client_controller.getClients);
router.get('/client/:id',client_controller.getClientById);
router.put('/client/:id',client_controller.updateClient);
router.delete('/client/:id',client_controller.deleteClient);
module.exports = router;