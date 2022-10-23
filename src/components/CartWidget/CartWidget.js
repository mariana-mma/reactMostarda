// import cart from './assets/cart.png';
import './CartWidget.css';

const CartWidget = () => {
    return (
        <div className='cart-widget'>
            <img src='/images/cart-white.png' alt='shopping cart'/>
            <p>0</p>
        </div>
    )
}

export default CartWidget