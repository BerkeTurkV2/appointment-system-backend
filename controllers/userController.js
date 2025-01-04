const User = require('../models/User');

// Kullanıcı Kaydı
const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, username, password } = req.body;

        // Kullanıcı adının benzersiz olup olmadığını kontrol et
        const userExists = await User.findOne({ where: { username } });
        if (userExists) {
            return res.status(400).json({ message: 'Bu kullanıcı adı zaten kullanılıyor' });
        }

        // Yeni kullanıcı oluştur
        const user = await User.create({
            firstName,
            lastName,
            username,
            password
        });

        if (user) {
            res.status(201).json({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username
            });
        }
    } catch (error) {
        console.error('Kayıt hatası:', error);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
};

// Kullanıcı Girişi
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Kullanıcıyı bul
        const user = await User.findOne({ where: { username } });
        
        if (user && (await user.matchPassword(password))) {
            res.json({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username
            });
        } else {
            res.status(401).json({ message: 'Geçersiz kullanıcı adı veya şifre' });
        }
    } catch (error) {
        console.error('Giriş hatası:', error);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
};

module.exports = {
    registerUser,
    loginUser
};
