module.exports = (sequelize, Sequelize) => {
  const Model = sequelize.define("transaction", {
    trans_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    prod_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'prod_id'
      }
    },
    trans_qty: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    trans_status: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  });

  return Model;
};







// module.exports = (sequelize, Sequelize) => {
//   const Model = sequelize.define("productssolds", {
//     inv_id: {
//       type: Sequelize.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//       references: {
//         model: 'invoices',
//         key: 'inv_id'
//       }
//     },
//     prod_id: {
//       type: Sequelize.INTEGER,
//       allowNull: false,
//       references: {
//         model: 'products',
//         key: 'prod_id'
//       }
//     },
//     sold_qty: {
//       type: Sequelize.INTEGER,
//       allowNull: false,
//     },
//     total_price: {
//       type: Sequelize.DECIMAL(7, 2),
//       allowNull: false,
//     },
//   });

//   return Model;
// };
