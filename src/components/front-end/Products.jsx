import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import ProductCard from './ProductCard'
import bird from '../../assets/bird.jpg'

function Products({ search }) {
    const [products, setProducts] = useState([
        {
            "id": 114,
            "name": "Sun glass",
            "description": "Description for product 1",
            "img": "https://via.placeholder.com/150",
            "price": "10.99",
            "category": "Category 1"
        },

        {
            "id": 115,
            "name": "TV",
            "description": "Description for product 1",
            "img": "https://via.placeholder.com/150",
            "price": "10.99",
            "category": "Category 1"
        },

        {
            "id": 116,
            "name": "Headphones",
            "description": "Description for product 1",
            "img": "https://via.placeholder.com/150",
            "price": "10.99",
            "category": "Category 1"
        }

    ]);

    useEffect(() => {
        axios.get("/api/getproducts", {
            params: { search: search }
        })
            .then((res) => {
                console.log(res);
                setProducts(res.data);
            })
            .catch((err) => console.log(err));
    }, [search]);


    return <div className="container mt-32">

        <div className="sm:flex justify-between items-center">
            <h2 className="text-4xl font-medium">Trending Products</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
            {products.map((item) => (
                <ProductCard
                    key={item.id}
                    id={item.id}
                    img={bird}
                    category={item.category}
                    title={item.name}
                    price={item.price}
                />
            ))}
        </div>
    </div>


}

export default Products