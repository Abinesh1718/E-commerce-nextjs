'use client'
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../components/redux/hook';
import { setLoading } from '../../../components/redux/features/loadingReducer';
import axios from 'axios';
import ProductRow from '../../../components/admin-panel/ProductRow'
import Popup from '../../../components/admin-panel/popup'

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);
    const [updateTable, setUpdateTable] = useState(false);

    const dispatch = useAppDispatch();


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

    return (
        <div>
            <div className=" bg-white h-[calc(100vh-96px)] rounded-lg p-4">
                <h2 className="text-3x1">All Products</h2>
                <div className="mt-4 h-[calc(100vh-180px)] overflow-y-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-gray-500 border-t border-[#ececec]">
                                <th className="text-left">SR No.</th>
                                <th className="text-left">Name</th>
                                <th className="text-left">Price</th>
                                <th className="text-left">Picture</th>
                                <th className="text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <ProductRow
                                    key={product?.id}
                                    srNo={index + 1}
                                    setOpenPopup={setOpenPopup}
                                    setUpdateTable={setUpdateTable}
                                    product={product}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {openPopup && (
                <Popup setOpenPopup={setOpenPopup} setUpdateTable={setUpdateTable} />)}
        </div>
    );
};

export default Dashboard;
