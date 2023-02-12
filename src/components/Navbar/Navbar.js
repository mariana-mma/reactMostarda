import { useState, useEffect } from 'react';
import CartWidget from '../CartWidget/CartWidget';
import NavbarMenu from '../NavbarMenu/NavbarMenu';
import './Navbar.css';
import {Link} from 'react-router-dom'

const Navbar = () => {
    const [navbarOpen, setNavbarOpen] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    const handleToggle = () => {
        setNavbarOpen(!navbarOpen)
    }

    useEffect(() => {
        const changeWidth = () => {
            setScreenWidth(window.innerWidth);
        }
        window.addEventListener('resize', changeWidth)
        return () => {
            window.removeEventListener('resize', changeWidth)
        }
    }, [])

    return (
        <nav>
            <h1>Groove Store</h1>
            {(navbarOpen || screenWidth > 649) && (
            <div className='dropdownOptions'>
                <Link to={'/'} className="nav-text">HOME</Link>
                <Link to={'/genre/jazz'} className="nav-text">JAZZ</Link>
                <Link to={'/genre/rock'} className="nav-text">ROCK</Link>
                <Link to={'/genre/pop'} className="nav-text">POP</Link>
            </div>
            )}
            <div className='navbarMenu'>
                <button onClick={handleToggle}>
                    <NavbarMenu />
                </button>
                <CartWidget />
            </div>
        </nav>
    )
}

export default Navbar