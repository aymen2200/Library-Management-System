import { useState } from 'react'
import RegistrationCard from '../Components/LoginComponents/RegistrationCard'
import LogInCard from '../Components/LoginComponents/loginCard'
import { useUserContext } from '../Contexts/User'
import '../Css/LoginCss/loginPage.css'

const Login = () => {
    const {isNew , toggle} = useUserContext();

    return (
        <div className='auth-page'>   
            <div className={`card-wrapper ${isNew ? 'slide-left' : 'slide-right'}`}>
                {isNew ? (
                    <RegistrationCard handleClick={toggle} />
                ) : (
                    <LogInCard handleClick={toggle} />
                )}
            </div>
        </div>
    )
}

export default Login;