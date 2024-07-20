'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { makeToast } from '../utlis/helper';
import { setLoading } from '../../components/redux/features/loadingReducer'
import { useAppDispatch, useAppSelector } from '../../components/redux/hook'
import Loader from '../../components/admin-panel/Loader';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setuser] = useState("")
    const router = useRouter();
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(data => data.loadingReducer)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        dispatch(setLoading(true));

        const body = {
            email: email,
            password: password,
            name: user
        };

        try {
            const response = await axios.post('/api/signup', body);

            if (response.status === 200) {
                console.log('Signup successful:', response.data);
                // Navigate to login or dashboard page

                makeToast('Signup successfull!')
                setTimeout(() => {
                    dispatch(setLoading(false));

                    router.push('/login');

                }, 1000);

            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred. Please try again.');
            dispatch(setLoading(false));
            makeToast(err.response?.data?.message, 'error');

            console.log('Signup error:', err);
        }
    };
    const handlenaviagte = () => {
        router.push('/login');

    }
    return (
        <div className="container mx-auto p-4">
            {isLoading && <Loader />}

            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        User Name
                    </label>
                    <input
                        type="name"
                        id="name"
                        value={user}
                        onChange={(e) => setuser(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                {error && <p className="text-red-500 text-xs italic">{error}</p>}
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Sign Up
                    </button>
                    <button onClick={(e) => {
                        e.preventDefault();
                        handlenaviagte();
                    }} >Login here ?</button>
                </div>
            </form>
        </div>
    );
}
