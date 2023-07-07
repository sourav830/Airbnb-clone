import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function registerUser(ev) {
        ev.preventDefault();
        try {
            await axios.post('/register', {
                name,
                email,
                password,
            });
            alert('Registration Successful');
        } catch (e) {
            alert('Registration failed, try after some time');
        }
    };

    return (
        <div className='mt-4 grow flex item-center justify-around'>
            <div className='mt-2'>
                <h1 className='text-4xl text-center mb-4'>Register</h1>
                <form className='max-w-md mx-auto' onSubmit={registerUser}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={ev => setName(ev.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                    />

                    <button className='primary'>Register</button>
                    <div className='text-center py-2 text-gray-500'>
                        All ready have an account
                        <Link to={"/login"} className="text-primary underline"> Login Here</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage