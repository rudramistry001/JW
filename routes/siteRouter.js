const express = require('express');
const router = express();

const site_controller = require('../controllers/siteController');

router.post('/site',site_controller.addSite);
router.get('/sites',site_controller.getSites);
router.get('/site/:id',site_controller.getSiteById);
router.put('/site/:id',site_controller.updateSite);
router.delete('/site/:id',site_controller.deleteSite);
router.get('/siteByProject/:projectName',site_controller.getSiteByProject);
router.get('/siteByLocation/:location',site_controller.getSiteByLocation);
module.exports = router;