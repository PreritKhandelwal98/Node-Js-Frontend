import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch('http://localhost:7200/', {
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        setProducts(result);
    }

    const deleteProduct = async (id) => {
        console.warn(id)
        let result = await fetch(`http://localhost:7200/product/${id}`, {
            method: "Delete"
        });
        result = await result.json();
        if (result) {
            getProducts();
        }
    }

    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:7200/search/${key}`);
            result = await result.json()
            if (result) {
                setProducts(result)
            }
        } else {
            getProducts();
        }

    }

    return (
        <>
            <div className="product-list">
                <h3>Product List</h3>
                <input type="" className='search-product-box' placeholder='Search Product'
                    onChange={searchHandle}
                />
                {/* <ul>
                    <li>S. No.</li>
                    <li>Name</li>
                    <li>Price</li>
                    <li>Category</li>
                    <li>Operation</li>

                </ul> */}
                {
                    products.length > 0 ?
                        <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {products.map((item, index) =>
                                <div key={item._id} className="card" style={{ width: '18rem', margin: '10px' }}>
                                    <img className="card-img-top" src={item.imageURL} alt={item.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="card-text">Price: {item.price}</p>
                                        <p className="card-text">Category: {item.category}</p>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Link to={"/update/" + item._id} className="btn btn-primary">Update</Link>
                                            <button className="btn btn-danger" onClick={() => deleteProduct(item._id)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        : <h1>No Result Found</h1>
                }
            </div>

        </>
    )
}

export default ProductList;