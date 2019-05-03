module.exports = (sequelize, type) => {
    var infrastructure= sequelize.define(
      "INFRASTRUCTURE_TABLE",
      {
        sensorId: {
          type: type.INTEGER,
          primaryKey: true,
          allowNull: false
        },
        smartNodeId: {
            type: type.INTEGER,
            allowNull: false
          },
          clusterId: {
            type: type.INTEGER,
            allowNull: false
          },
          latitude: {
            type: type.DECIMAL(9,6),
            allowNull: false
          },
          longitude: {
            type: type.DECIMAL(9,6),
            allowNull: false
          },
          type: {
            type: type.STRING,
          },
          status: {
            type: type.STRING,
            allowNull: false
          },
          
      },
      {
        freezeTableName: true
      }
    )
    return(infrastructure)
   };