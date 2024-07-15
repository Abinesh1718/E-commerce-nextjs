import React from 'react'
import { useAppDispatch } from '../redux/hook'
import { RxCross1 } from "react-icons/rx";
import { removeCart } from '../redux/features/CartSlice';

function CartProduct({ product }) {

    const dispatch = useAppDispatch()

    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
                {/* <img className="h-[80px]" alt={product?.title} /> */}
                <div className="space-y-2">
                    <h3 className="font-medium">{product?.title}</h3>

                    <p className=" text-gray-600 text-[14px]" >
                        {product?.quantity} x ${product?.price}.00
                    </p>
                </div >
                <RxCross1
                className="cursor-pointer pd-40 m-10px"
                onClick={() => dispatch(removeCart(product?.id))} />
            </div >


     
        </div >
    )
}

export default CartProduct