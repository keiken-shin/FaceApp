import React, { useState } from 'react';
import axios from 'axios';

const SignIn = ({ onRouteChange, loadUser }) => {

    const [ signInEmail, setSignInEmail ] = useState('');
    const [ signInPassword, setSignInPassword ] = useState('');

    const onEmailChange = (event) => {
        setSignInEmail(event.target.value);
    }

    const onPasswordChange = (event) => {
        setSignInPassword(event.target.value);
    }

    const onSignIn = () => {
        const login = async() => {
            const request = await axios({
                                method: 'post',
                                url: 'https://git.heroku.com/obscure-castle-66785.git/signin',
                                data: {
                                    email: signInEmail,
                                    password: signInPassword
                                }
                            });
            const user = request.data;

            if(user.id){
                loadUser(user);
                onRouteChange('home');
            }
        }
        login();
    }

    return (
        <div>
            <div className="mt-4">
                <fieldset>
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
                    onClick={() => onSignIn()}
                >Sign-in</button>
            </div>
            <div className="mt-4 text-center w-full">
                <p className="text-gray-700">Not a memeber yet? 
                    <span 
                        className="ml-2 text-purple-500 cursor-pointer" 
                        onClick={() => {onRouteChange('register')}}
                    >Register</span>
                </p>
            </div>
        </div>
    )
}

export default SignIn;