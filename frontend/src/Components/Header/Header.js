import React from "react";
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header>
            <nav className="navbar">
                <div className="navbar-items">
                    {/*<Link to='/' className='navbar-logo'>
                        <img src="/assets/delivery.png" alt="Delivery Service Logo"/>
                    </Link>*/}
                    <Link to='/tracking' className='navbar-item'>Tracking</Link>
                    <Link to='/support' className='navbar-item'>Support</Link>
                    <Link to='/delivery-request' className='navbar-item'>Delivery Request</Link>
                </div>
            </nav>
        </header>
    );
};

export default Header