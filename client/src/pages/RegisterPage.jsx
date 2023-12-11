import { Link } from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function RegisterPage(){
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate();
    const validateName = (value) => {
      const regex = /^[a-zA-Z\s]*$/;
      return regex.test(value);
    };
  
    const validateEmail = (value) => {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return regex.test(value);
    };
    const validatePassword = (value) => {
     
      if (value.length < 8) {
        return false;
      }
  
      const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
      return regex.test(value);
    };
  
  
    const handleNameChange = (ev) => {
        const value = ev.target.value;
        setName(value);
    
        if (!validateName(value)) {
          setNameError('Name can only contain letters and spaces');
        } else {
          setNameError('');
        }
      };
    
      const handleEmailChange = (ev) => {
        const value = ev.target.value;
        setEmail(value);
      
      if (value === '') {
        setEmailError('');
      } else if (!validateEmail(value)) {
        setEmailError('Email can only contain letters, numbers, underscores, and hyphens');
      } else {
        setEmailError('');
      }
    };
    const handlePasswordChange = (ev) => {
      const value = ev.target.value;
      setPassword(value);
  
      if (value === '') {
        setPasswordError('');
      } else if (!validatePassword(value)) {
        setPasswordError('Password must be at least 8 characters long and contain at least one uppercase, one lowercase, one number, and one special character');
      } else {
        setPasswordError('');
      }
    };
   async function registerUser(ev){
            ev.preventDefault();
            if (nameError || emailError) {
                alert('Please fix the validation errors.');
                return;
              }
             
            
            try{
                await axios.post('/register',{
                    name,
                    email,
                    password,
                });
                navigate('/login');
            }catch(e){
                alert('Registration failed.please try again later');
            }
    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
            <h1 className="text-4xl text-center m-4">Register</h1>
            <form className="max-w-md mx-auto " onSubmit={registerUser}>
                <input type="text"
                 placeholder="John Doe" required
                 value={name}
                 onChange={handleNameChange}
                  />
                {nameError && <div className="text-red-500">{nameError}</div>}
                <input type="email"
                 placeholder="your@email.com" required
                 value={email}
                 onChange={handleEmailChange}
                  />
                 {emailError && <div className="text-red-500">{emailError}</div>}
                <input type="password" 
                placeholder="password" required
                value={password}
                 onChange={handlePasswordChange}
                 />
                 {passwordError && <div className="text-red-500">{passwordError}</div>}
                <button className="primary">Register</button>
                <div className="text-center py-2 text-gray-500">
                    Already a member<Link  className="underline text-black"to={'/login'}>Login</Link>
                </div>
            </form>
            </div>
         
        </div>
    );

    
}