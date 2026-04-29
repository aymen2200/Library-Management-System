import { useState } from "react";
import "../../Css/WebsiteCss/Footer.css"

export default function Footer() {
  return (
    <footer>
      <div>
        <a href="#" aria-label="Instagram">Instagram</a>
        <a href="#" aria-label="Facebook">Facebook</a>
        <a href="#" aria-label="Twitter">Twitter</a>
      </div>
      <p>All rights reserved © 2024 Knwoladge Library</p>
      <a href="/terms">Terms & Conditions</a>
    </footer>
  );
}