import { useState } from 'react'
import image from "../../images/Logos/Logo-light.png";
import axios from "axios";
import { useUserContext } from '../../Contexts/User';
import '../../Css/LoginCss/loginCard.css'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';


const SignInRightSide = () => {

    const { login, UserInfo } = useUserContext();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const LoginSubmit = async (e) => {
        e.preventDefault();
        setEmailError('')
        setPasswordError('')
        try {
            const res = await axios.post("http://localhost:3000/user/login", {
                email,
                password,
            });
            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                UserInfo(res.data.name, email, res.data.token);
                setEmail("");
                setPassword("");
                login();
                navigate('/');
            }
        } catch (err) {
            const error = err.response?.data?.error
            if (error === 'User not found') {
                setEmailError('Invalid email address')
            } else if (error === 'Invalid password') {
                setPasswordError('Invalid password')
            } else {
                setEmailError('Something went wrong')
            }
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
    };

    return (
        <div className='signInRightSide'>
            <h1>Log In</h1>
            <p className='main-paragraph2'>Fill in your details to get started</p>
            <form onSubmit={LoginSubmit}>
                <p className='sec-paragraph'>Email Address</p>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter your Email...'
                    type='email'
                    value={email}
                />
                {emailError && <p className='input-error'>{emailError}</p>}
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
                {passwordError && <p className='input-error'>{passwordError}</p>}
                <button type='submit'>Sign In</button>
                <p className='divider'>or</p>
                <GoogleOAuthProvider clientId="731842341556-42d42glh08b6l0bkt01cjvokha23uto7.apps.googleusercontent.com">
                    <GoogleButton />
                </GoogleOAuthProvider>
            </form>
        </div>
    )
}

const SignInLeftSide = ({ Click }) => {
    return (
        <div className='signInLeftSide'>
            <div className="logo">
                <img src={image} alt='logo' />
                <h3>Knowledge Library</h3>
                <p>Where the Journey Begins</p>
            </div>
            <h1>Hello , Friend!</h1>
            <p>Register with your personal details to use the site features</p>
            <button onClick={Click}>Sign Up</button>
        </div>
    )
}

const LogInCard = ({ handleClick }) => {
    return (
        <div className="login-card-wrapper">
            <div className="login-Card">
                <SignInLeftSide Click={handleClick} />
                <SignInRightSide />
            </div>

            <div className="signup-bottom-btn">
                <button onClick={handleClick}>Sign Up</button>
            </div>
        </div>
    )
}

export default LogInCard;