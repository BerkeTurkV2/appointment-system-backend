const Appointment = require('../models/Appointment');
const User = require('../models/User');

// Yeni randevu oluşturma
const createAppointment = async (req, res) => {
    try {
        const { user_id, department, doctor_name, appointment_date, appointment_time } = req.body;

        // Kullanıcının varlığını kontrol et
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        }

        // Randevu oluştur
        const appointment = await Appointment.create({
            user_id,
            department,
            doctor_name,
            appointment_date,
            appointment_time
        });

        res.status(201).json({
            message: 'Randevu başarıyla oluşturuldu',
            appointment
        });
    } catch (error) {
        console.error('Randevu oluşturma hatası:', error);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
};

// Kullanıcının randevularını listeleme
const getUserAppointments = async (req, res) => {
    try {
        const { user_id } = req.params;

        // Kullanıcının varlığını kontrol et
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        }

        // Kullanıcının randevularını bul
        const appointments = await Appointment.findAll({
            where: { user_id },
            order: [
                ['appointment_date', 'ASC'],
                ['appointment_time', 'ASC']
            ]
        });

        res.json(appointments);
    } catch (error) {
        console.error('Randevu listeleme hatası:', error);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
};

// Randevu silme
const deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id } = req.body;

        // Randevuyu bul
        const appointment = await Appointment.findOne({
            where: { 
                id,
                user_id // Sadece randevuyu oluşturan kullanıcı silebilir
            }
        });

        if (!appointment) {
            return res.status(404).json({ message: 'Randevu bulunamadı' });
        }

        // Randevuyu sil
        await appointment.destroy();

        res.json({ message: 'Randevu başarıyla silindi' });
    } catch (error) {
        console.error('Randevu silme hatası:', error);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
};

module.exports = {
    createAppointment,
    getUserAppointments,
    deleteAppointment
};
