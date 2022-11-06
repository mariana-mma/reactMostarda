import { useState, createContext } from "react"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const CartContext = createContext({
    cart: [],
})

export const CartProvider = ({children}) =>{
    const [cart, setCart] = useState([]);
    const MySwal = withReactContent(Swal)

    const addToCart = (item) => {
        if(isAlreadyAdded(item.id)) {
            MySwal.fire({
                title: 'The item is already in cart',
                icon: 'info',
                position: 'bottom-right',
                timer: 2000,
                showConfirmButton: false,
                toast: true
            });
        } else {
            setCart([...cart, item])
            MySwal.fire({
                title: 'The item is now in the cart!',
                icon: 'success',
                position: 'bottom-right',
                timer: 2000,
                showConfirmButton: false,
                toast: true
            });
        }
    };

    const isAlreadyAdded = (id) => {
        return cart.some((item) => item.id === id)
    };

    const removeItem = (id) =>{
        const updatedCart = cart.filter((item) => item.id !== id)
        setCart(updatedCart)
        MySwal.fire({
            title: 'The item was removed from cart',
            icon: 'info',
            position: 'bottom-right',
            timer: 2000,
            showConfirmButton: false,
            toast: true
        });
    };

    const getAmount = () => {
        let amount = 0
        cart.forEach((item) => {
            amount += item.count
        })
        return amount
    }

    const getTotal = () => {
        let amount = 0

        cart.forEach((item) => {
            amount += item.count * item.price
        })
        return amount
    }

    const clearCart = () => {
        setCart([])
    }

    return ( 
        <CartContext.Provider value={{ cart, addToCart, removeItem, getAmount, getTotal, clearCart }} >
            { children }
        </CartContext.Provider>
    );
}
