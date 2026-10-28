const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Carga = db.define('Cargas',{
    codCarga: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idMotorista: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            key: 'codMotorista',
            model: 'Motoristas'
        }
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    peso: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    volume: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    codRastreio: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
},{
    timestamps: false,
    tableName: 'Cargas'
})

module.exports = Carga