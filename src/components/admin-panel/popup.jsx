import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../redux/hook'
import { setLoading } from '../redux/features/loadingReducer'
import { IoCloseSharp } from "react-icons/io5";
import {makeToast} from '../../app/utlis/helper'
import axios from 'axios';

function Popup({ setUpdateTable, setOpenPopup }) {
    const productData = useAppSelector(state => state.productSlice)
    const dispatch = useAppDispatch()

    console.log(productData);
    const [inputData, setInputData] = useState({
        name: productData.name,
        category: productData.category,
        price: productData.price,
        id: productData.id
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setLoading(true));
        axios
            .put(`/api/update`, inputData)
            .then((res) => {
                setUpdateTable((prevState) => !prevState);
                makeToast("Product Updated Successfully!", "success");  // Call with type

            })
            .catch((err) => console.log(err))
            .finally(() => {
                dispatch(setLoading(false));
                setOpenPopup(false);
            });
    };


    return (
        <div className="fixed top-0 left-0 w-full h-screen bg-[#00000070] grid place-items-center">
            <div className="bg-white w-[500px] h-[350px] py-10 px-8 rounded-lg text-center relative">
                <IoCloseSharp
                    className="absolute text-2xl right-0 top-0 m-4 cursor-pointer hover:text-red-600"
                    onClick={() => setOpenPopup(false)}
                />

                <h2 className="text-2xl -mt-3">Edit Product</h2>
                <form className="mt-6 space-y-4 mx-auto" onSubmit={handleSubmit}>
                    <input
                        className="border block border-gray-500 outline-none px-4 py-2 rounded-lg w-full"
                        type="text"
                        placeholder="Name"
                        value={inputData.name}
                        onChange={(e) =>
                            setInputData({ ...inputData, name: e.target.value })
                        }
                        required
                    />
                    <input
                        className="border block border-gray-500 outline-none px-4 py-2 rounded-lg w-full"
                        type="text"
                        placeholder="Category"
                        value={inputData.category}
                        onChange={(e) =>
                            setInputData({ ...inputData, category: e.target.value })
                        }
                        required
                    />
                    <input
                        className="border block border-gray-500 outline-none px-4 py-2 rounded-lg w-full"
                        type="number"
                        placeholder="Price"
                        value={inputData.price}
                        onChange={(e) =>
                            setInputData({ ...inputData, price: e.target.value })
                        }
                        required
                    />
                    <div className="flex justify-end">
                        <button className="bg-accent text-white px-8 py-2 rounded-lg">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Popup