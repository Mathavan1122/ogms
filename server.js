const express = require("express");
const cors = require("cors");
const db = require("./app/models/index.js");
const bcrypt = require("bcrypt"); // import bcrypt for password hashing

const bodyParser = require("body-parser");
const {Sequelize} = require("sequelize");
const app = express();
const Chart = require("chart.js");
db.sequelize.sync({ alter: true });
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Create account
app.post("/createAccount", async (req, res) => {
  try {
    const { user_name, user_email, user_passw, user_type } = req.body;
    const hashedPassword = await bcrypt.hash(user_passw, 10);

    const user = await db.users.findOne({ where: { user_email } });

    if (user) {
      res.status(400).json({ error: "Email already exists" });
      return;
    }

    const payload = {
      user_name: user_name,
      user_email: user_email,
      user_passw: hashedPassword,
      user_type: user_type,
      // user_type: 'user',
      user_status: 1,
    };

    var responseData = await db.users.create(payload);
    res.status(200).json(responseData);
  } catch (error) {
      console.log(error)
    res.status(400).json(error);
  }
} );

// Login
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    let eachData = await db["user"].findByPk(id);
    if (!eachData) {
      throw "Invalid Data";
    }
    if (eachData.dataValues.password) {
      delete eachData.dataValues.password;
    }
    res.status(200).json(eachData);
  } catch (error) {
    res.status(400).json({ error });
  }
};

// Admin Login
app.post("/login/admin", async (req, res) => {
  try {
    // Get user credentials from request body
    const { user_email, user_passw } = req.body;

    // Find the user account in the database
    const user = await db.users.findOne({ where: { user_email } });

    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatches = await bcrypt.compare(user_passw, user.user_passw);
  
    // if (user_passw !== user.user_passw) {
      if (!passwordMatches) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    if (user.user_type !== "admin") {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const checkStat = user.user_status;
    if (!checkStat) {
      res.status(401).json({ error: "Account deactivated" });
      return;
    }

    // Successful login
    res.status(200).json({ message: "Login successful for user " + user_email});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// User Login
app.post("/login/user", async (req, res) => {
  try {
    // Get user credentials from request body
    const { user_email, user_passw } = req.body;

    // Find the user account in the database
    const user = await db.users.findOne({ where: { user_email } });

    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatches = await bcrypt.compare(user_passw, user.user_passw);
  
    // if (user_passw !== user.user_passw) {
      if (!passwordMatches) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    if (user.user_type !== "user") {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const checkStat = user.user_status;
    if (!checkStat) {
      res.status(401).json({ error: "Account deactivated" });
      return;
    }

    // Successful login
    res.status(200).json({ message: "Login successful for user " + user_email});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete User
app.delete("/delete/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const deletedRowCount = await db.users.destroy({
        where: { user_id: id }, // Assuming user_id is the primary key column
      });
  
      if (deletedRowCount === 0) throw "Invalid Data";
      res.status(200).json({ message: "Record deleted successfully." });
    } catch (e) {
      res.status(400).json(e);
    }  
});








app.post("/createTransaction", async (req, res) => {
  try {
    const { transactions } = req.body;

    // Start a transaction to ensure data consistency across tables
    const transaction = await db.sequelize.transaction();

    try {
      for (const transactionData of transactions) {
        let { prod_id, prod_qty, trans_status } = transactionData;
        prod_id = parseInt(prod_id);
        prod_qty = parseInt(prod_qty);

        // Find the existing product record by prod_id
        const existingProduct = await db.products.findByPk(prod_id);
        if (!existingProduct) {
          throw new Error(`Product not found with ID: ${prod_id}`);
        }

        let updatedQty;
        if (trans_status === "true") {
          // Add prod_qty to the existing quantity
          updatedQty = existingProduct.prod_qty + prod_qty;
        } else {
          // Check if there is sufficient quantity for reduction
          if (existingProduct.prod_qty < prod_qty) {
            throw new Error(`Insufficient quantity for product with ID: ${prod_id}`);
          }

          // Reduce prod_qty from the existing quantity
          updatedQty = existingProduct.prod_qty - prod_qty;
        }

        // Update the prod_qty in the products table
        existingProduct.prod_qty = updatedQty;
        await existingProduct.save({ transaction });

        // Create a new transaction record
        const transactionPayload = {
          prod_id: prod_id,
          trans_qty: prod_qty,
          trans_status: trans_status === "true" ? 1 : 0,
        };
        await db.transaction.create(transactionPayload, { transaction });
      }

      // Commit the transaction if all operations succeed
      await transaction.commit();

      res.status(200).json({ message: "Transactions created successfully!" });
    } catch (error) {
      // Rollback the transaction if an error occurs
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});





app.get('/filterProducts', async (req, res) => {
  try {
    const { prod_category } = req.query;

    if (!prod_category) {
      // If category is empty, return all products
      const allProducts = await db.products.findAll();
      res.status(200).json(allProducts);
    } else {
      // Query the database to get the filtered data from the products table
      const filteredProducts = await db.products.findAll({
        where: {
          prod_category: prod_category
        }
      });

      // Send the filtered products as the response
      res.status(200).json(filteredProducts);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

app.get('/getUniqueCategories', async (req, res) => {
  try {
    // Find the unique categories using Sequelize's distinct method
    const uniqueCategories = await db.products.findAll({
      attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('prod_category')), 'prod_category']]
    });

    // Extract the unique category values from the result
    const categories = uniqueCategories.map(category => category.prod_category);

    // Send the unique categories as the response
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});


app.get('/getproducts', async (req, res) => {
  try {
    // Query the database to get the data from the products table
    const responseData = await db.products.findAll();
    res.status(200).json(responseData);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

app.get('/gettrans', async (req, res) => {
  try {
    // Query the database to get the data from the products table
    const responseData = await db.transaction.findAll();
    res.status(200).json(responseData);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});


// Helper function to create the bar chart
function createChart(chartConfig) {
  return new Promise((resolve, reject) => {
    const canvasRenderService = new Chart.CanvasRenderService(800, 600, (Chart) => {
      Chart.defaults.global.responsive = true;
      Chart.defaults.global.maintainAspectRatio = false;
    });

    canvasRenderService.renderToDataURL(chartConfig, (error, url) => {
      if (error) {
        reject(error);
      } else {
        resolve(url);
      }
    });
  });
}

app.get('/listProducts', async (req, res) => {
  try {
    // Query the database to get the products with prod_qty < 5
    const products = await db.products.findAll({
      where: {
        prod_qty: {
          [db.Sequelize.Op.lt]: 5
        }
      },
      order: [['prod_qty', 'ASC']]
    });

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});



app.post("/addproduct", async (req, res) => {
  try {
    const { prod_name, prod_qty, prod_category } = req.body;

    // Check if a product with the same name already exists
    const existingProduct = await db.products.findOne({ where: { prod_name } });
    if (existingProduct) {
      throw { errors: [{ error: 'Product already exists.' }] };
    }

    // Create a new product record
    const newProduct = await db.products.create({
      prod_name,
      prod_qty,
      prod_category,
    });

    res.status(200).json(newProduct);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});




app.delete("/deleteproduct", async (req, res) => {
  try {
    const { prod_id } = req.body;

    // Find the existing record by ID
    const product = await db.products.findByPk(prod_id);
    if (!product) {
      throw { errors: [{ msg: 'Record not found.' }] };
    } else {
      // Delete the record
      await product.destroy();
    }

    res.status(200).json({ message: 'Record deleted successfully.' });
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.get('/getusers', async (req, res) => {
  try {
    // Query the database to get the data from the products table
    const responseData = await db.users.findAll();
    res.status(200).json(responseData);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// set port, listen for requests
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
