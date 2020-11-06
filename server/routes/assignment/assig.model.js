const { DataTypes } = require('sequelize');
 
module.exports = assign;

function assign(sequelize) {
    const attributes = {
        Assignment_given: { type: DataTypes.INTEGER, allowNull: false},
        Assignment_completed: { type: DataTypes.INTEGER, allowNull: false},
        Assignment_pending: { type: DataTypes.INTEGER, allowNull: false},
        remark: { type: DataTypes.TEXT, allowNull: true}
        
    }; 

    const options = {
        defaultScope: {
            //exclude hash by default
            attributes: { exclude: ['hash'] }
        },
        scopes: {
            //include hash with this scope
            withHash: { attributes: {}, }
        }
    };
    return sequelize.define('assignment', attributes, options);
} 