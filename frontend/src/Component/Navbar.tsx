import { useState } from "react";
import { Link } from 'react-router-dom';
import { UserButton, useUser } from "@clerk/clerk-react";
import '../Component/Navbar.css';


function Navbar() {
    const { isSignedIn } = useUser();
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };
    return (
        <>
            <div className="nav1">
                <div className="nav2 nav3">
                    <span style={{ color: 'white' }}>TixWix</span>
                </div>
                <div className="nav2 nav4">
                    <Link to="/">Home</Link>
                    <Link to="/events">Event</Link>
                    <Link to="/hostevents">Host Events</Link>
                    <Link to="/chatbot">Chatbot</Link>
                    {isSignedIn ? (
                        <UserButton afterSignOutUrl="#" />
                    ) : (
                        <Link to="*">Signin</Link>
                    )}
                </div>
            </div>

            <header>
                <div className="hamburger-menu" onClick={toggleMenu} style={{ display: 'flex' }}>
                    <div>
                        <div className={`bar ${isMenuOpen ? 'animate' : ''}`}></div>
                        <div className={`bar ${isMenuOpen ? 'animate' : ''}`}></div>
                        <div className={`bar ${isMenuOpen ? 'animate' : ''}`}></div>
                    </div>
                    <div style={{ color: 'white', marginLeft: '5%', fontWeight: '700', fontSize: "20px" }}>AgriSense</div>
                </div>
                <nav className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/events">Event</Link></li>
                        <li><Link to="/hostevents">Host Events</Link></li>
                        <li><Link to="/chatbot">chatbot</Link></li>
                        {isSignedIn ? (
                            <div style={{ marginLeft: '2%' }}>
                                <UserButton afterSignOutUrl="#" />
                            </div>
                        ) : (
                            <Link to="*">Signin</Link>
                        )}
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default Navbar;
