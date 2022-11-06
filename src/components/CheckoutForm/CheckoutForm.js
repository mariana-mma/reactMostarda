import './CheckoutForm.css'
import { useContext, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import { addDoc, collection, getDocs, query, where, documentId, writeBatch } from 'firebase/firestore'
import { db } from '../../services/firebase/index'
import { useNavigate } from 'react-router-dom'
import Form from '../Form/Form'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const CheckoutForm = () => {
    const [loading, setLoading] = useState(false)
    const { cart, getTotal, clearCart } = useContext(CartContext)
    const totalPrice = getTotal()
    const navigate = useNavigate()
    const MySwal = withReactContent(Swal)

    const createOrder = async (user) => {
        setLoading(true)

        try {
            const objOrder = {
                buyer: {
                    email: user.email,
                    name: user.name,
                    phone: user.phone
                },
                items: cart,
                total: totalPrice
            }

            const batch = writeBatch(db)
            const outOfStock = []
            const ids = cart.map(prod => prod.id)
            const productsRef = collection(db, 'products')
            const productsFromFirestore = await getDocs(query(productsRef, where(documentId(), 'in', ids)))

            const {docs} = productsFromFirestore

            docs.forEach(doc => {
                const dataDoc = doc.data()
                const stockDb = dataDoc.stock

                const productFromCart = cart.find(prod => prod.id === doc.id)
                const prodQuantity = productFromCart?.count

                if(stockDb >= prodQuantity){
                    batch.update(doc.ref, { stock: stockDb - prodQuantity})
                }else{
                    outOfStock.push({ id: doc.id, ...dataDoc})
                }
            })

            if(outOfStock.length === 0){
                await batch.commit()

                const orderRef = collection(db, 'orders')
                const orderAdded = await addDoc(orderRef, objOrder)
                
                clearCart()

                MySwal.fire({
                    icon: 'success',
                    title: 'Order completed!',
                    text: `Your order id is: ${orderAdded.id}`
                })

                setTimeout(() => {
                    navigate('/')
                }, 3000)
            }else{
                MySwal.fire({
                    icon: 'info',
                    title: 'Out of stock',
                    text: 'This item is now out of stock'
                })
            }

        }catch(err){
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: err
            })
        }finally{
            setLoading(false)
        }
        
    }

    if(loading){
        return <h2>Your order is being generated..</h2>
    }

    return (
        <div>
            <h1>Checkout</h1>
            <div>
                <h4>Items</h4>
                <div>
                    {cart.map((prod) => (
                        <div className='itemsDisplay' key={prod.id}>
                            <p>Album:{prod.album}</p>
                            <p>Artist: {prod.name}</p>
                            <p>Price: U$S {prod.price}</p>
                            <p>Quantity: {prod.count}</p>
                        </div>
                        ))
                    }
                </div>
                <p>Total: U$S {totalPrice}</p>
            </div>
            <h5>Complete the form below:</h5>
            <Form createOrder={createOrder}/>
        </div>
    )
}

export default CheckoutForm