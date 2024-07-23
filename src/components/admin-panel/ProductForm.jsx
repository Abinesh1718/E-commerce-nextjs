'use client'
import { useState } from 'react';
import axios from 'axios';
import { makeToast } from '../../app/utlis/helper';
import { useRouter } from 'next/navigation';

export default function ProductForm() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/addproduct', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Product added:', response);
            makeToast('Product added successfully!');
            setTimeout(() => {
                router.push('/');
            }, 1000);
        } catch (error) {
            console.error('Error adding product:', error);
            makeToast('Failed to add product. Please try again.', 'error');
        }
    };

    return (
        <div className="container mt-8">
            <h1 className="text-2xl font-bold">Add Product</h1>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
}
