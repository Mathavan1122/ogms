module.exports = (sequelize, Sequelize) => {
    const Model = sequelize.define("products", { //define table name
      prod_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true, //if auto increment,can be null, the id will be incremented from previous one
      },
      prod_name: {
        type: Sequelize.STRING(20), //like varchar in SQL
        allowNull: false,
      },
      prod_qty: {
        type: Sequelize.INTEGER(4), 
        allowNull: false,
      },
      prod_category: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
    });
  
    return Model;
  };