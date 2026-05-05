import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../Css/WebsiteCss/MainCss/HeroSection.css";

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <section className="hero">
            <div className="hero-bg" />
            <div className="hero-overlay" />

            <div className="hero-content">
                <div className="hero-text">
                    <p className="hero-sub">Your next great read is waiting</p>
                    <h1 className="hero-title">
                        A World of Books <br />
                        <span>At Your Fingertips</span>
                    </h1>
                    <p className="hero-desc">
                        Discover a vast collection of books across all genres. <br />
                        Borrow what you love — easily and safely.
                    </p>
                    <button className="hero-btn" onClick={() => navigate("/AllBooks")}>
                        Explore Books
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;