const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,  
      primaryKey: true   
    },
    nombre:{
      type: DataTypes.STRING,
      allowNull: false
    },
    resumenplato:{
      type: DataTypes.STRING,
      allowNull: false 
    },
    puntuacion:{
      type: DataTypes.STRING,
    },
    comidaSaludable:{
      type: DataTypes.STRING, 
    },
    pasoapaso:{
      type: DataTypes.STRING,
    },
    createdInDb:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
  };
    
      
    
