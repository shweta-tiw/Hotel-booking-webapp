import { useContext, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import {UserContext} from "../UserContext";
export default function LoginPage(){
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [redirect,setRedirect]=useState(false);
    const {setUser}=useContext(UserContext);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
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

    async function handleLoginSubmit(ev){
        ev.preventDefault();
        if (passwordError || emailError) {
            alert('Please fix the validation errors.');
            return;
          }
         
        try{
        const {data}= await axios.post('/login',{email,password});
            setUser(data);
            alert('Login Sucessful');
            setRedirect(true);
        }catch(e){
            alert('Login Failed');
        }
        
    }
    
    if (redirect){
        return <Navigate to={'/'}/>

    }
    return (
    
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
            <h1 className="text-4xl text-center m-4">Login</h1>
            <form className="max-w-md mx-auto " onSubmit={handleLoginSubmit}>
                <input type="email"
                 placeholder="your@email.com"
                 value={email} required
                  onChange={handleEmailChange} />
                  {emailError && <div className="text-red-500">{emailError}</div>}
                <input type="password"
                 placeholder="password" 
                 value={password}  required
                 autocomplete="current-password"
                 onChange={ 
                   handlePasswordChange
                }
                  />
                    {passwordError && <div className="text-red-500">{passwordError}</div>}
                <button className="primary">Login</button>
                <div className="text-center py-2 text-gray-500">
                    Don't have an account yet?<Link  className="underline"to={'/register'}>Register now</Link>
                </div>
            </form>
            </div>
         
        </div>
    );

    
}