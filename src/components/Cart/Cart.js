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
            <div className='emptyCartContainer'>
                <h1>Your Cart is empty</h1>
                <div className='buttonGoBack'>
                    <Link to={`/`}>See cool vinyls</Link>
                </div>
            </div>
        )
    }

    return (
        <div>
            <h2>Your Cart</h2>
            <div className='itemsContainer'>
                {cart.map((prod) => (
                    <div className='itemInfo' key={prod.id}>
                        <img src={prod.image} alt={prod.name} style={{height: 180}}/>
                        <p><strong>Artist:</strong> {prod.name}</p>
                        <p><strong>Album:</strong> {prod.album}</p>
                        <p><strong>Price:</strong> U$S {prod.price}</p>
                        <p><strong>Quantity:</strong> {prod.count}</p>
                        <p><strong>Subtotal:</strong> U$S {multiply(prod.price, prod.count)}</p>
                        <button className='buttonRemove' onClick={() => removeItem(prod.id)}>Remove</button>
                    </div>
                    ))
                }
            </div>
            <div className='priceContainer'>
                <h5>Total: U$S {totalPrice}</h5>
                <Link to={`/checkout`} className='buttonCheckout'>Proceed to checkout</Link>
                <button className="buttonEmpty" onClick={askEmptyCart}>Empty Cart</button>
            </div>
        </div>
    )
}

export default Cart