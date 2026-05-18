import { useState } from 'react'
import image from "../../images/Logos/Logo-light.png";
import axios from "axios";
import { useUserContext } from '../../Contexts/User';
import '../../Css/LoginCss/RegistrationCard.css'
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom'


const SignUpRightSide = () => {

    const { login, UserInfo } = useUserContext();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const RegistrationSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:3000/user/register", {
                name,
                email,
                password,
            });

            if (res.data.success) {
                UserInfo(name, email, res.data.token)
                setName("");
                setEmail("");
                setPassword("");
                localStorage.setItem("token", res.data.token);
                login();
                navigate("/");
            }

        } catch (err) {
            console.log("Login failed", err.response?.data);
        }
    };

    const GoogleButton = () => {
        const googleLogin = useGoogleLogin({
            onSuccess: (credentialResponse) => {
                console.log(credentialResponse);
            },
            onError: () => {
                console.log('Login Failed');
            },
        });

        return (
            <button className="google-btn" onClick={() => googleLogin()}>
                <img
                    src="https://developers.google.com/identity/images/g-logo.png"
                    alt="Google"
                />
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
                <input onChange={(e) => setName(e.target.value)} type="text" value={name} placeholder='Enter your Name' />
                <p className='sec-paragraph'>Email Address</p>
                <input onChange={(e) => setEmail(e.target.value)} type="email" value={email} placeholder='Enter your Email' />
                <p className='sec-paragraph'>Password</p>
                <input type={showPassword ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Enter your Password' />
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
        <div className="Registration-Card">
            <SignUpLeftSide Click={handleClick} />
            <SignUpRightSide />
        </div>
    )
}

export default RegistrationCard;