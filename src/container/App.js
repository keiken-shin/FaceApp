import React, { useState } from 'react';
import Header from '../components/Header/Header';
import ImageForm from '../components/ImageForm/ImageForm';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import AuthPage from '../components/AuthPage/AuthPage';
import SignIn from './SignIn';
import Register from './Register';
import axios from 'axios';

 
const initialUser = {
  id: '',
  name: '',
  email: '',
  enteries: 0,
  joined: ''
}

const App = () => {
  const [ route, setRoute ] = useState('signin');
  const [ input, setInput ] = useState('');
  const [ imgURL, setImgURL ] = useState('');
  const [ box, setBox ] = useState({});
  const [ user, setUser ] = useState(initialUser);

  const particlesParams = {
    "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#ffffff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          },
          "image": {
            "src": "img/github.svg",
            "width": 100,
            "height": 100
          }
        },
        "opacity": {
          "value": 0.5,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 6,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "repulse"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 400,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
  }

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      enteries: data.enteries,
      joined: data.joined
    })
  }

  // Route Change
  const onRouteChange = (route) => {
    if(route === 'signin') setUser(initialUser);
    if(route === 'home') setBox({});
    setRoute(route);
  }

  // Calculate face location
  const facelocation = (data) => {
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.querySelector('#inputImg');
      const width = Number(image.width);
      const height = Number(image.height);
      
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height),
        width: width,
        height: height
      }
  }

  // Display Face Box
  const displayFaceBox = (box) =>{
    setBox(box);
  }

  // Grabbing Input Value
  const onInputChange = (event) => {
    setInput(event.target.value);
  }

  // Detecting Face
  const onDetect = async () => {
    setImgURL(input);
    axios({
      method: 'post',
      url: 'https://obscure-castle-66785.herokuapp.com/imageurl',
      data: {
        input: input
      }
    })
    .then(res => {
      axios({
        method: 'put',
        url: 'https://obscure-castle-66785.herokuapp.com/image',
        data: {
          id: user.id,
        }
      }).then(count => setUser(prevState => {
                          return {...prevState, enteries: count.data}
                        })
        ).catch(console.log)
      displayFaceBox(facelocation(res.data));
    })
    .catch(console.log)
  }

  return (
    <div className="bg-dark1 text-white min-h-screen">
      { route === 'home'
        ? <main>
            <Header onRouteChange={onRouteChange} setImgURL={setImgURL}/>
            <section className="flex flex-col justify-center text-center">
            <ImageForm 
              onInputChange={onInputChange} 
              onDetect={onDetect} 
              particlesParams={particlesParams}
              name={user.name}
              enteries={user.enteries}
            />
            <FaceRecognition 
              box={box}
              imgURL={imgURL} 
            />
          </section>
          </main>
        : <AuthPage 
                particlesParams={particlesParams} 
                facelocation={facelocation}
                displayFaceBox={displayFaceBox}
                box={box}
            >
            { route === 'signin'
              ? <SignIn onRouteChange={onRouteChange} loadUser={loadUser} />
              : <Register onRouteChange={onRouteChange} loadUser={loadUser} />
            }
          </AuthPage>
        
      }
    </div>
  );
}

export default App;
