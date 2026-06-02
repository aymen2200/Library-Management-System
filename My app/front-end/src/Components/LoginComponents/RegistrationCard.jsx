import { useState } from 'react'
import image from "../../images/Logos/Logo-light.png";
import axios from "axios";
import { useUserContext } from '../../Contexts/User';
import '../../Css/LoginCss/RegistrationCard.css'
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react';
import LoginSubmit from './loginCard';


const SignUpRightSide = () => {

    const { login, UserInfo } = useUserContext();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [passwordError, setPasswordError] = useState('')
    const navigate = useNavigate()

    const [registerError, setRegisterError] = useState('')

    const RegistrationSubmit = async (e) => {
        e.preventDefault();

        if (password.length <= 5) {
            setPasswordError('Password must be longer than 5 characters')
            return
        }

        setPasswordError('')
        setRegisterError('')

        try {
            const res = await axios.post("http://localhost:3000/user/register", {
                name,
                email,
                password,
            });

            if (res.status === 201) {
                const loginRes = await axios.post("http://localhost:3000/user/login", {
                    email,
                    password,
                });
                if (loginRes.data.token) {
                    localStorage.setItem("token", loginRes.data.token);
                    UserInfo(loginRes.data.name, email, loginRes.data.token);
                    login();
                }
                setName("");
                setEmail("");
                setPassword("");
                navigate("/");
            }
        } catch (err) {
            setRegisterError(err.response?.data?.error || 'Something went wrong')
        }
    };

    const GoogleButton = () => {
        const googleLogin = useGoogleLogin({
            onSuccess: async (tokenResponse) => {
                try {
                    const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                        headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
                    });
                    const { name, email } = userInfo.data;
                    try {
                        await axios.post("http://localhost:3000/user/register", {
                            name,
                            email,
                            password: email + '_google_oauth',
                        });
                    } catch (err) { }
                    const loginRes = await axios.post("http://localhost:3000/user/login", {
                        email,
                        password: email + '_google_oauth',
                    });
                    if (loginRes.data.token) {
                        localStorage.setItem("token", loginRes.data.token);
                        UserInfo(loginRes.data.name, email, loginRes.data.token);
                        login();
                        navigate("/");
                    }
                } catch (err) {
                    console.error('Google login failed', err);
                }
            },
            onError: () => console.log('Login Failed'),
        });

        return (
            <button className="google-btn" type="button" onClick={() => googleLogin()}>
                <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" />
                Sign up with Google
            </button>
        );
    }

    return (
        <div className='signUpRightSide'>
            <h1>Create Account</h1>
            <p className='main-paragraph1'>Fill in your details to get started</p>
            <form onSubmit={RegistrationSubmit}>
                <p className='sec-paragraph'>Name</p>
                <input onChange={(e) => setName(e.target.value)} type="text" value={name} placeholder='Enter your Name...' />
                <p className='sec-paragraph'>Email Address</p>
                <input onChange={(e) => setEmail(e.target.value)} type="email" value={email} placeholder='Enter your Email...' />
                {registerError && <p className='password-error'>{registerError}</p>}
                <p className='sec-paragraph'>Password</p>
                <div className='password-input-wrapper'>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder='Enter your Password...'
                    />
                    <span onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff size={21} /> : <Eye size={21} />}
                    </span>
                </div>
                {passwordError && <p className='password-error'>{passwordError}</p>}
                <button type='submit'>Sign Up</button>
                <p className='divider'>or</p>
                <GoogleOAuthProvider clientId="731842341556-42d42glh08b6l0bkt01cjvokha23uto7.apps.googleusercontent.com">
                    <GoogleButton />
                </GoogleOAuthProvider>
            </form>
        </div>
    )
}

const SignUpLeftSide = ({ Click }) => {
    return (
        <div className='signUpLeftSide'>
            <div className="logo">
                <img src={image} alt='logo' />
                <h3>Knowledge Library</h3>
                <p>Where the Journey Begins</p>
            </div>
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all the features</p>
            <button onClick={Click}>Sign In</button>
        </div>
    )
}

const RegistrationCard = ({ handleClick }) => {
    return (
        <div className="registration-card-wrapper">
            <div className="Registration-Card">
                <SignUpLeftSide Click={handleClick} />
                <SignUpRightSide />
            </div>

            <div className="signin-bottom-btn">
                <button onClick={handleClick}>Sign In</button>
            </div>
        </div>
    )
}

export default RegistrationCard;