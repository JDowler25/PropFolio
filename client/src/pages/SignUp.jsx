import axios from 'axios';
import React, { useState, useContext } from 'react';
import loginlogo from '../assets/LoginandRegLogo.svg?w=200&format=webp';
import highrise from '/src/assets/Highrise.jpg?import&w=2000&format=webp';
import './SignUp.css'; 
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';


const SignUp = () => {
  const backgroundImageStyle = {
    backgroundImage: `linear-gradient(rgba(60, 74, 131, 0.7), rgba(60, 74, 131, 0.7)), url(${highrise})`, // Set the background image and apply the specified color using linear-gradient
    backgroundSize: 'cover', //Cover the entire element
    backgroundPosition: 'center', //Center the background image
    position: 'relative', // Required for overlay
  };

  const [user, setUserState] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
    confirm: ""
  })

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // Using the User context here
  const [formErrors, setFormErrors] = useState({});

  const isValid = () => {
    let valid = true;
    const errors = {}; // Create an empty object to store errors
  
    if (user.first_name.length < 3) {
      valid = false;
      errors.first_name = "First name must be between 3 and 30 characters";
    }
    if (user.last_name.length < 3) {
      valid = false;
      errors.last_name = "Last name must be between 3 and 30 characters";
    }
    if (user.user_name.length < 3) {
      valid = false;
      errors.user_name = "Username must be between 3 and 30 characters";
    }
    if (user.email.length < 3) {
      valid = false;
      errors.email = "Email must be between 3 and 30 characters";
    }
    if (user.password.length < 3) {
      valid = false;
      errors.password = "Password must be between 3 and 30 characters";
    }
    if (user.confirm !== user.password) {
      valid = false;
      errors.confirm = "Passwords do not match";
    }
  
    setFormErrors(errors); // Set the form errors object
  
    return valid;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isValid()){
      try {
        console.log(user)
        const response = await axios.post(`http://localhost:8080/api/register`, user)
        console.log(response.data)
        setUser(response.data); // Set the user context here. 
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate('/dashboard')
      } catch (errors) {
        console.log(errors.response.data.errors)
      }
    } else {
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserState(({
      ...user,
      [name]: value
    }));
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
        <div className="bg-white max-w-xl p-11 rounded-xl text-center w-3/4 mx-4">
          <img src={loginlogo} alt="Company Logo" className="w-36 h-36 mx-auto" />
          <hr className="my-2" />
          <h2 className="text-2xl font-bold">Welcome!</h2>
          <p className="text-gray-600">To continue, sign up for Propfolio</p>
          <hr className="my-2" />
          <form onSubmit={handleSubmit} className='max-w-xl mx-auto'>
            <div className="w-full mx-auto">
              <div className="my-2">
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  placeholder="First Name*"
                  className="border rounded p-2 w-full"
                  value={user.first_name}
                  onChange={handleInputChange}
                />
              </div>
              {formErrors.first_name && (
                  <div className="text-red-500 mt-1">{formErrors.first_name}</div>
                )}
              <div className="my-2">
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  placeholder="Last Name*"
                  className="border rounded p-2 w-full"
                  value={user.last_name}
                  onChange={handleInputChange}
                  />
                {formErrors.last_name && (
                    <div className="text-red-500 mt-1">{formErrors.last_name}</div>
                  )}
              </div>
              <div className="my-2">
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  placeholder="Username*"
                  className="border rounded p-2 w-full"
                  value={user.user_name}
                  onChange={handleInputChange}
                  />
                  {formErrors.user_name && (
                      <div className="text-red-500 mt-1">{formErrors.user_name}</div>
                    )}
              </div>
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
              <div className="my-2">
                <input
                  type="password"
                  id="confirm"
                  name="confirm"
                  placeholder="Confirm Password*"
                  className="border rounded p-2 w-full"
                  value={user.confirm}
                  onChange={handleInputChange}
                  />
                  {formErrors.confirm && (
                      <div className="text-red-500 mt-1">{formErrors.confirm}</div>
                    )}
              </div>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4">
              Sign Up
            </button>
          </form>
          <p className="text-gray-600 mt-2">
            Have an account? <a href="/signin">Sign In here</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
