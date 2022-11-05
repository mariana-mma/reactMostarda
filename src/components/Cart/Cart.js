import './Cart.css'
import { CartContext } from '../../context/CartContext';
import { useContext } from 'react';
import {Link} from 'react-router-dom'

const Cart = () => {
    const { cart, removeItem, getTotal } = useContext(CartContext)
    const totalPrice = getTotal()

    const multiply = (x, y) =>{
        return x * y;
    }

    if(cart.length === 0){
        return (
            <div>
                <h1>Your Cart is empty</h1>
                <div>
                    <Link to={`/`}>See cool vinyls</Link>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div>
                {cart.map((prod) => (
                    <div key={prod.id}>
                        <img src={prod.image} alt={prod.name} style={{height: 120}}/>
                        <h4>{prod.name}</h4>
                        <p>{prod.album}</p>
                        <p>Price: U$S {prod.price}</p>
                        <p>Quantity: {prod.count}</p>
                        <p>Subtotal: U$S {multiply(prod.price, prod.count)}</p>
                        <button onClick={() => removeItem(prod.id)}>Remove</button>
                    </div>
                    ))
                }
            </div>
            <div>
                <h5>Total: {totalPrice}</h5>
            </div>
            <button>Buy products</button>
        </div>
    )
}

export default Cart