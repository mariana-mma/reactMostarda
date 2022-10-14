import CartWidget from '../CartWidget/CartWidget';
import './Navbar.css';
import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <nav>
            <h1>Groove Store</h1>
            <div>
                <Link to={'/'} >Home</Link>
                <Link to={'/genre/jazz'}>Jazz</Link>
                <Link to={'/genre/rock'}>Rock</Link>
                <Link to={'/genre/pop'}>Pop</Link>
            </div>
            <CartWidget />
        </nav>
    )
}

export default Navbar