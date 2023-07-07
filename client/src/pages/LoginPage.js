import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUser } = useContext(UserContext);
    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        try {
            const { data } = await axios.post('/login', { email, password });
            setUser(data);
            alert('Login success');
            setRedirect(true)
        } catch (e) {
            alert('login fail...')
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div className='mt-4 grow flex item-center justify-around'>
            <div className='mt-2'>
                <h1 className='text-4xl text-center mb-4'>Login Here</h1>
                <form className='max-w-md mx-auto' onSubmit={handleLoginSubmit}>
                    <input type="email"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}
                        placeholder='your@email.com' />
                    <input type="password"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                        placeholder='password' />
                    <button className='primary'>Login</button>
                    <div className='text-center py-2 text-gray-500'>
                        Don't have a account yet?
                        <Link to={"/register"} className="text-primary underline"> Register now</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage