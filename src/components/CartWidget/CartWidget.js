import { useContext } from 'react';
import {Link} from 'react-router-dom'
import { CartContext } from '../../context/CartContext';
import './CartWidget.css';


const CartWidget = () => {
    const { getAmount } = useContext(CartContext)
    const amount = getAmount()

    return (
        <Link to={`/cart`} className='cart-widget'>
            <img src='/images/cart-white.png' alt='shopping cart'/>
            <p>{amount}</p>
        </Link>
    )
}

export default CartWidget