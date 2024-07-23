import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import ProductCard from './ProductCard'
import bird from '../../assets/bird.jpg'
import { useAppDispatch, useAppSelector } from '../redux/hook';
import Loader from '../admin-panel/Loader';
import { setLoading } from '../redux/features/loadingReducer';

function Products({ search }) {
    const [products, setProducts] = useState([]);
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(data => data.loadingReducer)


    useEffect(() => {
        const fetchProducts = async () => {
            dispatch(setLoading(true));
            try {
                const localResponse = await axios.get("/api/getproducts");
                try {
                    const externalResponse = await axios.get("https://fakestoreapi.com/products");

                    const updatedProducts = await localResponse.data.map((product, index) => {
                        if (product.id) {
                            return { ...product, img: externalResponse.data[index].image };
                        }
                        return product;
                    });
                    console.log(externalResponse.data.image, updatedProducts);

                    setProducts(updatedProducts)
                } catch (error) {
                    console.error("Error fetching external products:", error);
                }
                // setProducts(localResponse.data);
            } catch (error) {
                console.error("Error fetching local products:", error);
            } finally {
                dispatch(setLoading(false));
            }
        };
        fetchProducts();
    }, []);




    return <> {isLoading && <Loader />}
        <div className="container mt-32">
            <div className="sm:flex justify-between items-center">
                <h2 className="text-4xl font-medium">Trending Products</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
                {products.map((item) => (
                    <ProductCard
                        key={item.id}
                        id={item.id}
                        img={item.img}
                        category={item.category}
                        title={item.name}
                        price={item.price}
                    />
                ))}
            </div>
        </div>

    </>

}

export default Products