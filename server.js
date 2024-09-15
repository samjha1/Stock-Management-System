const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'stock_management'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

// Add product
app.post('/add-product', (req, res) => {
    const { name, category, quantity, price, supplier_id } = req.body;
    const sql = 'INSERT INTO Products (Product_Name, Category, Quantity_In_Stock, Price, Supplier_ID) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name, category, quantity, price, supplier_id], (err, result) => {
        if (err) throw err;
        res.send('Product added successfully');
    });
});

// Restock product
app.post('/restock', (req, res) => {
    const { product_id, quantity, supplier_id } = req.body;
    const sqlRestock = 'INSERT INTO Stock_In (Product_ID, Quantity, Date_Received, Supplier_ID) VALUES (?, ?, CURDATE(), ?)';
    const sqlUpdateStock = 'UPDATE Products SET Quantity_In_Stock = Quantity_In_Stock + ? WHERE Product_ID = ?';
    
    db.query(sqlRestock, [product_id, quantity, supplier_id], (err, result) => {
        if (err) throw err;
        db.query(sqlUpdateStock, [quantity, product_id], (err, result) => {
            if (err) throw err;
            res.send('Stock updated successfully');
        });
    });
});

// Sell product
app.post('/sell', (req, res) => {
    const { product_id, quantity } = req.body;
    const sqlSell = 'INSERT INTO Stock_Out (Product_ID, Quantity, Date_Sold) VALUES (?, ?, CURDATE())';
    const sqlUpdateStock = 'UPDATE Products SET Quantity_In_Stock = Quantity_In_Stock - ? WHERE Product_ID = ?';

    db.query(sqlSell, [product_id, quantity], (err, result) => {
        if (err) throw err;
        db.query(sqlUpdateStock, [quantity, product_id], (err, result) => {
            if (err) throw err;
            res.send('Sale recorded and stock updated');
        });
    });
});

// Get all products
app.get('/products', (req, res) => {
    const sql = 'SELECT * FROM Products';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
