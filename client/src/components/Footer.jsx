// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1c1d1f] text-white py-6 flex flex-col flex-wrap items-center gap-2">
      <div >
        <h3 className="text-xl font-bold mb-4">Follow Us</h3>
        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
      <div className="container mx-auto text-center">
        <p>&copy; 2023 Apex, Inc.</p>
        <ul className="flex justify-center space-x-4 mt-2">
          <li>
            <a href="/terms" className="hover:text-[#a435f0]">
              Terms
            </a>
          </li>
          <li>
            <a href="/privacy" className="hover:text-[#a435f0]">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:text-[#a435f0]">
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
