import React, { useEffect, useState } from 'react'
import '../../css/Login.css'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { postApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";


import img1 from '../../assest/loading1.gif'



const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState(null)
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedPassword = localStorage.getItem("rememberedPassword");

    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);


  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email || !password) {
        toast.error("Fill all the fields");
        return;
    }

    setLoading(true);
    const formData = { email, password};

    postApi(endPoints.loginAdmin, formData, {
        setResponse: (response) => {
            if (rememberMe) {
                localStorage.setItem("rememberedEmail", email);
                localStorage.setItem("rememberedPassword", password);
            } else {
                localStorage.removeItem("rememberedEmail");
                localStorage.removeItem("rememberedPassword");
            }

            sessionStorage.setItem("token", response?.token);
            navigate('/dashboard');
        },
        setLoading,
        successMsg: "Login Successfully!",
        errorMsg: "Invalid credentials", 
    });
};



  const navigate = useNavigate()


  return (
    <>
      <div className='login'>
        <div className='login2'>
          <div className='firstpage2'>
            <h1>Ed</h1>
            <h1>Tech</h1>
          </div>
          <div className='login3'>
            <div className='login4'>
              <h1>Welcome to Admin panel</h1>
              <p>Login to access your account</p>
            </div>
            <form className="login-form">
              <div className="input-container">
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <div className='logininputseye' onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEye color='#313131' size={25} /> : <FaEyeSlash color='#313131' size={25} />}
                </div>
              </div>

              <div className="options">
                <label>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  Remember me
                </label>
                {/* <a href='/forgotpassword' className="forgot-password">
                  Forgot Password?
                </a> */}
              </div>
            </form>
            <div className='login6'>
              {loading ?
                <img src={img1} alt="" />
                :
                <button onClick={handleLogin}>Login</button>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login