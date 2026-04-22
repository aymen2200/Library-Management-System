import { useState } from 'react'
import image from "../../images/maisondulivre.png";
import axios from "axios";
import { useAuthContext } from '../../Contexts/AuthAccept';
import '../../Css/LoginCss/loginCard.css'


const SignInRightSide = () => {

    const { login} = useAuthContext();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:3000/user/login", {
                email,
                password,
            });

            if (res.data.success) {
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
        <div className='signInRightSide'>
            <h1>Log In</h1>
            <p className='main-paragraph2'>Fill in your details to get started</p>
            <form onSubmit={handleSubmit}>
                <p className='sec-paragraph'>Email Adress</p>
                <input onChange={(e) => setEmail(e.target.value)} type='email' value={email}/>
                <p className='sec-paragraph'>Password</p>
                <input type={showPassword ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} value={password}/>
                <button type='submit'>Sign In</button>
            </form>
        </div>
    )
}

const SignInLeftSide = ({ Click }) => {
    return (
        <div className='signInLeftSide'>
            <img src={image} alt='logo' />
            <h1>Hello , Freind!</h1>
            <p>Register with your personal details to use the site features</p>
            <button onClick={Click}>Sign Up</button>
        </div>
    )
}

const LogInCard = ({ handleClick }) => {
    return (
        <div className="login-Card">
            <SignInLeftSide Click={handleClick} />
            <SignInRightSide />
        </div>

    )
}

export default LogInCard;