const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const Appointment = sequelize.define('appointments', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    department: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    doctor_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    appointment_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    appointment_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,
    freezeTableName: true
});

// İlişki tanımlama
Appointment.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});

module.exports = Appointment;
