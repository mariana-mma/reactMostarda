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
        return <h2 style={{textAlign: 'center'}}>Your order is being generated..</h2>
    }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>Checkout</h1>
            <div className='checkoutItems'>
                <h5>Items</h5>
                <div>
                    <table className='checkoutTable'>
                        <thead>
                        <tr>
                            <th className='tableTitle'><strong>Album</strong></th>
                            <th className='tableTitle'><strong>Artist</strong></th>
                            <th className='tableTitle'><strong>Price</strong></th>
                            <th className='tableTitle'><strong>Quantity</strong></th>
                        </tr>
                        </thead>
                        <tbody>
                            {cart.map((prod) => (
                                <tr key={prod.id}>
                                    <td className='tableTexts'>{prod.album}</td>
                                    <td className='tableTexts'>{prod.name}</td>
                                    <td className='tableNumbers'>U$S {prod.price}</td>
                                    <td className='tableNumbers'>{prod.count}</td>
                                </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    {/* {cart.map((prod) => (
                        <div className='itemsDisplay' key={prod.id}>
                            <p><strong>Album:</strong> {prod.album}</p>
                            <p><strong>Artist:</strong> {prod.name}</p>
                            <p><strong>Price:</strong> U$S {prod.price}</p>
                            <p><strong>Quantity:</strong> {prod.count}</p>
                        </div>
                        ))
                    } */}
                </div>
                <p><strong>Total: U$S {totalPrice}</strong></p>
            </div>
            <div className='checkoutForm'>
                <h5>Complete the form below:</h5>
                <Form createOrder={createOrder}/>
            </div>
        </div>
    )
}

export default CheckoutForm