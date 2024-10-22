import { useMutation } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN_MUTATION } from '../../lib/GraphQl/Mutations';

export default function Login() {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
        }
        else {
            navigate('/users');
            return;
        }
    }, [])
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { loading, error, data }] = useMutation(LOGIN_MUTATION, {
        onCompleted: (data) => {
            const token = data?.login?.token;
            if (token) {
                localStorage.setItem('token', token);
                setTimeout(() => {
                    navigate('/users');

                }, 2000);
            }
        },
        onError: (err) => {
            console.error('Login Error:', err);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        login({
            variables: {
                username: email,
                password: password
            },
        });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="grid place-items-center my-16">
            <div className="w-full max-w-xs">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white overflow-hidden shadow-md rounded px-8 pt-6 pb-8 mb-4"
                >
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="username"
                        >
                            Username
                        </label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="Username"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="******************"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>

                    {error && (
                        <p className="text-red-500 text-center mt-4">
                            Invalid credentials, please try again.
                        </p>
                    )}

                    {data?.login?.token && (
                        <p className="text-green-500 text-center mt-4">
                            Login successful! Token saved.
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
