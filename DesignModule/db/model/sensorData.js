module.exports = (sequelize, type) => {
      
  var sensorData= sequelize.define(
      "SENSOR_DATA_TABLE",
      {
        sensorId: {
          type: type.INTEGER,
          allowNull: false
        },
          data: {
            type: type.DECIMAL(9,6),
            allowNull: false
          },
      },
      {
        freezeTableName: true
      }
    );
    return(sensorData)
   };