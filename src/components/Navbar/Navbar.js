import CartWidget from '../CartWidget/CartWidget';
import './Navbar.css';
import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <nav>
            <h1>Groove Store</h1>
            <div>
                <Link to={'/'} className='nav-text'>HOME</Link>
                <Link to={'/genre/jazz'} className='nav-text'>JAZZ</Link>
                <Link to={'/genre/rock'} className='nav-text'>ROCK</Link>
                <Link to={'/genre/pop'} className='nav-text'>POP</Link>
            </div>
            <CartWidget />
        </nav>
    )
}

export default Navbar