import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            {/* Footer content */}
            <p>
                &#169; 2024 Open-Source Project - 
                
                {/* Link to the project's GitHub repository */}
                <a 
                    className="link" 
                    href="https://www.github.com/narainkarthikv/Sticky-Memo"
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    GitHub Repository
                </a>
                &nbsp;
                
                {/* Text indicating the project developers */}
                Developed By
                
                {/* Link to the community's GitHub profile */}
                <a 
                    className="link" 
                    href="https://www.github.com/narainkarthikv"
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    Wisdom Fox Community
                </a>
            </p>
        </footer>
    );
}

export default Footer;
