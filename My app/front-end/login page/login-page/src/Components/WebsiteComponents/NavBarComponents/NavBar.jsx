import { useState } from "react";
import { useUserContext } from "../../../Contexts/User";
import image from '../../../images/Logos/Logo-dark.png'
import { Link } from "react-router-dom";
import Profile_Card from "./Profile_Card";
import '../../../Css/WebsiteCss/NavBarCss/NavBar.css'

const NavBar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const { setIsNew, isAuthenticated, currentUser } = useUserContext();

    const categories = [
        "Religion",
        "Sport",
        "Art",
        "Science",
        "Historic",
        "Novels",
    ];

    return (
        <nav className="navbar">
            <div className="left_side">
                <Link to='/'>
                    <img src={image} className="Logo-img" />
                    <div className="logo-text">
                        <h3>Knowledge Library</h3>
                        <p>Where the Journey Begins</p>
                    </div>
                </Link>
            </div>
            <div className="midlle-side">
                <Link to='/' className="nav-links">Home</Link>
                <Link to='/AllBooks' className="nav-links">All Books</Link>
                <div className="nav-links"
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}>
                    <p className="nav-links">Categories ▾</p>
                    {isOpen && (
                        <ul>
                            {categories.map((cat, index) => (
                                <li key={index}>
                                    {cat}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <Link to='' className="nav-links">Favorites</Link>
                <Link to='' className="nav-links">My Reading Journey</Link>
            </div>
            <div className="left-side">
                {isAuthenticated? 
                    <Link to='' className="right-side">
                        <Profile_Card name={currentUser.name}/>
                    </Link> 
                    : 
                    <div className="Login-buttons">
                        <Link to='/auth' onClick={() => setIsNew(true)} className="sign-up-button">Sign Up</Link>
                        <Link to='/auth' onClick={() => setIsNew(false)} className="sign-in-button">Sign In</Link>
                    </div>
                }
            </div>
        </nav>
    )
}

export default NavBar;