import axios from 'axios';
import React, { useContext, useState } from 'react';
import loginlogo from '../assets/LoginandRegLogo.svg?w=200&format=webp';
import highrise from '/src/assets/Highrise.jpg?import&w=2000&format=webp';
import './SignIn.css'; 
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function SignIn() {
  const backgroundImageStyle = {
    backgroundImage: `linear-gradient(rgba(60, 74, 131, 0.7), rgba(60, 74, 131, 0.7)), url(${highrise})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  };

  const [user, setUserState] = useState({
    email: "",
    password: "",
  })

  

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // Using the User context here
  const [formErrors, setFormErrors] = useState({});

  const isValid = () => {
    let valid = true;
    const errors = {};

    if (user.email.length < 3) {
      valid = false;
      errors.email = "Email must be between 3 and 30 characters";
    }
    if (user.password.length < 3) {
      valid = false;
      errors.password = "Password must be between 3 and 30 characters";
    }

    setFormErrors(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValid()) {
      try {
        console.log(user)
        const response = await axios.post(`http://localhost:8080/api/login`, user);
        console.log(response.data);
        setUser(response.data); // Set the user context here. 
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate('/dashboard');
      } catch (errors) {
        console.log(errors.response.data.errors);
      }
    } else {
      // handle invalid form
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserState({
      ...user,
      [name]: value
    });
  };

  return (
    <div className="flex h-screen w-screen columns-2" style={backgroundImageStyle}>
      <div className="w-3/6 flex justify-center items-center">
        <div className="max-w-full h-40vh flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold pb-2 text-white">Need a tutorial?</h1>
          <h2 className="text-2xl pb-4 text-white">Click below to schedule a demo!</h2>
          <hr className="w-1/2 border-t border-pink-500 my-4" />
          <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded">
            Request Demo
          </button>
        </div>
      </div>
      <div className="w-3/6 flex justify-center items-center">
        <div className="bg-white max-w-screen p-12 rounded-xl text-center">
          <img src={loginlogo} alt="Company Logo" className="w-36 h-36 mx-auto" />
          <hr className="my-4" />
          <h2 className="text-2xl font-bold">Welcome Back!</h2>
          <p className="text-gray-600">To continue, log in to Propfolio</p>
          <hr className="my-4" />
          <form onSubmit={handleSubmit} className='max-w-2xl mx-auto'>
            <div className="w-full mx-auto">
              <div className="my-2">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email Address*"
                  className="border rounded p-2 w-full"
                  value={user.email}
                  onChange={handleInputChange}
                />
                {formErrors.email && (
                  <div className="text-red-500 mt-1">{formErrors.email}</div>
                )}
              </div>
              <div className="my-2">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password*"
                  className="border rounded p-2 w-full"
                  value={user.password}
                  onChange={handleInputChange}
                />
                {formErrors.password && (
                  <div className="text-red-500 mt-1">{formErrors.password}</div>
                )}
              </div>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4">
              Sign In
            </button>
          </form>
          <p className="text-gray-600 mt-2">
            Don't have an account? <a href="/signup">Sign Up here</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
