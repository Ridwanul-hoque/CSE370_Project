import React, { useContext } from 'react';
import AuthContext from '../../Context/AuthContext/AuthContext';
import { Link, NavLink, useLocation } from 'react-router-dom';
import small from '../../assets/Book-small.png'

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext)
    const location = useLocation();

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                console.log('succesfull Sign Out')
            })
            .catch(error => {
                console.log('failed to signed out.')
            })
    }
    const links = <>
        <li><NavLink to='/' className={({ isActive }) => isActive ? 'bg-pink-300 text-white' : 'text-black'}>Home</NavLink></li>
        <li><NavLink to='/addBook' className={({ isActive }) => isActive ? 'bg-pink-300 text-white' : 'text-black'}>Add Books</NavLink></li>
        <li><NavLink to='/yourBooks' className={({ isActive }) => isActive ? 'bg-pink-300 text-white' : 'text-black'}>Your Books</NavLink></li>
        <li><NavLink to='/listedBooks' className={({ isActive }) => isActive ? 'bg-pink-300 text-white' : 'text-black'}>Listed Books</NavLink></li>
    </>

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">
                    <img className='w-12' src={small} alt="" />
                    <div className='text-pink-300'>
                        <h3>Boi Poka</h3>
                        <p className='text-[8px]'>Your Trusted Online Bookstore</p>
                    </div>
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <>
                        <button onClick={handleSignOut} className="btn bg-pink-400 text-white">Log Out</button>

                    </> : <><Link className='text-pink-400' to="/register"><u>Register</u></Link>
                        <Link to='/signIn'>
                            <button className="btn ml-2 bg-pink-400 text-white">Sign In</button></Link></>
                }

            </div>
        </div>
    );
};

export default Navbar;