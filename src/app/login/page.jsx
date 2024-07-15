
'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { makeToast } from '../utlis/helper';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const body = {
            email: email,
            password: password
        };

        try {
            const response = await axios.post('/api/login', body);
            console.log(response);

            if (response.status === 200) {
                console.log('Login successful:', response.data);
                localStorage.setItem('token', response.data.token);
                
                makeToast('Login successfull!')


                setTimeout(() => {
                    router.push('/admin/dashboard');
                }, 1000);




            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred. Please try again.');

            makeToast(err.response?.data?.message, 'error');

            console.log('Login error:', err);
        }
    };

    const handlenaviagte = () => {
        router.push('/signup');

    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded"
                        />
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Login</button>

                    {/* <Link className='m-20 p-10' href="#" >Signup</Link> */}
                </form>
                <button onClick={handlenaviagte} className='p-5px m-40px flex'>Signup here ?</button>
            </div>
        </div>
    );
}
