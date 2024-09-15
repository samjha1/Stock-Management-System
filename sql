CREATE TABLE Products (
    Product_ID INT PRIMARY KEY AUTO_INCREMENT,
    Product_Name VARCHAR(255) NOT NULL,
    Category VARCHAR(100),
    Quantity_In_Stock INT DEFAULT 0,
    Price DECIMAL(10, 2),
    Supplier_ID INT,
    FOREIGN KEY (Supplier_ID) REFERENCES Suppliers(Supplier_ID)
);
