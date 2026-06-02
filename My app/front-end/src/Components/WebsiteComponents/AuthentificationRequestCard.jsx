import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../Contexts/User";
import { UserPlus, LogIn } from "lucide-react";
import "../../Css/WebsiteCss/AuthentificationRequestCard.css"

const AuthRequiredCard = () => {
    const { setIsNew } = useUserContext();
    return (
        <div className="auth-required-page">
            <div className="auth-required-card">
                <h2 className="auth-required-title">Sign in to access this page</h2>
                <p className="auth-required-subtitle">
                    Create an account or sign in to enjoy all features of Knowledge Library.
                </p>
                <div className="auth-required-buttons">
                    <Link
                        to='/auth' onClick={() => setIsNew(true)}
                        className="auth-required-signup">
                        Sign Up <UserPlus size={16} />
                    </Link>
                    <Link
                        to='/auth' onClick={() => setIsNew(false)}
                        className="auth-required-signin">
                        Sign In <LogIn size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AuthRequiredCard;