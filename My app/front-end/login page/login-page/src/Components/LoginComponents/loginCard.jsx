import { useState } from 'react'
import image from "../../images/Logos/Logo-light.png";
import axios from "axios";
import { useUserContext } from '../../Contexts/User';
import '../../Css/LoginCss/loginCard.css'
import { useNavigate } from 'react-router-dom'


const SignInRightSide = () => {

    const { login, UserInfo} = useUserContext();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const LoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:3000/user/login", {
                email,
                password,
                role,
            });

            if (res.data.success) {
                UserInfo(res.data.user.name, res.data.user.email, res.data.token);
                setEmail("");
                setPassword("");
                login();
                localStorage.setItem("token", res.data.token);
                navigate('/');
            }

        } catch (err) {
            console.log("Login failed", err.response?.data);
        }
    };

    return (
        <div className='signInRightSide'>
            <h1>Log In</h1>
            <p className='main-paragraph2'>Fill in your details to get started</p>
            <div className="selection">
                <p className='sec-paragraph'>Choose your Role</p>
                <select className="select-input"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}>
                    <option value="" disabled>Role</option>
                    <option value="user">User</option>
                    <option value="librarian">Librarian</option>
                </select>
            </div>
            <form onSubmit={LoginSubmit}>
                <p className='sec-paragraph'>Email Adress</p>
                <input onChange={(e) => setEmail(e.target.value)} type='email' value={email} />
                <p className='sec-paragraph'>Password</p>
                <input type={showPassword ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} value={password} />
                <button type='submit'>Sign In</button>
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