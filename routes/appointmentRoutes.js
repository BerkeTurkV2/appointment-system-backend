const express = require('express');
const router = express.Router();
const { 
    createAppointment, 
    getUserAppointments,
    deleteAppointment
} = require('../controllers/appointmentController');

// Yeni randevu oluşturma
router.post('/create', createAppointment);

// Kullanıcının randevularını listeleme
router.get('/user/:user_id', getUserAppointments);

// Randevu silme
router.delete('/:id', deleteAppointment);

module.exports = router;
