const express = require('express');
const router = express();

const attendance_controller = require('../controllers/attendanceController');

router.post('/attendance',attendance_controller.addAttendance);
router.get('/attendances',attendance_controller.getAttendances);
router.get('/attendance/:id',attendance_controller.getAttendanceById);
router.put('/attendance/:id',attendance_controller.updateAttendance);
router.delete('/attendance/:id',attendance_controller.deleteAttendance);
router.get('/getAttendanceReportByDate/fromDate/:fromDate/toDate/:toDate',attendance_controller.getAttendanceReportByDate);
router.get('/getAttendanceByClient/:clientName',attendance_controller.getAttendanceReportByClient);
router.get('/getAttendanceBySite/:siteName',attendance_controller.getAttendanceReportBySite);
router.get('/getAttendanceByProject/:projectName',attendance_controller.getAttendanceReportByProject);

module.exports = router;