import './Cart.css'
import { CartContext } from '../../context/CartContext'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Cart = () => {
    const { cart, removeItem, getTotal, clearCart } = useContext(CartContext)
    const totalPrice = getTotal()
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate()

    const multiply = (x, y) => {
        return x * y;
    }

    const askEmptyCart = () => {
        MySwal.fire({
            title: 'Empty the cart?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
        })
        .then((result) => {
                if (result.isConfirmed) {
                    MySwal.fire('The cart is empty', '', 'info');
                    clearCart()
                    setTimeout(navigate('/'), 3000)
                } else if (result.isDenied) {
                    MySwal.fire("The items weren't removed", "", "info")
                }
            })
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
            <h2>Your Cart</h2>
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
                <h5>Total: U$S {totalPrice}</h5>
            </div>
            <Link to={`/checkout`} className='buttonCheckout'>Proceed to checkout</Link>
            <div>
                <button className="buttonEmpty" onClick={askEmptyCart}>Empty Cart</button>
            </div>
        </div>
    )
}

export default Cart