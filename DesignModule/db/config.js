var Sequelize = require("sequelize");
//smartconst db = "smart_alert_cloud";
const db = "smart_alert_test";
const username = "root"
const password = "shivam"
const sequelize = new Sequelize(db, username, password, {

//  "GCLOUD_PROJECT": "cmpe283",
//   "DATA_BACKEND": "cloudsql",
//   "MYSQL_USER": "root",
//   "MYSQL_PASSWORD": "shivam",
//   "INSTANCE_CONNECTION_NAME": "cmpe283:us-west1:smart-alert-database",
  //  host: "35.222.136.200",
   host: "127.0.0.1",
   dialect: "mysql",
   port: 3306,
   pool: {
       max: 5,
       min: 0,
       acquire: 30000,
       idle: 10000
   },
});
const infrastructure_model = require("./model/master");
const infrastructure_table = infrastructure_model(sequelize, Sequelize);
const sensor_data_model = require("./model/sensorData");
const sensor_data_table = sensor_data_model(sequelize, Sequelize);

sequelize.sync({ force: false }).then(() => {
 console.log(`Database & tables created!`);
});

module.exports = {
 sequelize,
 infrastructure_table,
 sensor_data_table
};
