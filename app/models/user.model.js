module.exports = (sequelize, Sequelize) => {
    const Model = sequelize.define("users", { //define table name
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true, //if auto increment,can be null, the id will be incremented from previous one
      },
      user_name: {
        type: Sequelize.STRING(20), //like varchar in SQL
        allowNull: false,
      },
      user_email: {
        type: Sequelize.STRING(30), 
        allowNull: false,
      },
      user_passw: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_type: {
        type: Sequelize.STRING(5),
        allowNull: false,
      },
      user_status:{
        type: Sequelize.BOOLEAN,
        defaultValue: 1,
        allowNull: false,
      },
    });
  
    return Model;
  };
  
  