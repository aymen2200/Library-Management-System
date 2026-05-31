import { useState, useEffect } from "react";
import { useUserContext } from "../../../Contexts/User";
import image from '../../../images/Logos/Logo-dark.png'
import { Link, NavLink } from "react-router-dom";
import Profile_Card from "./Profile_Card";
import '../../../Css/WebsiteCss/NavBarCss/NavBar.css'
import { UserPlus, LogIn } from "lucide-react";

const NavBar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const { setIsNew, isAuthenticated, currentUser } = useUserContext();
    const [isSmall, setIsSmall] = useState(() => window.innerWidth <= 480);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 480px)');
        const handleChange = (e) => setIsSmall(e.matches);
        setIsSmall(mediaQuery.matches);
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

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
                <NavLink to='/' end className={({ isActive }) => `nav-links ${isActive ? "active" : ""}`}>
                    Home
                </NavLink>

                <NavLink to='/AllBooks' className={({ isActive }) => `nav-links ${isActive ? "active" : ""}`}>
                    {isSmall ? 'Books' : 'All Books'}
                </NavLink>

                <div className="nav-links"
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}>
                    <p>{isSmall ? 'Cat ▾' : 'Categories ▾'}</p>
                    {isOpen && (
                        <ul>
                            {categories.map((cat, index) => (
                                <li key={index}>{cat}</li>
                            ))}
                        </ul>
                    )}
                </div>

                <NavLink to='/Favorites' className={({ isActive }) => `nav-links ${isActive ? "active" : ""}`}>
                    {isSmall ? 'Favs' : 'Favorites'}
                </NavLink>

                <NavLink to='/MyReadingJourney' className={({ isActive }) => `nav-links ${isActive ? "active" : ""}`}>
                    {isSmall ? 'Reads' : 'My Reading Journey'}
                </NavLink>
            </div>
            <div className="right-side">
                {isAuthenticated ?
                    <Profile_Card name={currentUser.name} />
                    :
                    <div className="Login-buttons">
                        <Link to='/auth' onClick={() => setIsNew(true)} className="sign-up-button">Sign Up <UserPlus size={16} /></Link>
                        <Link to='/auth' onClick={() => setIsNew(false)} className="sign-in-button"> Sign In <LogIn size={16} /></Link>
                    </div>
                }
            </div>
        </nav>
    )
}

export default NavBar;