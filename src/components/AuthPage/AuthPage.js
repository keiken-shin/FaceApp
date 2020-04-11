import React from 'react';
import Particles from 'react-particles-js';
import Goddess from './Goddess.jpg';
import axios from 'axios';


const AuthPage = ({particlesParams, children, app, facelocation, displayFaceBox, box}) => {

  // Detecting Face
  const onDetect = () => {
    const input = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1868&q=80';
    axios({
        method: 'post',
        url: 'https://obscure-castle-66785.herokuapp.com/imageurl',
        data: {
          input: input
        }
    }).then(res => {
        displayFaceBox(facelocation(res.data))
    })
    .catch(console.log)
  }

    return (
        <div className="grid md:grid-cols-5 h-screen">
            <Particles
                className="absolute top-0 bottom-0 right-0 left-0 w-full h-full opacity-25"
                params={particlesParams} />
            <div className="hidden md:block md:col-start-1 md:col-end-3 h-full overflow-hidden relative z-10">
                <img 
                    id="inputImg"
                    onLoad={onDetect}
                    src={Goddess} 
                    alt="Goddess" 
                    className="h-full" 
                    style={{filter: "grayscale(100%)"}} 
                />
                <div className="absolute top-0 margin-auto" style={{width: box.width, height: box.height}}>
                    <div className="relative w-full h-full">
                        <div 
                            className="bounding_box flex flex-wrap justify-center absolute"
                            style={{
                                boxShadow: "0 0 0 3px #149df2 inset", 
                                top: box.topRow,
                                right: box.rightCol,
                                bottom: box.bottomRow, 
                                left: box.leftCol}}    
                        >
                            <span 
                                className="font-medium p-1 text-sm absolute" 
                                style={{background: '#149df2', top: '-1.8rem', left:'0'}}
                                >Face:Detected
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-auto md:col-start-3 md:col-span-3 py-4 px-6 md:py-8 md:px-16 flex items-center justify-center z-10">
                <section className="md:w-1/2 md:margin-auto">
                    <h1 className="text-6xl font-bold up text-center">FaceApp</h1>
                    <div>
                        { children }            
                    </div>
                </section>
            </div>
            
        </div>
    )
}

export default AuthPage;