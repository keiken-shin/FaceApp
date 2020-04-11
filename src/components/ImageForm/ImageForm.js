import React from 'react';
import Particles from 'react-particles-js';

const ImageForm = ({ onInputChange, onDetect, particlesParams, name, enteries }) => {
    return(
        <div className="w-full">
            <h1 className="p-16 relative">
                <Particles 
                    className="absolute top-0 bottom-0 right-0 left-0 w-full h-full"
                    params={particlesParams} />
                <span className="text-3xl font-bold z-10">Welcome {`${name}`}!</span>
                <span className="block mb-3 absolute right-0 top-auto p-3 bg-green-600 z-10">Enteries #{enteries}</span>
            </h1>
            <section className="p-6">
                <input 
                    onChange={onInputChange}
                    className="w-1/2 p-3 bg-dark2 outline-none "
                    type="text" 
                    placeholder="Paste your image url here..." 
                />
                <button 
                    onClick={onDetect}
                    className="py-3 px-6 cursor-pointer outline-none bg-purple-800 transition-all duration-150 ease-in-out transform hover:scale-110 focus:scale-110"
                    type="button"
                >Detect</button>
            </section>
        </div>
    )
}

export default ImageForm;