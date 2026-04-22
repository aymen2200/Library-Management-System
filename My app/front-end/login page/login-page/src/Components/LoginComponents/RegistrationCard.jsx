import { useState } from 'react'
import image from "../../images/maisondulivre.png";
import axios from "axios";
import { useAuthContext } from '../../Contexts/AuthAccept';
import '../../Css/LoginCss/RegistrationCard.css'


const SignUpRightSide = () => {

    const { login } = useAuthContext();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:3000/user/register", {
                name,
                email,
                password,
            });

            if (res.data.success) {
                setName("");
                setEmail("");
                setPassword("");
                localStorage.setItem("token", res.data.token);
                login();
                console.log("Login success");
            }

        } catch (err) {
            console.log("Login failed", err.response?.data);
        }
    };

    return (
        <div className='signUpRightSide'>
            <h1>Create Account</h1>            
            <p className='main-paragraph1'>Fill in your details to get started</p>
            <form onSubmit={handleSubmit}>
                <p className='sec-paragraph'>Name</p>
                <input onChange={(e) => setName(e.target.value) } type="text" value={name}/>
                <p className='sec-paragraph'>Email Adress</p>
                <input onChange={(e) => setEmail(e.target.value) } type="email" value={email}/>
                <p className='sec-paragraph'>Password</p>
                <input type={showPassword ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} value={password}/>
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )
}

const SignUpLeftSide = ({ Click }) => {
    return (
        <div className='signUpLeftSide'>
            <img src={image} alt='logo' />
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