import { useState, createContext } from "react"

export const CartContext = createContext({
    cart: [],
})

export const CartProvider = ({children}) =>{
    const [cart, setCart] = useState([]);
    // const [total, setTotal] = useState(0);

    const addToCart = (item) => {
        console.log('addToCart')
        if(isAlreadyAdded(item.id)) {
            console.log('Is already in cart')
        } else {
            setCart([...cart, item])
        }
    };

    const isAlreadyAdded = (id) => {
        return cart.some((item) => item.id === id)
    };

    const removeItem = (id) =>{
        const updatedCart = cart.filter((item) => item.id !== id)
        setCart(updatedCart)
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

    // useEffect(() => { 
    //     const total = getTotal()
    //     setTotal(total)
    // },[cart])  //eslint-disable-line

    return ( 
        <CartContext.Provider value={{ cart, addToCart, removeItem, getAmount, getTotal }} >
            { children }
        </CartContext.Provider>
    );
}
