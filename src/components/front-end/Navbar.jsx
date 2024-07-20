import React from 'react';
import { useAppSelector } from '../redux/hook';
import { FcSearch } from "react-icons/fc";
import { AiOutlineUser } from "react-icons/ai";
import { GrCart } from "react-icons/gr";
import Link from 'next/link';
import { getToken } from 'next-auth/jwt';
import { useRouter } from 'next/navigation'
import { makeToast } from '../../app/utlis/helper';
import { LiaHandPointRightSolid } from "react-icons/lia";


function Navbar({ setshowcart, setsearch }) {
    const cartCount = useAppSelector((state) => state.CartSlice.length);

    const router = useRouter();


    const handlenaviagte = () => {

        const token = localStorage.getItem('token')
        console.log(token);

        if (token !== null) {
            router.push('/admin/dashboard');

        } else {

            makeToast('Please Login Before ', 'error')

            setTimeout(() => {
                router.push('/login');
            }, 1000);

        }
    }

    return (
        <div className='pt-4 bg-white top-0 sticky'>
            <div className="container">
                <div className="flex justify-between items-center">
                    <div className='text-4xl font-bold'>
                        E-commerce
                    </div>
                    <div className='lg:flex hidden w-full max-w-[500px]'>
                        <input onChange={(e) => setsearch(e.target.value)} className='border-2 border-accent px-6 py-2 w-full' type='text' placeholder='Search for products' />
                        <div className='bg-accent text-white text-[26px] grid place-items-center px-4'>
                            <FcSearch />
                        </div>
                    </div>
                    <div className='upperCase text-2xl rounded font-bold'>
                        <div className=' flex justify-between items-center'>
                            <LiaHandPointRightSolid />
                        </div>

                        <button onClick={handlenaviagte}> Become a  Seller </button>
                    </div>

                    <div className="flex gap-4 md:gap-8 items-center">
                        <div className="md:flex hidden gap-3">
                            <div className="rounded-full border-2 border-gray-300 text-gray-500 text-[32px] w-[50px] h-[50px] grid place-items-center">
                                <AiOutlineUser />
                            </div>

                            <div>
                                <p className="text-gray-500 text-[14px]">
                                    Hello, Sign in
                                </p>
                                <p className="font-medium">
                                    Your Account
                                </p>
                            </div>
                        </div>


                        <div className='relative'>
                            <div
                                className='text-gray-500 text-[32px] cursor-pointer'
                                onClick={() => setshowcart(true)}
                            >
                                <GrCart />
                            </div>                                <div className='absolute top-[-10px] right-[-10px] bg-red-600 w-[25px] h-[25px]
                                    rounded-full text-white text-[14px] grid place-items-center'>
                                {cartCount}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
