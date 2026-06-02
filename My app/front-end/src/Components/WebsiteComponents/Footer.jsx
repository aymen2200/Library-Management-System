import { useState } from "react";
import "../../Css/WebsiteCss/Footer.css"
import { FaInstagram, FaFacebook, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="Upper-footer">
        <div className="footer-left-side">
          <h4 className="footer-left-side-title">Knowledge Library</h4>
          <p className="footer-left-side-description">Our mission is to make knowledge accessible by curating and presenting the finest books in one plac</p>
          <div className="contacts">
            <a href="#" aria-label="Instagram" className="contacts-icons"><FaInstagram /></a>
            <a href="#" aria-label="Facebook" className="contacts-icons"><FaFacebook /></a>
            <a href="#" aria-label="Twitter" className="contacts-icons"><FaXTwitter /></a>
          </div>
        </div>
        <div className="footer-middle-side">
          <h4 className="footer-middle-side-title">Was Developed By</h4>
          <p className="developers">Ghalem Mohamed Yacine</p>
          <p className="developers">Kourdi Elias</p>
          <p className="developers">Bessekri Aymen</p>
          <p className="developers">Laidi Hichem</p>
          <p className="developers">Yetto Zin ELAbidine</p>
        </div>
        <div className="footer-right-side">
          <h3 className="footer-right-side-title">Some Quick Links</h3>
          <Link to="/" className="Footer-Links">Home</Link>
          <Link to="/AllBooks" className="Footer-Links">All Books</Link>
          <Link to="/Favorites" className="Footer-Links">Favorites</Link>
          <Link to="/MyReadingJourney" className="Footer-Links">My Reading Journey</Link>
          <Link to="/TermsAndConditions" className="Footer-Links">Terms and Conditions</Link>
        </div>
      </div>
      <p>All rights reserved © 2026 Knwoladge Library</p>
    </footer>
  );
}