import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Nav.css";

const Nav = () => {
    return (
            <aside className="social-sidebar">
                <nav className="nav-menu">
                    <ul>
                        <li><Link to="/quiz">AI가사 퀴즈</Link></li>
                        <li><Link to="/songquiz">노래퀴즈</Link></li>
                        <li><Link to="/streaming">스트리밍</Link></li>
                    </ul>
                </nav>
            </aside>

    );
};

export default Nav;
