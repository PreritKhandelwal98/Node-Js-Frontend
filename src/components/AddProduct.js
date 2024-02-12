import React from 'react';

const AddProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState(false);
    const [successMessage, setSuccessMessage] = React.useState('');

    const addProduct = async () => {
        try {
            setError(false);

            if (!name || !price || !company || !category) {
                setError(true);
                return;
            }

            const authUser = localStorage.getItem('user');
            if (!authUser) {
                // Handle the case when the user is not authenticated
                console.error("User not authenticated");
                return;
            }

            const userId = JSON.parse(authUser)._id;
            let result = await fetch("http://localhost:7200/add-product", {
                method: "post",
                body: JSON.stringify({ name, price, category, company, userId }),
                headers: {
                    "Content-type": "application/json"
                }
            });
            result = await result.json();

            if (result.success) {
                setSuccessMessage("Product added successfully!");
                // Clear input fields after successful addition
                setName('');
                setPrice('');
                setCategory('');
                setCompany('');
            } else {
                setSuccessMessage('');
                console.error(result.error);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <div className='product'>
            <h1>Add Product</h1>
            <input
                type="text"
                placeholder='Enter product name'
                className='inputBox'
                value={name}
                onChange={(e) => { setName(e.target.value) }}
            />
            
            {error && !name && <span className='invalid-input'>Enter valid name</span>}

            <input
                type="text"
                placeholder='Enter product price'
                className='inputBox'
                value={price}
                onChange={(e) => { setPrice(e.target.value) }}
            />
            {error && !price && <span className='invalid-input'>Enter valid price</span>}

            <input
                type="text"
                placeholder='Enter product category'
                className='inputBox'
                value={category}
                onChange={(e) => { setCategory(e.target.value) }}
            />
            {error && !category && <span className='invalid-input'>Enter valid category</span>}

            <input
                type="text"
                placeholder='Enter product company'
                className='inputBox'
                value={company}
                onChange={(e) => { setCompany(e.target.value) }}
            />
            {error && !company && <span className='invalid-input'>Enter valid company</span>}

            <button onClick={addProduct} className='appButton'>Add Product</button>
            {successMessage && <div className='success-message'>{successMessage}</div>}
        </div>
    );
}

export default AddProduct;
