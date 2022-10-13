import CartWidget from '../CartWidget/CartWidget';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav>
            <h1>Groove Store</h1>
            <div>
                <button>All</button>
                <button>Jazz</button>
                <button>Rock</button>
                <button>Pop</button>
            </div>
            <CartWidget />
        </nav>
    )
}

export default Navbar