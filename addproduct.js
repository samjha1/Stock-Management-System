import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        category: '',
        quantity: 0,
        price: 0,
        supplier_id: 0
    });

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const addProduct = () => {
        axios.post('http://localhost:3000/add-product', product)
            .then((response) => {
                alert('Product added successfully');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <h2>Add Product</h2>
            <input type="text" name="name" placeholder="Product Name" onChange={handleChange} />
            <input type="text" name="category" placeholder="Category" onChange={handleChange} />
            <input type="number" name="quantity" placeholder="Quantity" onChange={handleChange} />
            <input type="number" name="price" placeholder="Price" onChange={handleChange} />
            <input type="number" name="supplier_id" placeholder="Supplier ID" onChange={handleChange} />
            <button onClick={addProduct}>Add Product</button>
        </div>
    );
};

export default AddProduct;
