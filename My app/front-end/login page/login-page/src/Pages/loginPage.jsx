import { useState } from 'react'
import RegistrationCard from '../Components/LoginComponents/RegistrationCard'
import LogInCard from '../Components/LoginComponents/loginCard'
import { useLoginContext } from '../Contexts/login'
import '../Css/LoginCss/loginPage.css'

const Login = () => {
    const {isNew , toggle} = useLoginContext();

    return (
        <div className={`card-wrapper ${isNew ? 'slide-left' : 'slide-right'}`}>
            {isNew ? (
                <RegistrationCard handleClick={toggle} />
            ) : (
                <LogInCard handleClick={toggle} />
            )}
        </div>
    )
}

export default Login;