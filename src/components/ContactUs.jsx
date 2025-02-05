'use client';
import { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', confirmPassword: '',
    });

    const [error, setError] = useState({});
    const [storedData, setStoredData] = useState([]);

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('formEntries')) || [];
        setStoredData(savedData);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        setError((prevErrors) => ({ ...prevErrors, [name]: value ? '' : prevErrors[name], }));
    };

    const validateEmail = (email) => /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(email);
    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = {
            name: formData.name ? '' : 'Name is required',
            email: formData.email ? (validateEmail(formData.email) ? '' : 'Invalid email') : 'Email is required',
            password: formData.password ? '' : 'Password is required',
            confirmPassword: formData.confirmPassword ? (formData.password === formData.confirmPassword ? '' : 'Passwords do not match') : 'Confirm Password is required',
        };

        setError(errors);

        if (!Object.values(errors).some((err) => err)) {
            emailjs.send('service_j4as2yz', 'template_fvndh3o', formData, 'CWwiCbA0jfwmwwpH2')
                .then(() => {
                    Swal.fire({ icon: 'success', title: 'Form Submitted', text: 'Your message has been sent successfully!', });
                    const updatedStoredData = [...storedData, formData];
                    setStoredData(updatedStoredData);
                    localStorage.setItem('formEntries', JSON.stringify(updatedStoredData));

                    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
                })
                .catch(() => {
                    Swal.fire({ icon: 'error', title: 'Oops!', text: 'Something went wrong, please try again later.', });
                });
        }
    };

    const handleDelete = (index) => {
        const updatedData = storedData.filter((_, i) => i !== index);
        setStoredData(updatedData);
        localStorage.setItem('formEntries', JSON.stringify(updatedData));
    };

    return (
        <div className='py-5 flex flex-col justify-center items-center min-h-screen'>
            <div className='w-full max-w-md bg-white p-6 rounded-lg shadow-lg'>
                <h2 className='text-xl font-semibold text-center mb-4'>Form Validation</h2>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    {['name', 'email', 'password', 'confirmPassword'].map((field) => (
                        <div key={field} className='relative'>
                            <input type={field.includes('password') ? 'password' : 'text'} name={field} placeholder={field.charAt(0).toUpperCase() + field.slice(1)} className='w-full p-3 border rounded-lg' onChange={handleInputChange} value={formData[field]} />
                            {error[field] && <p className='text-red-500 text-sm mt-1'>{error[field]}</p>}
                        </div>
                    ))}
                    <button type='submit' className='w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition'>Submit</button>
                </form>
            </div>
            {storedData.length > 0 && (
                <div className='mt-6 w-full max-w-lg bg-white p-4 rounded-lg shadow-lg'>
                    <h3 className='text-lg font-semibold mb-3'>Stored Form Data</h3>
                    <table className='w-full border-collapse border border-gray-300'>
                        <thead>
                            <tr className='bg-gray-100'>
                                <th className='border border-gray-300 p-2'>Name</th>
                                <th className='border border-gray-300 p-2'>Email</th>
                                <th className='border border-gray-300 p-2'>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {storedData.map((entry, index) => (
                                <tr key={index} className='text-center'>
                                    <td className='border border-gray-300 p-2'>{entry.name}</td>
                                    <td className='border border-gray-300 p-2'>{entry.email}</td>
                                    <td className='border border-gray-300 p-2'>
                                        <button
                                            onClick={() => handleDelete(index)} className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition'>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ContactUs;