import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ onRouteChange, loadUser }) => {

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const onNameChange = (event) => {
        setName(event.target.value);
    }

    const onEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const onRegister = () => {
        const register = async() => {
            const request = await axios({
                                method: 'post',
                                url: 'https://obscure-castle-66785.herokuapp.com/register',
                                data: {
                                    name: name,
                                    email: email,
                                    password: password
                                }
                            });
            const user = request.data;

            if(user.id){
                loadUser(user);
                onRouteChange('home');
            }
        }
        register();
    }

    return (
        <div>
            <div className="mt-4">
                <fieldset>
                    <div className="flex relative mb-3">
                        <label className="absolute text-sm ml-4 mt-2 text-gray-600">Name</label>
                        <input 
                            onChange={onNameChange}
                            type="text" 
                            className="w-full pt-8 pb-3 px-4 h-full bg-dark1 border border-gray-600" 
                        />
                    </div>

                    <div className="flex relative mb-3">
                        <label className="absolute text-sm ml-4 mt-2 text-gray-600">E-mail ID</label>
                        <input 
                            onChange={onEmailChange}
                            type="email" 
                            className="w-full pt-8 pb-3 px-4 h-full bg-dark1 border border-gray-600" 
                        />
                    </div>

                    <div className="flex relative mb-3">
                        <label className="absolute text-sm ml-4 mt-2 text-gray-600">Password</label>
                        <input 
                            onChange={onPasswordChange}
                            type="password" 
                            className="w-full pt-8 pb-3 px-4 h-full bg-dark1 border border-gray-600" 
                        />
                    </div>
                </fieldset>
                <button 
                    className="w-full bg-purple-800 p-4 cursor-pointer"
                    type="button" 
                    onClick={onRegister}
                >Register</button>
            </div>
            <div className="mt-4 text-center w-full">
                <p className="text-gray-700">Already a member?  
                    <span 
                        className="ml-2 text-purple-500 cursor-pointer" 
                        onClick={() => onRouteChange('signin')}
                    >Sign-in</span>
                </p>
            </div>
        </div>
    )
}

export default Register;