import React from 'react';
import { useAppSelector } from '../redux/hook';
import CartProduct from './CartProduct';
import { RxCross1 } from 'react-icons/rx';

function Cart({ setshowcart }) {
    const products = useAppSelector((state) => state.CartSlice);
    console.log("Cart", products);

    const getTotal = () => {
        let total = 0;
        products?.forEach(item => {
            total += item.price * item.quantity;
        });
        return total;
    }

    return (
        <div className="bg-[#0000007d] w-full min-h-screen fixed left-0 top-0 z-20 overflow-y-scroll">
            <div className="max-w-[400px] w-full min-h-full bg-white absolute right-0 top-0 p-6">
                <RxCross1
                    className="absolute right-0 top-0 m-6 text-[24px] cursor-pointer"
                    onClick={() => setshowcart(false)}
                />
                <h3 className='pt-6 text-lg font-medium text-gray-600 uppercase'>
                    Your Cart
                </h3>

                <div className='mt-6 space-y-2'>
                    {products?.map(data => (
                        <CartProduct
                            key={data?.id}
                            product={data}
                        />
                    ))}
                </div>

                <div className='flex justify-between items-center font-medium text-xl py-4'>
                    <p>Total:</p>
                    <p>${getTotal()}.00</p>
                </div>

                <button className='bg-black text-white text-center w-full rounded-3xl py-2 hover:bg-accent mb-4 mt-4'>
                    View Cart
                </button>

                <button className='bg-black text-white text-center w-full rounded-3xl py-2 hover:bg-accent'>
                    Check Out
                </button>
            </div>
        </div>
    );
}

export default Cart;
